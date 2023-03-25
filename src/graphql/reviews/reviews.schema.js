import { makeExecutableSchema } from '@graphql-tools/schema';
import CommonTypes from '../common.types';
import ReviewsResolvers from './reviews.resolvers';
import reviewsType from './reviews.type';

const reviewSchema = makeExecutableSchema({
    typeDefs: [reviewsType, CommonTypes],
    resolvers: ReviewsResolvers
});

export default reviewSchema;
