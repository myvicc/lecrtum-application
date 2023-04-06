import { LessonsService } from '../../services';

export class StudentsController {
    constructor() {
        this.lessonService = new LessonsService();
    }

    async getStudentLessons(request, response) {
        try {
            const { studentId } = request.params;
            const lessons = await this.lessonService.getStudentsLesson()

            return response.json(lessons);
        } catch (e) {
            response.status(500).send("something is wrong");
        }
    }
}