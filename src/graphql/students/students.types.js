const Student = `
  type Query {
    student(id: String!): Student
  }
  
  type Mutation {
    updateUsername(username: String!): Student
  }
`;

export default Student;


