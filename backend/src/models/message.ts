import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Conversation from './conversation';
import Profile from './profile';

@Entity()
export default class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation)
  conversation: Conversation;

  @ManyToOne(() => Profile)
  sender: Profile;

  @Column()
  message: string;
}
