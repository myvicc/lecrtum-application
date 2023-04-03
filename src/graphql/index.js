import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';
import {applyDirectives} from './directives';
import {schemas} from './schemas';

const linkSchema = makeExecutableSchema({
    typeDefs: `
    type Query {
      _: Boolean
    }
  `,
});

let schema = mergeSchemas({
    schemas: [linkSchema, ...schemas],
});

schema = applyDirectives(schema);

export default schema;

