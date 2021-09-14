import { getRepository } from 'typeorm';
import TuteeListing, {
  CreateTuteeListing,
  UpdateTuteeListing,
} from '../models/tuteeListing';
import classValidate from '../utils/validate';

const getTuteeListings = async (): Promise<Array<TuteeListing>> =>
  getRepository(TuteeListing).find();

const getTuteeListing = async (id: number): Promise<TuteeListing | undefined> =>
  getRepository(TuteeListing).findOne(id);

const createTuteeListing = async (
  tuteeListing: CreateTuteeListing
): Promise<TuteeListing> => {
  const newTuteeListing = new TuteeListing();
  Object.assign(newTuteeListing, tuteeListing);
  await classValidate(newTuteeListing, true);
  return getRepository(TuteeListing).save(newTuteeListing);
};

const updateTuteeListing = async (
  id: number,
  tuteeListing: UpdateTuteeListing
): Promise<TuteeListing> => {
  const updatedTuteeListing = new TuteeListing();
  Object.assign(updatedTuteeListing, tuteeListing);
  updatedTuteeListing.id = Number(id);
  await classValidate(updatedTuteeListing, false);
  return getRepository(TuteeListing).save(updatedTuteeListing);
};

const deleteTuteeListing = async (id: number): Promise<void> => {
  getRepository(TuteeListing).delete(id);
};

export default {
  getTuteeListings,
  getTuteeListing,
  createTuteeListing,
  updateTuteeListing,
  deleteTuteeListing,
};
