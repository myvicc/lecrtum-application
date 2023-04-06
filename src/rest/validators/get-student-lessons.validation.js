import * as Joi from 'joi';

export const GetStudentLessonsValidationSchema = Joi.object({
    params: Joi.object({
        studentId: Joi.string().hex().length(24).required()
    }),
})
