import { ObjectId } from 'mongodb';
import { Lesson, Teacher, File } from '../../../mongo';
import { isTimeSlotValid } from '../../../utilities';

export class TeachersService {
    async getTeacher(id) {
        return this.findTeacherById(id);
    }

    async updateUsername(id, username) {
        const teacher = await this.findTeacherById(id);

        teacher.username = username;

        await teacher.save();

        return teacher.toResponse();
    }

    async addBlockedSlot(id, body) {
        if (!isTimeSlotValid(body)) {
            throw new Error('Невірний час для блокування');
        }

        const { date, timeStart, timeEnd } = body;

        const teacher = await this.findTeacherById(id);

        const newSlot = {
            date: new Date(date),
            timeStart,
            timeEnd,
        };

        const existingSlot = teacher.blockedSlots.find(
            (slot) =>
                slot.date.toISOString() === newSlot.date.toISOString() &&
                slot.timeStart === newSlot.timeStart &&
                slot.timeEnd === newSlot.timeEnd
        );

        if (existingSlot) {
            throw new Error('Даний слот вже заблоковано!');
        }

        const lesson = await Lesson.findOne({
            date,
            timeStart,
            timeEnd,
            teacherId: id,
        });

        if (lesson) {
            throw new Error('На цей час вже заплановано урок');
        }

        teacher.blockedSlots.push(newSlot);

        await teacher.save();

        return teacher.toResponse();
    }

    async checkIfTeacherIsAvailable(teacherId, { date, timeStart, timeEnd }) {
        // Перевіряємо чи є такий викладач
        const teacher = await this.findTeacherById(teacherId);

        // Перевіряємо чи заблоковано цей слот у викладача
        const blockedSlot = teacher.blockedSlots.find(
            (slot) =>
                slot.date === new Date(date) &&
                slot.timeStart === timeStart &&
                slot.timeEnd === timeEnd
        );

        return !blockedSlot;
    }

    async findTeacherById(id) {
        const teacher = await Teacher.findById(new ObjectId(id));

        if (!teacher) {
            throw new Error('Викладач не знайдений');
        }

        return teacher;
    }
    async addStudentsAccessFile(id, body) {
        const { fileId, studentId } = body;
        let file = await File.findById(new ObjectId(fileId));

        file.studentsAccess.push(studentId);
        file.studentsAccess = Array.from(new Set(file.studentsAccess));

        await file.save();
        return `student with id = ${studentId} was added`;
    }
    async removeStudentsAccessFile(id, body) {
        const { fileId, studentId } = body;
        const file = await File.findById(new ObjectId(fileId));
        file.studentsAccess = file.studentsAccess.filter(item => item !== studentId);
        await file.save();
        return `student with id = ${studentId} was removed`;
    }
}


