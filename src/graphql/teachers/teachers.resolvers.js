import { TeachersService } from "./teachers.service";

const service = new TeachersService();

export default {
    Query: {
        teacher: (parent, { id }) => service.getTeacher(id),
    },
};
