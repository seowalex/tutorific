import Router from 'koa-router';
import subscriptionController from '../controllers/subscription';

const router: Router = new Router();

router.post('/', subscriptionController.addSubscription);
router.delete('/', subscriptionController.deleteSubscription);
router.get('/', subscriptionController.getSubscriptions);

export default router;
