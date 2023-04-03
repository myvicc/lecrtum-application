import { userTypeDirectiveTypeDef, userTypeDirectiveTransformer } from './user-type.directive';

export const directivesDef = `
    ${userTypeDirectiveTypeDef}
`;

export const applyDirectives = (schema) => {
    schema = userTypeDirectiveTransformer(schema);

    return schema;
}

