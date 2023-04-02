const File = `
  type Query {
    getFiles(fileName: String): [File] @userType(type: ["TEACHER", "STUDENT"])
  }

  type Mutation {
    uploadFile(file: Upload!): File @userType(type: ["TEACHER"])
    removeFile(fileId: String!): String @userType(type: ["TEACHER"])
  }
`;

export default File;
