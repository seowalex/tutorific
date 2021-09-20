import faker from 'faker';
import { Gender } from '../../utils/model';
import User from '../../models/user';
import ProfileSeed from './profile.factory';

const UserSeed = (context?: { isTutor: boolean }) => {
  // more females than males in general
  const allGenders = Object.values(Gender);
  for (let i = 0; i < 3; i += 1) {
    allGenders.push(Gender.FEMALE);
  }
  const gender = faker.random.arrayElement(allGenders);
  let genderNum = faker.datatype.number(5);
  if (gender === Gender.FEMALE) {
    genderNum = 1;
  } else if (gender === Gender.MALE) {
    genderNum = 0;
  }

  // TODO not singaporean names
  const firstName = faker.name.firstName(genderNum);
  const lastName = faker.name.lastName(genderNum);
  const user = new User();
  user.email = faker.internet.email(firstName, lastName);
  user.password = 'hello123!';
  user.refreshToken = [];
  user.profile = ProfileSeed({
    name: `${firstName} ${lastName}`,
    gender,
    isTutor: context?.isTutor ?? false,
  });
  return user;
};

export default UserSeed;
