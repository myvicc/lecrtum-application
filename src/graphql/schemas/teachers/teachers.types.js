const Teacher = `
  type Query {
    teacher(id: String!): Teacher
  }

  type Mutation {
    updateTeacherUsername(username: String!): Teacher @userType(types: ["TEACHER"])
    addBlockedSlot(body: AddBlockedSlotBody!): Teacher @userType(types: ["TEACHER"])
  }

  input AddBlockedSlotBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
  }
`;

export default Teacher;
