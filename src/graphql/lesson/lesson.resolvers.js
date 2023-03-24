import { LessonService } from './lesson.service';

const service = new LessonService();

export default {
    Mutation: {
        createLesson: (parent, {body}, {user}) => {
            if (user.type !== 'STUDENT') {
                throw new Error('Unauthorized');
            }

            return service.createLesson(user.id, body);
        }
    }
}
