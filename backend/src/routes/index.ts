import Router from 'koa-router';
import userRouter from './user';
import profileRouter from './profile';
import tutorListingRouter from './tutorListing';

const router = new Router({ prefix: '/api' });

router.use('/user', userRouter.routes());
router.use('/profile', profileRouter.routes());
router.use('/tutor', tutorListingRouter.routes());

export default router;
