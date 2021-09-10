import Koa from 'koa';
import Router from 'koa-router';
import userController from '../controllers/user';

const router: Router = new Router();

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = 'GET ALL';
});

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

router.delete('/:id', async (ctx: Koa.Context) => {
  ctx.body = 'DELETE';
});

router.post('/:id', async (ctx: Koa.Context) => {
  ctx.body = 'POST';
});

export default router;
