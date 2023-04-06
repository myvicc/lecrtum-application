import {LessonsService} from '../../services';

export class TeachersController {
    constructor() {
        this.lessonService = new LessonsService();
    }

    async getTeacherLessons(request, response) {
        try {
            const { teacherId } = request.params;
            const lessons = await this.lessonService.getTeachersLesson(teacherId);

            return response.json(lessons);
        } catch (e) {
            console.log(e);

            response.status(500).send('Something bad happened');

        }
    }

}
