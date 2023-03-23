const Common = `
  type Student {
    id: String!
    username: String!
    email: String!
  }
  
  type Teacher {
    id: String!
    username: String!
    email: String!
    blockedSlots: [BlockedSlots]
  }
  
  type BlockedSlots {
    date: String!,
    timeStart: Int!,
    timeEnd: Int!
    }
  
  type Lesson {
    id: String!
    date: String!
    timeStart: Int!
    timeEnd: Int!
    teacherId: String!
    studentId: String!
  }
  
`;

export default Common;
