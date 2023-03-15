const Auth = `
  type Mutation {
    signUpStudent(body: SignupStudentBody): Student,
    signUpTeacher(body: SignupTeacherBody): Teacher
  }

  input SignupStudentBody {
    username: String!
    email: String!
    password: String!
  }
  
  input SignupTeacherBody {
    username: String!
    email: String!
    password: String!
  }
`;

export default Auth;
