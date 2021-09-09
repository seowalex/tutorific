import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Profile from './profile';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  hashed_password: string;

  @Column({ nullable: true })
  refresh_token: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile

}
