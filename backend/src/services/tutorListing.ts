import { getRepository } from 'typeorm';
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
): Promise<TutorListing> => getRepository(TutorListing).save(tutorListing);

const updateTutorListing = async (
  id: number,
  tutorListing: UpdateTutorListing
): Promise<TutorListing> =>
  getRepository(TutorListing).save({ id: Number(id), ...tutorListing });

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
