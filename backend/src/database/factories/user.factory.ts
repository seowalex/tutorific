import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Gender } from '../../utils/model';
import Profile from '../../models/profile';
import User from '../../models/user';

define(User, (faker: typeof Faker, context?: { isTutor: boolean }) => {
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

  const firstName = faker.name.firstName(genderNum);
  const lastName = faker.name.lastName(genderNum);

  const user = new User();
  user.email = faker.internet.email(firstName, lastName);
  user.password = faker.random.words(3); // ensure that more than 8 char long
  user.refreshToken = []; // TODO what do i do
  user.profile = factory(Profile)({
    name: `${firstName} ${lastName}`,
    gender,
    isTutor: context?.isTutor,
  }) as any;
  return user;
});
