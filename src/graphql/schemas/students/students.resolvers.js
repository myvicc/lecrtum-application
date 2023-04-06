import { StudentsService } from '../../../services/students.service';

const service = new StudentsService();

export default {
    Query: {
        student: (parent, { id }) => service.getStudent(id),
    },
    Mutation: {
        updateStudentUsername: (parent, { username }, { user }) => service.updateUsername(user.id, username)
    }
};
