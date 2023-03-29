const Teacher = `
  type Query {
    teacher(id: String!): Teacher
    getLessons: [Lesson]
    getUploadFiles(fileName: String): [File]
    
  }

  type Mutation {
    updateTeacherUsername(username: String!): Teacher
    addBlockedSlot(body: AddBlockedSlotBody!): Teacher
    uploadFile(file: Upload!): File
    deleteFile(fileId: String! ): String
  }

  input AddBlockedSlotBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
  }
  
`;

export default Teacher;


