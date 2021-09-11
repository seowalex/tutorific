import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import Profile from './profile';
import { Level } from '../utils/model';

@Entity()
export default class TutorListing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  tutor: Profile;

  @Column('int')
  priceMin: number;

  @Column('int')
  priceMax: number;

  @Column('text')
  description: string;

  @Column('int', { array: true })
  timeSlots: number[];

  @Column('text', { array: true })
  subjects: string[];

  @Column('enum', { array: true, enum: Level })
  levels: Level[];

  @CreateDateColumn()
  createdAt: Date;
}

export type UpdateTutorListing = Partial<TutorListing>;
export type CreateTutorListing = Omit<TutorListing, 'id' | 'createdAt'>;
