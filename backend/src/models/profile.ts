import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
// import User from './user';
import { Gender } from '../utils/model';

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @CreateDateColumn()
  createdAt: Date;
}
