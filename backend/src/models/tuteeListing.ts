import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import Profile from './profile';
import { Level, Town } from '../utils/model';

@Entity()
export default class TuteeListing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false })
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

  @Column('enum', { enum: Town })
  location: Town;

  @CreateDateColumn()
  createdAt: Date;
}
