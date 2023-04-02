import { AuthService } from './auth.service';

const service = new AuthService();

export default {
    Mutation: {
        signUpStudent: (parent, { body }) => service.signupStudent(body),
        signUpTeacher: (parent, { body }) => service.signupTeacher(body),
        loginStudent: (parent, { body }) => service.loginStudent(body),
        loginTeacher: (parent, { body }) => service.loginTeacher(body),
    },
};
