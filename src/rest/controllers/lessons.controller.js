import { LessonsService } from '../../services';

export class LessonsController {
    constructor() {
        this.lessonService = new LessonsService();
    }

    async createLessons(request, response) {
        try {
            const { studentId, ...body } = request.body;
            const lessons = await this.lessonService.createLesson(studentId, body);

            return response.json(lessons);
        } catch (e) {
            response.status(500).send("something is wrong");
        }
    }
}