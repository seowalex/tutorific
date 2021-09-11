import { getRepository } from 'typeorm';
import Message, { CreateMessage } from '../models/message';

// TODO check if this works

const getMessages = async (conversationId: number): Promise<Array<Message>> =>
  getRepository(Message).find({
    where: { conversation: conversationId },
    order: { createdAt: 'DESC' },
  });

const createMessage = async (message: CreateMessage): Promise<Message> =>
  getRepository(Message).save(message);

// helpers

const getLastMessage = async (
  conversationId: number
): Promise<Message | undefined> =>
  getRepository(Message).findOne({
    where: { conversation: conversationId },
    order: { createdAt: 'DESC' },
  });

export default {
  getMessages,
  createMessage,
  getLastMessage,
};
