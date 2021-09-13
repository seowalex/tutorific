import { IsEmail } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Profile from './profile';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string | null;

  @OneToOne(() => Profile, { cascade: true, nullable: false, eager: true })
  @JoinColumn()
  profile: Profile;
}

export type CreateUser = Omit<User, 'id' | 'refreshToken'>;
export type UpdateUser = Partial<User>;
