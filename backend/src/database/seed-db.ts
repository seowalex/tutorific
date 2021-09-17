import { getRepository } from 'typeorm';
import faker from 'faker';
import TuteeListing from '../models/tuteeListing';
import Profile from '../models/profile';
import UserSeed from './factories/user.factory';
import dbConnection from './connection';
import User from '../models/user';
import TutorListingSeed from './factories/tutor.factory';
import TutorListing from '../models/tutorListing';
import TuteeListingSeed from './factories/tutee.factory';

async function seedDB() {
  await dbConnection;

  const personCount = 50;

  // save users and profiles
  const tutors = [...Array(personCount)].map(() => UserSeed({ isTutor: true }));
  const tutees = [...Array(personCount)].map(() =>
    UserSeed({ isTutor: false })
  );
  const users = tutors.concat(tutees);
  await getRepository(User).save(users);
  await getRepository(Profile).save(users.map((user) => user.profile));

  // save tutorListings
  const tutorListings: TutorListing[] = [];
  tutors.forEach((tutor) => {
    for (let i = 0; i < faker.datatype.number(2); i += 1) {
      const tutorListing = TutorListingSeed({ tutor: tutor.profile });
      tutorListings.push(tutorListing);
    }
  });
  await getRepository(TutorListing).save(tutorListings);

  // save tuteeListings
  const tuteeListings: TuteeListing[] = [];
  tutees.forEach((tutee) => {
    for (let j = 0; j < faker.datatype.number(2); j += 1) {
      const tuteeListing = TuteeListingSeed({ tutee: tutee.profile });
      tuteeListings.push(tuteeListing);
    }
  });
  await getRepository(TuteeListing).save(tuteeListings);

  // eslint-disable-next-line no-console
  console.info('Seeded database');
}

seedDB();
