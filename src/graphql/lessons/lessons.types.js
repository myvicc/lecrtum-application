const Lesson = `
  type Query {
    teacherLessons: [Lesson]
  }

  type Mutation {
    createLesson(body: CreateLessonBody!): Lesson
  }

  type Subscription {
    newLesson: Lesson
  }

  input CreateLessonBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
    teacherId: String!
  }
`;

export default Lesson;

