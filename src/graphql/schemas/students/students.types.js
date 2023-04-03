const Student = `
  type Query {
    student(id: String!): Student
  }

  type Mutation {
    updateStudentUsername(username: String!): Student @userType(type: ["STUDENT"])
  }
`;

export default Student;






