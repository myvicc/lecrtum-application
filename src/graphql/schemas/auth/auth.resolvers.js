import { AuthService } from '../../../services/auth.service';

const service = new AuthService();

export default {
    Mutation: {
        signUpStudent: (parent, { body }) => service.signupStudent(body),
        signUpTeacher: (parent, { body }) => service.signupTeacher(body),
        loginStudent: (parent, { body }) => service.loginStudent(body),
        loginTeacher: (parent, { body }) => service.loginTeacher(body),
        logoutTeacher: (parent, variables, { user }) => service.logoutTeacher(user.id),
        logoutStudent: (parent, variables, { user }) => service.logoutStudent(user.id),

    },
};
