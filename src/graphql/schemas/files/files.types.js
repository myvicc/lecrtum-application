const File = `
  type Query {
    getFiles(fileName: String): [File] @userType(types: ["TEACHER", "STUDENT"])
  }

  type Mutation {
    uploadFile(file: Upload!): File @userType(types: ["TEACHER"])
    removeFile(fileId: String!): String @userType(types: ["TEACHER"])
    addStudentsAccessFile(body: AddStudentsAccessFile!): String @userType(types: ["TEACHER"])
    removeStudentsAccessFile(body: RemoveStudentsAccessFile!): String @userType(types: ["TEACHER"])
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
