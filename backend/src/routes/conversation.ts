import Router from 'koa-router';
import conversationController from '../controllers/conversation';

const router: Router = new Router();

router.get('/', conversationController.getConversations);

router.get('/:id', conversationController.getConversation);

router.post('/', conversationController.createConversation);

export default router;
