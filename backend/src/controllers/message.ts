import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import messageService from '../services/message';
import conversationService from '../services/conversation';

const createMessage = async (ctx: Koa.Context): Promise<void> => {
  const { profileId } = ctx.state.user;

  const message = ctx.request.body;

  const conversation = await conversationService.getConversation(
    message.conversationId
  );
  if (!conversation) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  if (
    conversation.firstProfile.id !== profileId &&
    conversation.secondProfile.id !== profileId
  ) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  const newMessage = await messageService.createMessage({
    ...message,
    conversation: message.conversationId,
    sender: profileId,
  });
  ctx.body = {
    data: newMessage,
  };
};

export default {
  createMessage,
};
