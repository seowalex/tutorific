import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Message from './message';
import Profile from './profile';

@Entity()
export default class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false })
  firstProfile: Profile;

  @ManyToOne(() => Profile, { nullable: false })
  secondProfile: Profile;

  @OneToOne(() => Message)
  @JoinColumn()
  lastMessage: Message;
}
