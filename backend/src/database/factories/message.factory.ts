import faker from 'faker';
import Conversation from '../../models/conversation';
import Message from '../../models/message';

const MessagesSeed = (context?: { conversation: Conversation }) => {
  const messagesTimeStamps = [
    ...Array(faker.datatype.number({ min: 1, max: 10 })),
  ]
    .map(() => faker.date.recent(14))
    .sort();

  const messages = messagesTimeStamps.map((createdAt) => {
    const message = new Message();
    message.conversation = context?.conversation ?? new Conversation();
    message.sender = faker.datatype.boolean()
      ? message.conversation.firstProfile
      : message.conversation.secondProfile;
    message.content = faker.lorem.sentence();
    message.createdAt = createdAt;
    return message;
  });

  return messages;
};

export default MessagesSeed;
