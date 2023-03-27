import { StudentsService } from './students.service';

const service = new StudentsService();

export default {
    Query: {
        student: (parent, { id }) => service.getStudent(id),
    },
    Mutation: {
        updateStudentUsername: (parent, { username }, { user }) => {
            if (user.type !== 'STUDENT') {
                throw new Error('Unauthorized');
            }

            return service.updateUsername(user.id, username);
        }
    }
};


