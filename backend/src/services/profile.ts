import { getRepository } from 'typeorm';
import Profile from '../models/profile';

const getProfile = async (id: number): Promise<Profile | undefined> =>
  getRepository(Profile).findOne(id);

const createProfile = async (profile: Omit<Profile, 'id'>): Promise<Profile> =>
  getRepository(Profile).save(profile);

const updateProfile = async (
  id: number,
  profile: Partial<Profile>
): Promise<Profile> =>
  getRepository(Profile).save({ id: Number(id), ...profile });

export default {
  getProfile,
  createProfile,
  updateProfile,
};
