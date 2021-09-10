import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Profile from './profile';
import { Subject, Level } from '../modelHelpers/listingHelper';

@Entity()
export default class TutorListing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile)
  @JoinColumn()
  tutor: Profile;

  @Column('int')
  priceMin: number;

  @Column('int')
  priceMax: number;

  @Column()
  description: string;

  @Column('int', { array: true })
  timeSlots: number[];

  @Column('enum', { array: true, enum: Subject })
  subjects: Subject[];

  @Column('enum', { array: true, enum: Level })
  levels: Level[];
}
