import { getRepository } from 'typeorm';
import User, { CreateUser } from '../models/user';

const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

const createUser = async (user: CreateUser): Promise<User> =>
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

const getUserByRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<User | undefined> =>
  getRepository(User).findOne(
    { id: userId, refreshToken },
    { relations: ['profile'] }
  );

const revokeRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<Boolean> => {
  const fetchedUser = await getUserByRefreshToken(userId, refreshToken);
  if (fetchedUser) {
    fetchedUser.refreshToken = null;
    await getRepository(User).save(fetchedUser);
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
  getUserByRefreshToken,
};
