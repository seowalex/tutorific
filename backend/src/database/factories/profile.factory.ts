import faker from 'faker';
import { Gender } from '../../utils/model';
import Profile from '../../models/profile';

const ProfileSeed = (context?: {
  name: string;
  gender: Gender;
  isTutor: boolean;
}) => {
  const profile = new Profile();
  profile.name = context?.name ?? faker.name.findName();

  // depends on whether tutor tutee
  // age, credition - current profession, years of experience, degree from, school
  if (context?.isTutor === true) {
    const ageBio = `I am a ${faker.datatype.number({
      min: 18,
      max: 30,
    })} year old ${faker.random.arrayElement([
      'full-time',
      'part-time',
      'ex-MOE',
    ])} tutor giving tuition.`;
    const yearsExperience = `I have been teaching tuition for the past ${faker.datatype.number(
      30
    )} years.`;
    const qualification = `I have a ${faker.random.arrayElement([
      `university degree`,
      `${faker.datatype.number({
        min: 4,
        max: 7,
      })} distinctions in my A Levels`,
      `${
        3.0 + faker.datatype.number(10) / 10
      } GPA from my ${faker.random.arrayElement([
        'university',
        'polytechnic',
      ])}`,
    ])}.`;
    profile.description = faker.helpers
      .shuffle(
        faker.random.arrayElements([ageBio, yearsExperience, qualification], 2)
      )
      .join(' ');
  } else {
    const isMother = faker.datatype.boolean();
    if (isMother) {
      profile.description = 'I am a mother looking for tuition for my kids.';
    } else {
      profile.description = 'I am looking for tuition for my subjects.';
    }
  }

  profile.gender =
    context?.gender ?? faker.random.arrayElement(Object.values(Gender));
  return profile;
};

export default ProfileSeed;
