import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
// import User from './user';

// eslint-disable-next-line no-unused-vars, no-shadow
enum Gender {
  // eslint-disable-next-line no-unused-vars
  MALE = 'Male',
  // eslint-disable-next-line no-unused-vars
  FEMALE = 'Female',
  // eslint-disable-next-line no-unused-vars
  PNTS = 'Prefer not to say',
}

interface ProfileJson {
  id?: number;
  name?: string;
  description?: string;
  gender?: string;
}

@Entity()
export default class Profile {
  constructor(profile: ProfileJson) {
    if (profile === undefined) {
      return;
    }
    if (profile.id !== undefined) {
      this.id = profile.id;
    }
    if (profile.name !== undefined) {
      this.name = profile.name;
    }
    if (profile.description !== undefined) {
      this.description = profile.description;
    }

    switch (profile.gender) {
      case 'Male':
        this.gender = Gender.MALE;
        break;
      case 'Female':
        this.gender = Gender.FEMALE;
        break;
      case 'Prefer not to say':
        this.gender = Gender.PNTS;
        break;
      default:
        break;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @CreateDateColumn()
  createdAt: Date;

  // @OneToOne(() => User, (user) => user.profile)
  // user: User;
}
