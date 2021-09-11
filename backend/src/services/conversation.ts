import { getRepository } from 'typeorm';
import Conversation, { CreateConversation } from '../models/conversation';

const getConversations = async (
  profileId: number
): Promise<Array<Conversation>> =>
  getRepository(Conversation).find({
    where: [{ firstProfile: profileId }, { secondProfile: profileId }],
  });

const createConversation = async (
  conversation: Omit<CreateConversation, 'firstMessage'>
): Promise<Conversation> => getRepository(Conversation).save(conversation);

export default {
  getConversations,
  createConversation,
};
