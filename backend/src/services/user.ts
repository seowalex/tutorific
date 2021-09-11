import { getRepository } from 'typeorm';
import User, { CreateUser } from '../models/user';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

const createUser = async (user: CreateUser): Promise<User> =>
  getRepository(User).save(user);

export default {
  getUser,
  createUser,
};
