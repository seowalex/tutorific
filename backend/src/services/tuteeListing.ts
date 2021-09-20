import {
  FindConditions,
  getRepository,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Raw,
} from 'typeorm';
import TuteeListing, {
  CreateTuteeListing,
  QueryTuteeListing,
  UpdateTuteeListing,
} from '../models/tuteeListing';
import classValidate from '../utils/validate';

const getTuteeListings = async (
  queries: QueryTuteeListing
): Promise<[Array<TuteeListing>, number]> => {
  const conditions: FindConditions<TuteeListing> = {};
  if (queries.priceMin) {
    conditions.priceMin = MoreThanOrEqual(Number(queries.priceMin));
  }

  if (queries.priceMax) {
    conditions.priceMax = LessThanOrEqual(Number(queries.priceMax));
  }

  if (queries.levels) {
    conditions.level =
      typeof queries.levels === 'string'
        ? In([queries.levels])
        : In(queries.levels);
  }

  if (queries.timeSlots) {
    conditions.timeSlots = Raw(
      (timeSlots) => `${timeSlots} @> :queryTimeSlots`,
      {
        queryTimeSlots: [queries.timeSlots],
      }
    );
  }

  if (queries.subjects) {
    conditions.subjects = Raw((subjects) => `${subjects} <@ :querySubjects`, {
      querySubjects: [queries.subjects],
    });
  }

  if (queries.locations) {
    conditions.location =
      typeof queries.locations === 'string'
        ? In([queries.locations])
        : In(queries.locations);
  }

  if (queries.gender) {
    conditions.gender = queries.gender;
  }

  if (queries.profileId) {
    conditions.tutee = {
      id: queries.profileId,
    };
  }

  return getRepository(TuteeListing).findAndCount({
    where: conditions,
    cache: true,
    skip: queries.skip ?? 0,
    take: queries.limit ?? 10,
  });
};

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
