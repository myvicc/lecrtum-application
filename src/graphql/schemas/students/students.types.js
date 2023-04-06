const Student = `
  type Query {
    student(id: String!): Student
  }

  type Mutation {
    updateStudentUsername(username: String!): Student @userType(types: ["STUDENT"])
  }
`;

export default Student;






