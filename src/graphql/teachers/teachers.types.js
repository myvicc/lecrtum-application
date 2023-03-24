const Teacher = `
  type Query {
    teacher(id: String!): Teacher
  }
  
  type Mutation {
    updateTeachername(username: String!): Teacher,
    setBlockedSlots(body: SetBlockedSlotsBody!): Teacher
  }
  
  input SetBlockedSlotsBody {
    date: String!,
    timeStart: String!,
    timeEnd: String!
  }
`;

export default Teacher;
