import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import Profile from './profile';
import { Subject, Level } from '../modelUtil/util';

@Entity()
export default class TutorListing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false })
  tutor: Profile;

  @Column('int')
  priceMin: number;

  @Column('int')
  priceMax: number;

  @Column('text')
  description: string;

  @Column('int', { array: true })
  timeSlots: number[];

  @Column('enum', { array: true, enum: Subject })
  subjects: Subject[];

  @Column('enum', { array: true, enum: Level })
  levels: Level[];

  @CreateDateColumn()
  createdAt: Date;
}
