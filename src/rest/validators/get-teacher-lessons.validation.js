import * as Joi from 'joi';

export const GetTeacherLessonsValidationSchema = Joi.object({
    params: Joi.object({
        teacherId: Joi.string().hex().length(24).required()
    }),
})
