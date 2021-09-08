import Koa from 'koa';
import Router from 'koa-router';
import userRouter from './user';

const router = new Router();

router.use('/user', userRouter);

export default router;
