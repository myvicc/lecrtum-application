import { Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import {GetStudentLessonsValidationSchema} from '../validators/get-student-lessons.validation';
import {StudentsController} from '../controllers/students.controller';

const controller = new StudentsController();
const router = new Router();

router.get( '/:studentId/lessons',
    validationMiddleware(GetStudentLessonsValidationSchema),
    (req, res) => controller.getStudentLessons(req, res)
);

export default router;