import { getRepository } from 'typeorm';
import classValidate from '../utils/validate';
import User, { CreateUser, UpdateUser } from '../models/user';
import Exception from '../utils/exception';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

// why is there relations here?
const getUserByEmail = async (email: string): Promise<User | undefined> =>
  getRepository(User).findOne({ email }, { relations: ['profile'] });

const createUser = async (user: CreateUser): Promise<User> => {
  const newUser = new User();
  Object.assign(newUser, user);
  const errors = await classValidate(newUser, true);
  if (errors.length !== 0) {
    throw new Exception(errors);
  }
  return getRepository(User).save(user);
};

const updateUser = async (id: number, user: UpdateUser): Promise<User> =>
  getRepository(User).save({ id: Number(id), ...user });

export default {
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
};
