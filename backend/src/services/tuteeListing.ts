import { getRepository } from 'typeorm';
import Exception from '../utils/exception';
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
  const errors = await classValidate(newTuteeListing, true);
  if (errors.length !== 0) {
    throw new Exception(errors);
  }
  return getRepository(TuteeListing).save(tuteeListing);
};

const updateTuteeListing = async (
  id: number,
  tuteeListing: UpdateTuteeListing
): Promise<TuteeListing> =>
  getRepository(TuteeListing).save({ id: Number(id), ...tuteeListing });

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
