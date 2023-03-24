import { ObjectId } from 'mongodb';
import { Teacher } from '../../mongo';

export class TeachersService {
    async getTeacher(id) {
        return Teacher.findById(new ObjectId(id));
    }

    async updateTeachername(id, username) {
        const teacher = await Teacher.findById(new ObjectId(id));

        if (!teacher) {
            throw new Error("teacher not found");
        }

        teacher.username = username;

        await teacher.save();
        return teacher.toResponse();
    }

    async setBlockedSlots(id, body) {
        const { date, timeStart, timeEnd } = body;

        const teacher = await Teacher.findById(new ObjectId(id));
        if (!teacher) {
            throw new Error("teacher not found");
        }

        teacher.blockedSlots.push({
            date: new Date(date),
            timeStart,
            timeEnd
        })

        await teacher.save();
        return teacher.toResponse();
    }
}


