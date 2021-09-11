// import Koa from 'koa';
import Router from 'koa-router';
import authController from '../controllers/authController';

const router: Router = new Router();

router.post('/register', authController.createUser);

router.post('/login', authController.login);

export default router.routes();
