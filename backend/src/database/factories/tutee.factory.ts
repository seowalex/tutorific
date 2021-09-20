import faker from 'faker';
import { Gender, Level, Town } from '../../utils/model';
import Profile from '../../models/profile';
import TuteeListing from '../../models/tuteeListing';

const TuteeListingSeed = (context?: { tutee: Profile }) => {
  const tuteeListing = new TuteeListing();
  tuteeListing.tutee = context?.tutee ?? new Profile();

  tuteeListing.description = faker.lorem.paragraph(2);

  const hours = faker.random
    .arrayElements(
      Array.from(Array(7 * 24).keys()),
      faker.datatype.number({ min: 2, max: 80 })
    )
    .sort();
  tuteeListing.timeSlots = [];
  hours.forEach((hour) => {
    tuteeListing.timeSlots.push(hour * 2);
    tuteeListing.timeSlots.push(hour * 2 + 1);
  });

  const subjects = ['English', 'Chinese', 'Math', 'Science'];

  tuteeListing.subjects = faker.random
    .arrayElements(
      subjects,
      faker.datatype.number({ min: 1, max: subjects.length })
    )
    .sort((a, b) => subjects.indexOf(a) - subjects.indexOf(b));

  tuteeListing.level = faker.random.arrayElement(Object.values(Level));

  const expectedPriceRange = {
    [Level.LowerPrimary]: [20, 25],
    [Level.UpperPrimary]: [25, 30],
    [Level.LowerSecondary]: [25, 35],
    [Level.UpperSecondary]: [30, 40],
    [Level.JC]: [40, 60],
  };

  tuteeListing.priceMin =
    expectedPriceRange[tuteeListing.level][0] - faker.datatype.number(1) * 5;
  tuteeListing.priceMax =
    expectedPriceRange[tuteeListing.level][1] + faker.datatype.number(2) * 5;

  tuteeListing.gender = faker.random.arrayElement(Object.values(Gender));

  tuteeListing.location = faker.random.arrayElement(Object.values(Town));

  return tuteeListing;
};

export default TuteeListingSeed;
