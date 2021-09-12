// import Koa from 'koa';
import Router from 'koa-router';
import authController from '../controllers/auth';

const router: Router = new Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.delete('/logout', authController.logout);

router.post('/refresh', authController.refreshJwt);

export default router;
