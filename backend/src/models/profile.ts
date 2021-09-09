import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import User from './user';

// eslint-disable-next-line no-unused-vars, no-shadow
enum Gender {
  // eslint-disable-next-line no-unused-vars
  MALE = 'Male',
  // eslint-disable-next-line no-unused-vars
  FEMALE = 'Female',
  // eslint-disable-next-line no-unused-vars
  PNTS = 'Prefer not to say',
}

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
