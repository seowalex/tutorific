import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Profile from './profile';

@Entity()
export default class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false })
  firstProfile: Profile;

  @ManyToOne(() => Profile, { nullable: false })
  secondProfile: Profile;
}
