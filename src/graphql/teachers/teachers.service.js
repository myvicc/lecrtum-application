import { ObjectId } from 'mongodb';
import { Lesson, Teacher } from '../../mongo';
import { isTimeSlotValid } from '../../utilities';

export class TeachersService {
    async getTeacher(id) {
        return Teacher.findById(new ObjectId(id));
    }

    async updateUsername(id, username) {
        const teacher = await Teacher.findById(new ObjectId(id));

        if (!teacher) {
            throw new Error('Викладач не знайдений');
        }

        teacher.username = username;

        await teacher.save();

        return teacher.toResponse();
    }

    async addBlockedSlot(id, body) {
        if (!isTimeSlotValid(body)) {
            throw new Error('Невірний час для блокування');
        }

        const { date, timeStart, timeEnd } = body;

        const teacher = await Teacher.findById(new ObjectId(id));

        if (!teacher) {
            throw new Error('Викладач не знайдений');
        }

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
}

