import {Router} from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import {LessonsController} from '../controllers/lessons.controller';
import {PostLessonsCreateValidationSchema} from '../validators/post-create-lesson.validation';

const controller = new LessonsController();
const router = new Router();

router.post( '/',
    validationMiddleware(PostLessonsCreateValidationSchema),
    (req, res) => controller.createLessons(req, res)
);

export default router;