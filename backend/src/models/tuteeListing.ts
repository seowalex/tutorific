import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Min } from 'class-validator';
import Profile from './profile';
import { Gender, Level, Town } from '../utils/model';
import { IsBiggerThan } from '../validations/common';

@Entity()
export default class TuteeListing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  tutee: Profile;

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

  @Column('enum', { enum: Level })
  level: Level;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column('enum', { enum: Town })
  location: Town;

  @CreateDateColumn()
  createdAt: Date;
}

export type UpdateTuteeListing = Partial<TuteeListing>;
export type CreateTuteeListing = Omit<TuteeListing, 'id' | 'createdAt'>;
export type QueryTuteeListing = {
  priceMin?: Number;
  priceMax?: Number;
  timeSlots?: Number[];
  subjects?: string[];
  levels?: Level[];
  gender?: Gender;
  locations?: Town[];
  skip?: number;
  limit?: number;
};
