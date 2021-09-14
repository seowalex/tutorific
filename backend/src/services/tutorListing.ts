import { getRepository } from 'typeorm';
import classValidate from '../utils/validate';
import TutorListing, {
  CreateTutorListing,
  UpdateTutorListing,
} from '../models/tutorListing';

const getTutorListings = async (): Promise<Array<TutorListing>> =>
  getRepository(TutorListing).find();

const getTutorListing = async (id: number): Promise<TutorListing | undefined> =>
  getRepository(TutorListing).findOne(id);

const createTutorListing = async (
  tutorListing: CreateTutorListing
): Promise<TutorListing> => {
  const newTutorListing = new TutorListing();
  Object.assign(newTutorListing, tutorListing);
  await classValidate(newTutorListing, true);
  return getRepository(TutorListing).save(newTutorListing);
};

const updateTutorListing = async (
  id: number,
  tutorListing: UpdateTutorListing
): Promise<TutorListing> => {
  const updatedTutorListing = new TutorListing();
  Object.assign(updatedTutorListing, tutorListing);
  updatedTutorListing.id = Number(id);
  await classValidate(updatedTutorListing, false);
  return getRepository(TutorListing).save(updatedTutorListing);
};

const deleteTutorListing = async (id: number): Promise<void> => {
  getRepository(TutorListing).delete(id);
};

export default {
  getTutorListings,
  getTutorListing,
  createTutorListing,
  updateTutorListing,
  deleteTutorListing,
};
