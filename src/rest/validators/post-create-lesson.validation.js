import * as Joi from 'joi';

export const PostLessonsCreateValidationSchema = Joi.object({
    request: Joi.object({
        date: Joi.string().required(),
        timeStart: Joi.number().integer().min(16).max(19).required(),
        timeEnd: Joi.number().integer().min(17).max(20).greater(Joi.ref('timeStart')).required(),
        teacherId: Joi.string().hex().length(24).required(),
        studentId: Joi.string().hex().length(24).required()
    })
})