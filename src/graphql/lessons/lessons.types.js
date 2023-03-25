const Lesson = `
  type Mutation {
    createLesson(body: CreateLessonBody!): Lesson
  }

  input CreateLessonBody {
    date: String!
    timeStart: Int!
    timeEnd: Int!
    teacherId: String!
  }
  
  type Subscription {
        createLesson(body: CreateLessonBody!): Lesson
    }
`;

export default Lesson;

