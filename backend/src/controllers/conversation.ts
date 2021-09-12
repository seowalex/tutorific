import Koa from 'koa';
import { CreateConversation } from '../models/conversation';
import conversationService from '../services/conversation';
import messageService from '../services/message';

const getConversations = async (ctx: Koa.Context): Promise<void> => {
  const { profileId } = ctx.state.user;

  const conversations = await conversationService.getConversations(profileId);

  // append last message
  const conversationsWithLastMessage = await Promise.all(
    conversations.map(async (conversation) => ({
      ...conversation,
      lastMessage: await messageService.getLastMessage(conversation.id),
    }))
  );

  // sort by last message date
  conversationsWithLastMessage.sort((a, b) => {
    const aLastMessageCreatedAt = a.lastMessage?.createdAt;
    const bLastMessageCreatedAt = b.lastMessage?.createdAt;
    if (aLastMessageCreatedAt && bLastMessageCreatedAt) {
      return bLastMessageCreatedAt.getTime() - aLastMessageCreatedAt.getTime();
    }
    return 0;
  });

  ctx.body = { data: conversationsWithLastMessage };
};

const getConversation = async (ctx: Koa.Context): Promise<void> => {
  // note that return type is just [Message]
  const messages = await messageService.getMessages(ctx.params.id);
  ctx.body = { data: messages };
};

const createConversation = async (ctx: Koa.Context): Promise<void> => {
  const conversation: CreateConversation & {
    firstMessage: string;
  } = ctx.request.body;

  const conversationEntity: CreateConversation & {
    firstMessage?: string;
  } = { ...conversation };
  delete conversationEntity.firstMessage;
  const newConversation = await conversationService.createConversation(
    conversationEntity
  );

  const { profileId } = ctx.state.user;

  const message = await messageService.createMessage({
    conversation: newConversation,
    sender: profileId,
    content: conversation.firstMessage,
  });

  // not sure what shld be returned?
  ctx.body = {
    data: {
      conversation: newConversation,
      message,
    },
  };
};

export default {
  getConversations,
  getConversation,
  createConversation,
};
