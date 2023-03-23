import { makeExecutableSchema } from '@graphql-tools/schema';
import CommonTypes from '../common.types';
import lessonTypes from './lesson.types';
import lessonResolvers from './lesson.resolvers';

const lessonSchema = makeExecutableSchema({
    typeDefs: [lessonTypes, CommonTypes],
    resolvers: lessonResolvers
});

export default lessonSchema;
