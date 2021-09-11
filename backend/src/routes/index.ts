import Router from 'koa-router';
import userRouter from './user';
import profileRouter from './profile';
import authRouter from './auth';
import tutorListingRouter from './tutorListing';
import tuteeListingRouter from './tuteeListing';
import conversationRouter from './conversation';
import messageRouter from './message';

const router = new Router({ prefix: '/api' });

router.use('/user', userRouter.routes());
router.use('/profile', profileRouter.routes());
router.use('/tutor', tutorListingRouter.routes());
router.use('/tutee', tuteeListingRouter.routes());
router.use('/conversation', conversationRouter.routes());
router.use('/message', messageRouter.routes());
router.use('/auth', authRouter.routes());

export default router;
