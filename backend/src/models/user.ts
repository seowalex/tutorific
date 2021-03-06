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
  @IsEmail(
    {},
    {
      message: 'Not a valid email',
    }
  )
  @UniqueEmail('id', {
    message: 'User with email $value already exists.',
  })
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column({ type: 'text', array: true })
  refreshToken: string[];

  @OneToOne(() => Profile, {
    cascade: true,
    nullable: true,
    eager: true,
  })
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

export type CreateUser = Omit<User, 'id' | 'hashPassword'>;
export type UpdateUser = Partial<User>;
