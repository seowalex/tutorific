import Koa from 'koa';
import Router from 'koa-router';
import profileController from '../controllers/profile';

const router: Router = new Router();

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = 'Get all profiles';
});

router.get('/:id', profileController.getProfile);

router.post('/', async (ctx: Koa.Context) => {
  ctx.body = 'Create profile';
});

router.put('/:id', profileController.updateProfile);

router.delete('/:id', async (ctx: Koa.Context) => {
  ctx.body = 'Delete profile';
});

export default router;
