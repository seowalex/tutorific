import { getRepository } from 'typeorm';
import User from '../models/user';


const getUser = async (id: number): Promise<User | undefined> =>
  getRepository(User).findOne(id);

const createUser = async (newUser: User): Promise<User> =>
  getRepository(User).save(newUser);

  

export default {
  getUser,
  createUser
};
