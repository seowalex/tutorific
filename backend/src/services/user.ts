import User from '../models/user';
import { getRepository } from 'typeorm';

const getUser = async (id: number): Promise<User | undefined> => {
  const userRepo = getRepository(User);
  return await userRepo.findOne(id);
};

export default {
  getUser,
};
