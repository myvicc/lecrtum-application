import {TeachersController} from '../controllers/teachers.controller';
import {Router} from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import {GetTeacherLessonsValidationSchema} from '../validators/get-teacher-lessons.validation';

const controller = new TeachersController();
const router = new Router();

router.get(
    '/:teacherId/lessons',
    validationMiddleware(GetTeacherLessonsValidationSchema),
    (req, res) => controller.getTeacherLessons(req, res)
);

export default router;
