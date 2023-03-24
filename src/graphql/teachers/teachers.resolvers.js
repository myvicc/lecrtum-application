import { TeachersService } from './teachers.service';

const service = new TeachersService();

export default {
    Query: {
        teacher: (parent, { id }) => service.getTeacher(id),
    },

    Mutation: {
        updateTeachername: (parent, { username }, { user }) => {
            if (user.type !== "TEACHER") {
                throw new Error("Unautorized");
            }

            return service.updateTeachername(user.id, username);
        },

        setBlockedSlots: (parent, { body }, { user }) => {
            if (user.type !== "TEACHER") {
                throw new Error("Unautorized");
            }

            return service.setBlockedSlots(user.id, body);
        }
    }
};


