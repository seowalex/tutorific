import Router from 'koa-router';
import userRouter from './user';
import profileRouter from './profile';

const router = new Router();

router.use('/user', userRouter);

router.use('/profile', profileRouter);

export default router;
