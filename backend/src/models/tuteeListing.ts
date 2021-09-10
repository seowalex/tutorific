import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Profile from './profile';
import { Subject, Level, Town } from '../modelHelpers/listingHelper';

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

  @Column('enum', { array: true, enum: Subject })
  subjects: Subject[];

  @Column('enum', { enum: Level })
  level: Level;

  @Column('enum', { enum: Town })
  location: Town;
}
