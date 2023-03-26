const Teacher = `
  type Query {
    teacher(id: String!): Teacher
    getLessons: [Lesson]
    
  }

  type Mutation {
    updateTeacherUsername(username: String!): Teacher
    addBlockedSlot(body: AddBlockedSlotBody!): Teacher
  }

  input AddBlockedSlotBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
  }
  
`;

export default Teacher;


