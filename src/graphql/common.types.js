const Common = `
  type Review {
    id: String!
    date: String!
    text: String!
    studentId: String!
    teacherId: String!
  }

  type Student {
    id: String!
    username: String!
    email: String!
  }

  type Teacher {
    id: String!
    username: String!
    email: String!
    blockedSlots: [TimeSlot]
  }

  type TimeSlot {
    date: String!
    timeStart: Int!
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

