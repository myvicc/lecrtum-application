import statsRouter from './routes/stats.router';
import teacherRouter from './routes/teacher.router';
import studentRouter from './routes/student.router';
import lessonRouter from './routes/lesson.router';

export const applyRoutes = (app) => {
    app.use('/stats', statsRouter);
    app.use('/teachers', teacherRouter);
    app.use('/students', studentRouter);
    app.use('/lessons', lessonRouter);
}
