const Lesson = `
  type Query {
    teacherLessons: [Lesson] @userType(types: ["TEACHER"])
    studentLessons: [Lesson] @userType(types: ["STUDENT"])
  }

  type Mutation {
    createLesson(body: CreateLessonBody!): Lesson @userType(types: ["STUDENT"])
  }

  type Subscription {
    newLesson: Lesson @userType(types: ["TEACHER"])
  }

  input CreateLessonBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
    teacherId: String!
  }
`;

export default Lesson;

