import User from '../models/user';
import { getRepository } from 'typeorm';

const getUser = async (id: string): Promise<User | undefined> => {
  return await getRepository(User).findOne(id);
};

export default {
  getUser,
};
