const Teacher = `
  type Query {
    teacher(id: String!): Teacher
  }

  type Mutation {
    updateTeacherUsername(username: String!): Teacher @userType(type: ["TEACHER"])
    addBlockedSlot(body: AddBlockedSlotBody!): Teacher @userType(type: ["TEACHER"])
    addStudentsAccessFile(body: AddStudentsAccessFile!): String @userType(type: ["TEACHER"])
    removeStudentsAccessFile(body: RemoveStudentsAccessFile!): String @userType(type: ["TEACHER"])
  
  }

  input AddBlockedSlotBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
  }
  input AddStudentsAccessFile {
  fileId: String!
  studentId: String!
  }
  input RemoveStudentsAccessFile {
  fileId: String!
  studentId: String!
  }
`;

export default Teacher;
