import { StudentsService } from "./students.service";

const service = new StudentsService();

export default {
    Query: {
        student: (parent, { id }) => service.getStudent(id),
    },
};
