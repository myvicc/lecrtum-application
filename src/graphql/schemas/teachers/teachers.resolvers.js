import { TeachersService } from './teachers.service';

const service = new TeachersService();

export default {
    Query: {
        teacher: (parent, { id }) => {
            return service.getTeacher(id)
        },
    },
    Mutation: {
        updateTeacherUsername: (parent, { username }, { user }) => service.updateUsername(user.id, username),
        addBlockedSlot: (parent, { body }, { user }) => service.addBlockedSlot(user.id, body),
        addStudentsAccessFile: (parent, { body }, { user }) => service.addStudentsAccessFile(user.id, body),
        removeStudentsAccessFile: (parent, { body }, { user }) => service.removeStudentsAccessFile(user.id, body)
    }
};

