import Koa from 'koa';
import Router from 'koa-router';
import userController from '../controllers/user';

const router: Router = new Router();

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = 'GET ALL';
});

router.get('/:id', userController.getUser);

router.post('/', async (ctx: Koa.Context) => {
  ctx.body = 'POST';
});

router.delete('/:id', async (ctx: Koa.Context) => {
  ctx.body = 'DELETE';
});

router.patch('/:id', async (ctx: Koa.Context) => {
  ctx.body = 'PATCH';
});

export default router.routes();
