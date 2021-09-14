import { IsEmail, MinLength } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { UniqueEmail } from '../validations/user';
import authUtil from '../utils/auth';
import Profile from './profile';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @UniqueEmail('email', {
    message: 'User with email $value already exists.',
  })
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string | null;

  @OneToOne(() => Profile, { cascade: true, nullable: false, eager: true })
  @JoinColumn()
  profile: Profile;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await authUtil.hashPassword(this.password);
    }
  }
}

export type CreateUser = Omit<User, 'id' | 'refreshToken' | 'hashPassword'>;
export type UpdateUser = Partial<User>;
