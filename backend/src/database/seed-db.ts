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
import ConversationSeed from './factories/conversation.factory';
import Conversation from '../models/conversation';
import MessagesSeed from './factories/message.factory';
import Message from '../models/message';

async function seedDB() {
  await dbConnection;

  const personCount = 50;
  const listingsPerPersonCount = 2;

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
    for (let i = 0; i < faker.datatype.number(listingsPerPersonCount); i += 1) {
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

  // save conversations
  // might have conversation if subjects and levels match
  const potentialPairs: Array<[Profile, Profile]> = [];
  tutorListings.forEach((tutorListing) => {
    const matchingTuteeListings = tuteeListings.filter(
      (tuteeListing) =>
        tutorListing.levels.includes(tuteeListing.level) &&
        tutorListing.subjects.some((subj) =>
          tuteeListing.subjects.includes(subj)
        )
    );
    matchingTuteeListings.forEach((tuteeListing) => {
      const { tutor } = tutorListing;
      const { tutee } = tuteeListing;
      if (
        !potentialPairs.some(
          (pair) =>
            (pair[0] === tutor && pair[1] === tutee) ||
            (pair[1] === tutor && pair[0] === tutee)
        )
      ) {
        // if conversation does not already exist
        potentialPairs.push([tutor, tutee]);
      }
    });
  });
  const pickedPairs = faker.random.arrayElements(
    potentialPairs,
    potentialPairs.length / 15
  );
  const conversations = pickedPairs.map((pair) =>
    ConversationSeed({ firstProfile: pair[0], secondProfile: pair[1] })
  );
  await getRepository(Conversation).save(conversations);

  // save messages
  let messages: Message[] = [];
  conversations.forEach((conversation) => {
    const msgs = MessagesSeed({ conversation });
    messages = messages.concat(msgs);
  });
  await getRepository(Message).save(messages);

  // eslint-disable-next-line no-console
  console.info('Seeded database');
}

seedDB();
