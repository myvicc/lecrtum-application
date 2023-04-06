import { TeachersService } from '../../../services/teachers.service';

const service = new TeachersService();

export default {
    Query: {
        teacher: (parent, { id }) => {
            return service.getTeacher(id)
        },
    },
    Mutation: {
        updateTeacherUsername: (parent, { username }, { user }) => service.updateUsername(user.id, username),
        addBlockedSlot: (parent, { body }, { user }) => service.addBlockedSlot(user.id, body)
    }
};

