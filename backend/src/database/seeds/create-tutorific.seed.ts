/* eslint-disable class-methods-use-this */
import { Seeder, Factory, tearDownDatabase } from 'typeorm-seeding';
import faker from 'faker';
import { Connection } from 'typeorm';
import User from '../../models/user';
import TutorListing from '../../models/tutorListing';
import TuteeListing from '../../models/tuteeListing';

export default class CreateTutorific implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await tearDownDatabase();
    // approximately half are tutors and half are tutees
    const personCount = 10;

    const tutors = await factory(User)({ isTutor: true }).createMany(
      personCount
    );
    const tutees = await factory(User)({ isTutor: false }).createMany(
      personCount
    );

    tutors.forEach((tutor) => {
      factory(TutorListing)({ profile: tutor.profile }).createMany(
        faker.datatype.number(2)
      );
    });
    tutees.forEach((tutee) => {
      factory(TuteeListing)({ profile: tutee.profile }).createMany(
        faker.datatype.number(2)
      );
    });
  }
}
