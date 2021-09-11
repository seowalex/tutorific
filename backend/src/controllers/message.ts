import Koa from 'koa';
import profileService from '../services/profile';
import messageService from '../services/message';

const createMessage = async (ctx: Koa.Context): Promise<void> => {
  // TODO sender id take from token
  const profile = await profileService.getProfile(1);
  if (!profile) {
    return;
  }

  const message = ctx.request.body;

  const newMessage = await messageService.createMessage({
    ...message,
    conversation: message.conversationId,
    sender: profile,
  });
  ctx.body = {
    data: newMessage,
  };
};

export default {
  createMessage,
};
