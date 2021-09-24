import faker from 'faker';
import { Level, Subject } from '../../utils/model';
import Profile from '../../models/profile';
import TutorListing from '../../models/tutorListing';

const TutorListingSeed = (context?: { tutor: Profile }) => {
  const tutorListing = new TutorListing();
  tutorListing.tutor = context?.tutor ?? new Profile();

  tutorListing.description = faker.lorem.paragraph(2);

  const hours = faker.random
    .arrayElements(
      Array.from(Array(7 * 24).keys()),
      faker.datatype.number({ min: 2, max: 80 })
    )
    .sort();
  tutorListing.timeSlots = [];
  hours.forEach((hour) => {
    tutorListing.timeSlots.push(hour * 2);
    tutorListing.timeSlots.push(hour * 2 + 1);
  });

  tutorListing.levels = faker.random
    .arrayElements(
      Object.values(Level),
      faker.datatype.number({ min: 1, max: Object.values(Level).length })
    )
    .sort(
      (a, b) =>
        Object.values(Level).indexOf(a) - Object.values(Level).indexOf(b)
    );

  const expectedSubjects = {
    [Level.LowerPrimary]: [
      Subject.Mathematics,
      Subject.English,
      Subject.Science,
    ],
    [Level.UpperPrimary]: [
      Subject.Mathematics,
      Subject.English,
      Subject.Science,
    ],
    [Level.LowerSecondary]: [
      Subject.Mathematics,
      Subject.English,
      Subject.Physics,
      Subject.Chemistry,
      Subject.Biology,
      Subject.Geography,
      Subject.History,
      Subject.EnglishLiterature,
      Subject.Art,
      Subject.Music,
    ],
    [Level.UpperSecondary]: [
      Subject.Mathematics,
      Subject.English,
      Subject.Physics,
      Subject.Chemistry,
      Subject.Biology,
      Subject.Geography,
      Subject.History,
      Subject.EnglishLiterature,
      Subject.Art,
      Subject.Music,
    ],
    [Level.JC]: [
      Subject.Mathematics,
      Subject.GeneralPaper,
      Subject.Economics,
      Subject.Physics,
      Subject.Chemistry,
      Subject.Biology,
      Subject.Geography,
      Subject.History,
      Subject.EnglishLiterature,
      Subject.Art,
      Subject.Music,
    ],
  };

  const subjects =
    expectedSubjects[faker.random.arrayElement(tutorListing.levels)];

  tutorListing.subjects = faker.random
    .arrayElements(subjects, faker.datatype.number({ min: 1, max: 3 }))
    .sort((a, b) => subjects.indexOf(a) - subjects.indexOf(b));

  const expectedPriceRange = {
    [Level.LowerPrimary]: [20, 25],
    [Level.UpperPrimary]: [25, 30],
    [Level.LowerSecondary]: [25, 35],
    [Level.UpperSecondary]: [30, 40],
    [Level.JC]: [40, 60],
  };

  let min = expectedPriceRange[Level.JC][1];
  let max = expectedPriceRange[Level.LowerPrimary][0];
  tutorListing.levels.forEach((level) => {
    min =
      expectedPriceRange[level][0] < min ? expectedPriceRange[level][0] : min;
    max =
      expectedPriceRange[level][1] > min ? expectedPriceRange[level][1] : max;
  });

  // TODO depends on experience also
  tutorListing.priceMin = min + faker.datatype.number(1) * 5;
  tutorListing.priceMax = max + faker.datatype.number(2) * 5;

  return tutorListing;
};

export default TutorListingSeed;
