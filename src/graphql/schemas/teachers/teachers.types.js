const Teacher = `
  type Query {
    teacher(id: String!): Teacher
  }

  type Mutation {
    updateTeacherUsername(username: String!): Teacher @userType(type: ["TEACHER"])
    addBlockedSlot(body: AddBlockedSlotBody!): Teacher @userType(type: ["TEACHER"])
  }

  input AddBlockedSlotBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
  }
`;

export default Teacher;
