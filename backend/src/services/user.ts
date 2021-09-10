import { getRepository } from 'typeorm';
import User from '../models/user';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

const createUser = async (user: Omit<User, 'id'>): Promise<User> =>
  getRepository(User).save(user);

export default {
  getUser,
  createUser,
};
