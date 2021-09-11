import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import Profile from './profile';
import { Gender, Level, Town } from '../utils/model';

@Entity()
export default class TuteeListing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  tutee: Profile;

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
