import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Gender } from '../utils/model';

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @CreateDateColumn()
  createdAt: Date;
}

export type UpdateProfile = Partial<Profile>;
export type CreateProfile = Omit<Profile, 'id' | 'createdAt'>;
