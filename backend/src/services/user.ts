import { getRepository } from 'typeorm';
import User, { CreateUser, UpdateUser } from '../models/user';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

const getUserByEmail = async (email: string): Promise<User | undefined> =>
  getRepository(User).findOne({ email });

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
