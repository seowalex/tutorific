import { getRepository } from 'typeorm';
import User from '../models/user';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

export default {
  getUser,
};
