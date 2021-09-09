import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import User from './user';

enum Gender {
    MALE = "male",
    FEMALE = "female",
    PNTS = "prefer not to say"
}

@Entity()
export default class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: Gender })
    gender: Gender

    @OneToOne(() => User, user => user.profile)
    user: User
}