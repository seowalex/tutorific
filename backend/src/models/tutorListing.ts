import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ArrayNotEmpty, IsNotEmpty, Max, Min } from 'class-validator';
import Profile from './profile';
import { Gender, Level } from '../utils/model';
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
  @Min(0, {
    each: true,
    message: 'Not a valid timeslot',
  })
  @Max(7 * 24 * 2, {
    each: true,
    message: 'Not a valid timeslot',
  })
  @ArrayNotEmpty({
    message: 'Should have at least 1 timeslot',
  })
  timeSlots: number[];

  @Column('text', { array: true })
  @IsNotEmpty({
    each: true,
    message: 'Each value in subjects should not be empty',
  })
  @ArrayNotEmpty({
    message: 'Should have at least 1 subject',
  })
  subjects: string[];

  @Column('enum', { array: true, enum: Level })
  @ArrayNotEmpty({
    message: 'Should have at least 1 level',
  })
  levels: Level[];

  @CreateDateColumn()
  createdAt: Date;
}

export type UpdateTutorListing = Partial<TutorListing>;
export type CreateTutorListing = Omit<TutorListing, 'id' | 'createdAt'>;
export type QueryTutorListing = {
  priceMin?: number;
  priceMax?: number;
  timeSlots?: number[];
  subjects?: string[];
  levels?: Level[];
  gender?: Gender;
  skip?: number;
  limit?: number;
};
