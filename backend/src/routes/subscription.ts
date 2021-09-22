import Router from 'koa-router';
import subscriptionController from '../controllers/subscription';

const router: Router = new Router();

router.post('/', subscriptionController.addSubscription);

export default router;
