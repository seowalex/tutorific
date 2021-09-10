import Koa from 'koa';
import Router from 'koa-router';
import authController from '../controllers/authController';

const router: Router = new Router();

router.post('/register', authController.createUser);

router.get('/login', async (ctx: Koa.Context) => {
  ctx.body = 'Login';
});

export default router.routes();
