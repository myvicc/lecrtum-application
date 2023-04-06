import {StatsController} from '../controllers/stats.controller';
import {Router} from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import {GetUserStatsSchema} from '../validators/get-user-stats.validation';

const controller = new StatsController();
const router = new Router();

router.get('/users', validationMiddleware(GetUserStatsSchema), (req, res) => controller.getUserStats(req, res));
router.get('/registered-students', (req, res) => controller.getNumberOfRegisteredStudents(req, res));
router.get('/registered-teachers', (req, res) => controller.getNumberOfRegisteredTeachers(req, res));
router.get('/online-students', (req, res) => controller.getNumberOfOnlineStudents(req, res));
router.get('/online-teachers', (req, res) => controller.getNumberOfOnlineTeachers(req, res));
export default router;
