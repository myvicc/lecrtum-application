import { ObjectId } from 'mongodb';

import { Lesson, Teacher } from '../../mongo';
import {isTimeSlotValid } from '../../utilities';
import pubsub from '../../../pubsub';

export class LessonsService {
    async createLesson(studentId, body) {
        const { date, timeStart, timeEnd, teacherId } = body;

        // Перевіряємо чи вірний тайм-слот
        if (!isTimeSlotValid({ date, timeStart, timeEnd })) {
            throw new Error('Невірний час для блокування');
        }

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

        // Перевіряємо чи є такий викладач
        const teacher = await Teacher.findById(new ObjectId(teacherId));

        if (!teacher) {
            throw new Error('Викладач не знайдений');
        }

        // Перевіряємо чи заблоковано цей слот у викладача
        const blockedSlot = teacher.blockedSlots.find(
            (slot) =>
                slot.date === new Date(date) &&
                slot.timeStart === timeStart &&
                slot.timeEnd === timeEnd
        );

        if (blockedSlot) {
            throw new Error('Викладач у даний слот недоступний');
        }

        const lesson = new Lesson({
            date: new Date(date),
            timeStart,
            timeEnd,
            teacherId,
            studentId
        });

        await lesson.save();

        await pubsub.publish('NEW_LESSON', {createLesson: lesson.toResponse()});

        return lesson.toResponse();
    }
}

