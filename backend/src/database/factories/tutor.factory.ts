import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Level, Subject } from '../../utils/model';
import Profile from '../../models/profile';
import TutorListing from '../../models/tutorListing';

define(TutorListing, (faker: typeof Faker, context?: { tutor: Profile }) => {
  const tutorListing = new TutorListing();
  tutorListing.tutor = context?.tutor ?? new Profile();

  tutorListing.description = faker.lorem.paragraph(2);

  const hours = faker.random.arrayElements(
    Array.from(Array(7 * 24).keys()),
    faker.random.number({ min: 2, max: 80 })
  );
  tutorListing.timeSlots = [];
  hours.forEach((hour) => {
    tutorListing.timeSlots.push(hour * 2);
    tutorListing.timeSlots.push(hour * 2 + 1);
  });

  tutorListing.subjects = faker.random.arrayElements(
    Object.values(Subject),
    faker.random.number({ min: 1, max: 3 })
  );

  tutorListing.levels = faker.random.arrayElements(
    Object.values(Level),
    faker.random.number({ min: 1, max: Object.values(Level).length })
  );

  const expectedPriceRange = {
    [Level.LowerPrimary]: [20, 25],
    [Level.UpperPrimary]: [25, 30],
    [Level.LowerSecondary]: [25, 35],
    [Level.UpperSecondary]: [30, 40],
    [Level.JC]: [40, 60],
  };

  // TODO depends on experience also
  tutorListing.priceMin =
    expectedPriceRange[tutorListing.levels[0]][0] +
    faker.datatype.number(1) * 5;
  tutorListing.priceMax =
    expectedPriceRange[tutorListing.levels[tutorListing.levels.length - 1]][1] +
    faker.datatype.number(2) * 5;

  return tutorListing;
});
