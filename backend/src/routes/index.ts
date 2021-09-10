import Router from 'koa-router';
import userRouter from './user';
import profileRouter from './profile';
import authRouter from './auth';

const router = new Router();

router.use('/user', userRouter);
router.use('/profile', profileRouter);
router.use('/auth', authRouter);

export default router;
