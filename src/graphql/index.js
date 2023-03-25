import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';
import authSchema from './auth/auth.schema';
import studentsSchema from './students/students.schema';
import teachersSchema from './teachers/teachers.schema';
import lessonsSchema from './lessons/lessons.schema';
import reviewSchema from './reviews/reviews.schema';


const linkSchema = makeExecutableSchema({
    typeDefs: `
    type Query {
      _: Boolean
    }
  `,
});

const schema = mergeSchemas({
    schemas: [linkSchema, studentsSchema, teachersSchema, authSchema, lessonsSchema, reviewSchema],
});

export default schema;

