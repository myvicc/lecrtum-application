import { TeachersService } from "./teacher.service";

const service = new TeachersService();

export default {
    Query: {
        teacher: (parent, { id }) => service.getTeacher(id),
    },
};
