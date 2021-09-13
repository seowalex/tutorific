import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Min } from 'class-validator';
import Profile from './profile';
import { Level } from '../utils/model';
import { IsBiggerThan } from '../validations/common';

@Entity()
export default class TutorListing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  tutor: Profile;

  @Column('int')
  @Min(0, {
    message: 'Price Min too low',
  })
  priceMin: number;

  @Column('int')
  @Min(0, {
    message: 'Price Max too low',
  })
  @IsBiggerThan('priceMin', {
    message: 'Price Max must be larger than Price Min',
  })
  priceMax: number;

  @Column('text')
  description: string;

  @Column('int', { array: true })
  // TODO add some range
  timeSlots: number[];

  @Column('text', { array: true })
  @IsNotEmpty({
    each: true,
    message: 'Each value in subjects should not be empty',
  })
  subjects: string[];

  @Column('enum', { array: true, enum: Level })
  levels: Level[];

  @CreateDateColumn()
  createdAt: Date;
}

export type UpdateTutorListing = Partial<TutorListing>;
export type CreateTutorListing = Omit<TutorListing, 'id' | 'createdAt'>;
