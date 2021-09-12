import { getRepository } from 'typeorm';
import User, { CreateUser, UpdateUser } from '../models/user';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

// why is there relations here?
const getUserByEmail = async (email: string): Promise<User | undefined> =>
  getRepository(User).findOne({ email }, { relations: ['profile'] });

const createUser = async (user: CreateUser): Promise<User> =>
  getRepository(User).save(user);

const updateUser = async (id: number, user: UpdateUser): Promise<User> =>
  getRepository(User).save({ id: Number(id), ...user });

export default {
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
};
