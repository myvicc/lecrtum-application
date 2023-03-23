const Lesson = `
    type Mutation {
        createLesson(body: CreateLessonBody!): Lesson
    }
    
    input CreateLessonBody {
        date: String!
        timeStart: String!
        timeEnd: String!
        teacherId: String!
    }
`;

export default Lesson;
