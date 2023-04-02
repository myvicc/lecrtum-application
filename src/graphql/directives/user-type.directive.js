import { mapSchema, MapperKind, getDirective } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

export const userTypeDirectiveTypeDef = 'directive @userType(type: [String]!) on FIELD_DEFINITION';

export const userTypeDirectiveTransformer = (schema) =>
    mapSchema(schema, {
        [MapperKind.FIELD]: (fieldConfig) => {
            const userTypeDirective = getDirective(
                schema,
                fieldConfig,
                'userType'
            )?.[0];



            if (userTypeDirective) {
                const { type } = userTypeDirective;

                const { resolve = defaultFieldResolver} = fieldConfig;

                fieldConfig.resolve = function (parent, args, context, info) {
                    const { user } = context;

                    if (!type.includes(user.type)) {
                        throw new Error('Unauthorized');
                    }

                    return resolve(parent, args, context, info);
                };

                return fieldConfig;
            }
        },
    });
