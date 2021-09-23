import {
  getRepository,
  MoreThanOrEqual,
  LessThanOrEqual,
  Raw,
  FindConditions,
} from 'typeorm';
import classValidate from '../utils/validate';
import TutorListing, {
  CreateTutorListing,
  QueryTutorListing,
  UpdateTutorListing,
} from '../models/tutorListing';

const getTutorListings = async (
  queries: QueryTutorListing
): Promise<[Array<TutorListing>, number]> => {
  const conditions: FindConditions<TutorListing> = {};
  if (queries.priceMin) {
    conditions.priceMin = MoreThanOrEqual(Number(queries.priceMin));
  }

  if (queries.priceMax) {
    conditions.priceMax = LessThanOrEqual(Number(queries.priceMax));
  }

  if (queries.levels) {
    conditions.levels = Raw((levels) => `${levels} @> :queryLevel`, {
      queryLevel: [queries.levels],
    });
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
    conditions.subjects = Raw((subjects) => `${subjects} @> :querySubjects`, {
      querySubjects: [queries.subjects],
    });
  }

  if (queries.gender) {
    conditions.tutor = {
      gender: queries.gender,
    };
  }

  if (queries.profileId) {
    conditions.tutor = {
      id: queries.profileId,
    };
  }

  return getRepository(TutorListing).findAndCount({
    relations: ['tutor'],
    where: conditions,
    cache: true,
    skip: queries.skip ?? 0,
    take: queries.limit ?? 10,
    order: {
      createdAt: 'DESC',
    },
  });
};
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
