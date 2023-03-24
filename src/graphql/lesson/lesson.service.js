import {Lesson, Student, Teacher} from '../../mongo';
import {ObjectId} from 'mongodb';
import { checkOfLesson } from '../../utilities';
import {teacherIsBusy} from '../../utilities';


export class LessonService {
    async createLesson(studentId, body) {
        const { date, timeStart, timeEnd, teacherId } = body;

        const student = await Student.findById(new ObjectId(studentId));

        if (!student) {
            throw new Error("student is not found");
        }

        await teacherIsBusy(new Date(date), timeStart, timeEnd, teacherId);

        checkOfLesson(timeStart, timeEnd);

        const lesson = new Lesson({
            date: new Date(date),
            timeStart,
            timeEnd,
            teacherId,
            studentId
        });

        await lesson.save();

        return lesson.toResponse();
    }
}
