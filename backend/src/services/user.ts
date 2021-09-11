import { getRepository } from 'typeorm';
import User from '../models/user';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

const createUser = async (user: Omit<User, 'id'>): Promise<User> =>
  getRepository(User).save(user);

const getUserByEmail = async (email: string): Promise<User | undefined> =>
  getRepository(User).findOne({ email }, { relations: ['profile'] });

const storeRefreshToken = async (
  userId: number,
  token: string
): Promise<void> => {
  getRepository(User).save({
    id: userId,
    refreshToken: token,
  });
};

const revokeRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<Boolean> => {
  const userRepo = getRepository(User);
  const fetchedUser = await userRepo.findOne({ id: userId, refreshToken });
  if (fetchedUser) {
    fetchedUser.refreshToken = null;
    await userRepo.save(fetchedUser);
    return true;
  }
  return false;
};

export default {
  getUser,
  createUser,
  getUserByEmail,
  storeRefreshToken,
  revokeRefreshToken,
};
