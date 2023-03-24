const Auth = `
  type Mutation {
    signUpStudent(body: SignupStudentBody): Student
    signUpTeacher(body: SignupTeacherBody): Teacher
    loginStudent(body: LoginStudentBody): String
    loginTeacher(body: LoginTeacherBody): String
  }
  
  input LoginTeacherBody {
    email: String!
    password: String!
  }  
  
  input LoginStudentBody {
    email: String!
    password: String!
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

