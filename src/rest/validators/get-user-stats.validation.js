import * as Joi from 'joi';
import {USER_TYPES} from '../../constants/user.types';

export const GetUserStatsSchema = Joi.object({
    query: Joi.object({
        type: Joi.string().valid(...Object.values(USER_TYPES)).required(),
    })
})
