import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import Conversation from './conversation';
import Profile from './profile';

@Entity()
export default class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, { nullable: false })
  conversation: Conversation;

  @ManyToOne(() => Profile, { nullable: false })
  sender: Profile;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
