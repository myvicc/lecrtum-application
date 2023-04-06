import { Lesson } from '../mongo';
import pubsub from '../pubsub';
import {isTimeSlotValid } from '../utilities';

import { TeachersService } from './teachers.service';

export class LessonsService {
    constructor() {
        this.teacherService = new TeachersService();
    }

    async createLesson(studentId, body) {

        const { date, timeStart, timeEnd, teacherId } = body;

        /* Перевіряємо чи вірний тайм-слот
        if (!isTimeSlotValid({ date, timeStart, timeEnd })) {
            throw new Error('Невірний час для блокування');
        }
         */

        // Перевіряємо чи є урок у викладача в цей час
        const existingLesson = await Lesson.findOne({
            date,
            timeStart,
            timeEnd,
            teacherId
        });

        if (existingLesson) {
            throw new Error('У викладача вже є урок у цей час');
        }

        if (!(await this.teacherService.checkIfTeacherIsAvailable(teacherId, body))) {
            throw new Error('Викладач у цей час зайнятий');
        }

        const lesson = new Lesson({
            date: new Date(date),
            timeStart,
            timeEnd,
            teacherId,
            studentId
        });

        await lesson.save();

        await pubsub.publish('NEW_LESSON', { newLesson: lesson.toResponse() });

        return lesson.toResponse();
    }

    async getTeachersLesson(teacherId) {
        const now = new Date();

        const lessons = await Lesson.find({
            teacherId,
            date: {
                $gte: now,
            },
            timeStart: {
                $gte: now.getHours(),
            }
        });

        return lessons.map(lesson => lesson.toResponse());
    }
    async getStudentsLesson(studentId) {
        const now = new Date();

        const lessons = await Lesson.find({
            studentId,
            date: {
                $gte: now,
            },
            timeStart: {
                $gte: now.getHours(),
            }
        });

        return lessons.map(lesson => lesson.toResponse());
    }
}

