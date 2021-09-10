import { getRepository } from 'typeorm';
import Profile from '../models/profile';

const getProfile = async (id: number): Promise<Profile | undefined> =>
  getRepository(Profile).findOne(id);

const saveProfile = async (newProfile: Object): Promise<Profile> =>
  getRepository(Profile).save(newProfile);

export default {
  getProfile,
  saveProfile,
};
