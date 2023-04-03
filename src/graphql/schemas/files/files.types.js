const File = `
  type Query {
    getFiles(fileName: String): [File] @userType(type: ["TEACHER", "STUDENT"])
  }

  type Mutation {
    uploadFile(file: Upload!): File @userType(type: ["TEACHER"])
    removeFile(fileId: String!): String @userType(type: ["TEACHER"])
    addStudentsAccessFile(body: AddStudentsAccessFile!): String @userType(type: ["TEACHER"])
    removeStudentsAccessFile(body: RemoveStudentsAccessFile!): String @userType(type: ["TEACHER"])
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

export default File;
