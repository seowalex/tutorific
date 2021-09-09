import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import User from './user';
import Gender from './gender';


@Entity()
export default class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: "enum", enum: Gender, nullable: true })
    gender: Gender

    @OneToOne(() => User, user => user.profile)
    user: User
}