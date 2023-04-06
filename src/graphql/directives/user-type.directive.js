import { mapSchema, MapperKind, getDirective } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

export const userTypeDirectiveTypeDef =
    'directive @userType(types: [String]!) on FIELD_DEFINITION';

export const userTypeDirectiveTransformer = (schema) =>
    mapSchema(schema, {
        [MapperKind.FIELD]: (fieldConfig) => {
            const userTypeDirective = getDirective(
                schema,
                fieldConfig,
                'userType'
            )?.[0];

            if (userTypeDirective) {
                const { types } = userTypeDirective;

                const { resolve = defaultFieldResolver } = fieldConfig;

                fieldConfig.resolve = function (parent, args, context, info) {
                    const { user } = context;

                    if (!types.includes(user.type)) {
                        throw new Error('Unauthorized');
                    }

                    return resolve(parent, args, context, info);
                };

                return fieldConfig;
            }
        },
    });

