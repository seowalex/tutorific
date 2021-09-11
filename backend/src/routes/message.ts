import Router from 'koa-router';
import messageController from '../controllers/message';

const router: Router = new Router();

router.post('/', messageController.createMessage);

export default router;
