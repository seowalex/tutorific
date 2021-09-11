import { getRepository } from 'typeorm';
import Conversation, { CreateConversation } from '../models/conversation';

const getConversations = async (): Promise<Array<Conversation>> =>
  getRepository(Conversation).find();

const createConversation = async (
  conversation: Omit<CreateConversation, 'firstMessage'>
): Promise<Conversation> => getRepository(Conversation).save(conversation);

export default {
  getConversations,
  createConversation,
};
