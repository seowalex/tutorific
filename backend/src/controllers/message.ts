import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import messageService from '../services/message';
import conversationService from '../services/conversation';
import subscriptionService from '../services/subscription';
import webpush from '../index';

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

  const receiverId =
    conversation.firstProfile.id !== profileId
      ? conversation.firstProfile.id
      : conversation.secondProfile.id;

  const senderName =
    conversation.firstProfile.id !== profileId
      ? conversation.firstProfile.name
      : conversation.secondProfile.name;

  const subscriptions = await subscriptionService.getSubscriptions(receiverId);

  const payload = {
    title: senderName,
    body: message.content,
    data: {
      chatId: conversation.id,
    },
  };

  subscriptions.forEach((pushSubscription) =>
    webpush.sendNotification(
      JSON.parse(pushSubscription.subscriptionJson),
      JSON.stringify(payload)
    )
  );

  ctx.body = {
    data: newMessage,
  };
};

export default {
  createMessage,
};
