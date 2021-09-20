import Koa from 'koa';
import { GetConversations } from 'models/conversation';
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

  // only send other profile
  const conversationsWithLastMessageAndOtherProfile: Array<GetConversations> =
    conversationsWithLastMessage.map((convo) => ({
      id: convo.id,
      lastMessage: convo.lastMessage,
      otherProfile:
        convo.firstProfile.id === profileId
          ? convo.secondProfile
          : convo.firstProfile,
    }));

  ctx.body = { data: conversationsWithLastMessageAndOtherProfile };
};

const getConversation = async (ctx: Koa.Context): Promise<void> => {
  // note that return type is just [Message]
  const messages = await messageService.getMessages(ctx.params.id);
  ctx.body = { data: messages };
};

const createConversation = async (ctx: Koa.Context): Promise<void> => {
  const conversation = ctx.request.body;

  const newConversation = await conversationService.createConversation(
    conversation
  );

  ctx.body = {
    data: newConversation,
  };
};

export default {
  getConversations,
  getConversation,
  createConversation,
};
