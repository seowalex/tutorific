import { getRepository } from 'typeorm';
import classValidate from '../utils/validate';
import Conversation, { CreateConversation } from '../models/conversation';

const getConversation = async (id: number): Promise<Conversation | undefined> =>
  getRepository(Conversation).findOne(id);

const getConversations = async (
  profileId: number
): Promise<Array<Conversation>> =>
  getRepository(Conversation).find({
    where: [{ firstProfile: profileId }, { secondProfile: profileId }],
  });

const createConversation = async (
  conversation: CreateConversation
): Promise<Conversation> => {
  const newConversation = new Conversation();
  Object.assign(newConversation, conversation);
  await classValidate(newConversation, true);
  return getRepository(Conversation).save(newConversation);
};

export default {
  getConversation,
  getConversations,
  createConversation,
};
