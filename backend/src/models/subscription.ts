import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import Profile from './profile';

@Entity()
export default class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  profile: Profile;

  @Column('text')
  subscriptionJson: string;
}
