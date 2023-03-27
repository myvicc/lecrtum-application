const Student = `
  type Query {
    student(id: String!): Student
  }

  type Mutation {
    updateStudentUsername(username: String!): Student
  }
`;

export default Student;




