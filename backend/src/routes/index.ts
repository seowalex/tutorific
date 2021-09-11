import Router from 'koa-router';
import userRouter from './user';
import profileRouter from './profile';

const router = new Router({ prefix: '/api' });

router.use('/user', userRouter.routes());
router.use('/profile', profileRouter.routes());

export default router;
