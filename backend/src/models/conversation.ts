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

  @ManyToOne(() => Profile)
  @JoinColumn()
  firstProfile: Profile;

  @ManyToOne(() => Profile)
  @JoinColumn()
  secondProfile: Profile;

  @OneToOne(() => Message)
  @JoinColumn()
  lastMessage: Message;
}
