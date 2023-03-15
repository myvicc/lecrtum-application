import { makeExecutableSchema, mergeSchemas } from "@graphql-tools/schema";
import authSchema from "./auth/auth.schema";

const linkSchema = makeExecutableSchema({
    typeDefs: `
     type Query {
        _: Boolean
     }   
    `
});

const schema = mergeSchemas({
    schemas: [linkSchema, authSchema]
});

export default schema;