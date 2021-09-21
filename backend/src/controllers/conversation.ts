import Koa from 'koa';
import HttpStatus from 'http-status-codes';
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
  const conversationsWithLastMessageAndOtherProfile =
    conversationsWithLastMessage.map((convo) => ({
      id: convo.id,
      lastMessage: convo.lastMessage,
      otherProfile:
        convo.firstProfile.id === profileId
          ? convo.secondProfile
          : convo.firstProfile,
      otherProfileId:
        convo.firstProfile.id === profileId
          ? convo.secondProfile.id
          : convo.firstProfile.id,
    }));

  ctx.body = { data: conversationsWithLastMessageAndOtherProfile };
};

const getConversation = async (ctx: Koa.Context): Promise<void> => {
  // note that return type is just [Message]
  const conversationId = ctx.params.id;

  const conversation = await conversationService.getConversation(
    conversationId
  );
  if (!conversation) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  const { profileId } = ctx.state.user;
  if (
    conversation.firstProfile.id !== profileId &&
    conversation.secondProfile.id !== profileId
  ) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  const otherProfile =
    conversation.firstProfile.id === profileId
      ? conversation.secondProfile
      : conversation.firstProfile;

  const messages = await messageService.getMessages(conversationId);
  ctx.body = { data: { otherProfile, messages } };
};

const createConversation = async (ctx: Koa.Context): Promise<void> => {
  const conversation = ctx.request.body;

  const { profileId } = ctx.state.user;

  const newConversation = await conversationService.createConversation({
    firstProfile: profileId,
    secondProfile: conversation.otherProfileId,
  });

  ctx.body = {
    data: newConversation,
  };
};

export default {
  getConversations,
  getConversation,
  createConversation,
};
