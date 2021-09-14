import { getRepository } from 'typeorm';
import classValidate from '../utils/validate';
import Profile, { CreateProfile, UpdateProfile } from '../models/profile';

const getProfile = async (id: number): Promise<Profile | undefined> =>
  getRepository(Profile).findOne(id);

const createProfile = async (profile: CreateProfile): Promise<Profile> => {
  const newProfile = new Profile();
  Object.assign(newProfile, profile);
  await classValidate(newProfile, false);
  return getRepository(Profile).save(newProfile);
};

// TODO need to fetch profile?
const updateProfile = async (
  id: number,
  profile: UpdateProfile
): Promise<Profile> => {
  const updatedProfile = new Profile();
  Object.assign(updatedProfile, profile);
  updatedProfile.id = Number(id);
  await classValidate(updatedProfile, false);
  return getRepository(Profile).save(updatedProfile);
};

export default {
  getProfile,
  createProfile,
  updateProfile,
};
