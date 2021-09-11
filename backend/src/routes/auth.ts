// import Koa from 'koa';
import Router from 'koa-router';
import authController from '../controllers/authController';

const router: Router = new Router();

router.post('/register', authController.createUser);

router.post('/login', authController.login);

router.delete('/logout', authController.logout);

router.post('/refresh', authController.refreshJwt);

export default router.routes();
