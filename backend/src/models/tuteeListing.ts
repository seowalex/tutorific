import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Min } from 'class-validator';
import Profile from './profile';
import { Gender, Level, Town } from '../utils/model';

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
  priceMax: number;

  @Column('text')
  description: string;

  @Column('int', { array: true })
  @Min(0, {
    each: true,
  })
  timeSlots: number[];

  @Column('text', { array: true })
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
