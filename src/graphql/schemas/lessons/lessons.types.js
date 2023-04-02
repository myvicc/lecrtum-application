const Lesson = `
  type Query {
    teacherLessons: [Lesson] @userType(type: ["TEACHER"])
  }

  type Mutation {
    createLesson(body: CreateLessonBody!): Lesson @userType(type: ["STUDENT"])
  }

  type Subscription {
    newLesson: Lesson @userType(type: ["TEACHER"])
  }

  input CreateLessonBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
    teacherId: String!
  }
`;

export default Lesson;

