import Koa from 'koa';
import messageService from '../services/message';

const createMessage = async (ctx: Koa.Context): Promise<void> => {
  const { profileId } = ctx.state.user;

  const message = ctx.request.body;

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
