import { getRepository, NoNeedToReleaseEntityManagerError } from 'typeorm';
import User from '../models/user';


const getUser = async (id: number): Promise<User | undefined> =>
  await getRepository(User).findOne(id);

const createUser = async (new_user: User): Promise<User> =>
  await getRepository(User).save(new_user);

  

export default {
  getUser,
  createUser
};
