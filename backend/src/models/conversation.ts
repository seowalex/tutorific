import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Message from './message';
import Profile from './profile';

@Entity()
export default class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  firstProfile: Profile;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  secondProfile: Profile;
}

export type GetConversations = Conversation & { lastMessage: Message };
export type GetConversation = Array<Message>;
export type CreateConversation = Omit<Conversation, 'id'>;
