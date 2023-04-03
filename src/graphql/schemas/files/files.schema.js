import { makeExecutableSchema } from '@graphql-tools/schema';

import { uploadScalarResolver } from '../../scalars/upload.scalar';
import commonTypes from '../../common.types';
import filesTypes from './files.types';
import filesResolvers from './files.resolvers';

const filesSchema = makeExecutableSchema({
    typeDefs: [filesTypes, commonTypes],
    resolvers: [filesResolvers, uploadScalarResolver]
});

export default filesSchema;
