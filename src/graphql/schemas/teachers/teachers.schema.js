import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import teachersTypes from './teachers.types';
import teachersResolvers from './teachers.resolvers';
import { uploadScalarResolver } from '../../scalars/upload.scalar';

const teachersSchema = makeExecutableSchema({
    typeDefs: [teachersTypes, commonTypes],
    resolvers: [teachersResolvers, uploadScalarResolver]
});

export default teachersSchema;




