import { ObjectId } from 'mongodb';
import { Student } from '../../mongo';

export class StudentsService {
    async getStudent(id) {
        return Student.findById(new ObjectId(id));
    }

    async updateUsername(id, username) {
        const student = await Student.findOneById(new ObjectId(id));

        if (!student) {
            throw new Error('Студент не знайдений');
        }

        student.username = username;

        await student.save();

        return student.toResponse();
    }
}

