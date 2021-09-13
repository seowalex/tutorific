import { getRepository } from 'typeorm';
import { Gender, Level } from '../utils/model';
import TutorListing, {
  CreateTutorListing,
  UpdateTutorListing,
} from '../models/tutorListing';

const getTutorListings = async (): Promise<Array<TutorListing>> => {
  const listing = {
    id: 123,
    tutor: {
      id: 456,
      name: 'SC',
      description: 'desc',
      gender: Gender.MALE,
      createdAt: new Date()
    },
    priceMin: 30,
    priceMax: 40,
    description: '8 distinctions at GCE A levels, tutoring since 2017',
    timeSlots: [1],
    subjects: ['Mathematics', 'Science'],
    levels: [Level.JC],
    createdAt: new Date()
  };

  return new Promise((res, rej) => res([listing, listing, listing]));
}
  // getRepository(TutorListing).find();

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
