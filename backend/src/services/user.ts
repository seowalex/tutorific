import { getRepository } from 'typeorm';
import classValidate from '../utils/validate';
import User, { CreateUser, UpdateUser } from '../models/user';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

const getUserByEmail = async (email: string): Promise<User | undefined> =>
  getRepository(User).findOne({ email });

const createUser = async (user: CreateUser): Promise<User> => {
  const newUser = new User();
  Object.assign(newUser, user);
  await classValidate(newUser, true);
  return getRepository(User).save(newUser);
};

const updateUser = async (id: number, user: UpdateUser): Promise<User> => {
  const updatedUser = new User();
  Object.assign(updatedUser, user);
  updatedUser.id = Number(id);
  await classValidate(updatedUser, false);
  return getRepository(User).save(updatedUser);
};

export default {
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
};
