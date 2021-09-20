import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UniqueConversation } from '../validations/conversation';
import Message from './message';
import Profile from './profile';

@Entity()
export default class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  firstProfile: Profile;

  @ManyToOne(() => Profile, { nullable: false, eager: true })
  @UniqueConversation('firstProfile', {
    message: 'Already have an existing conversation',
  })
  secondProfile: Profile;
}

export type GetConversations = Pick<Conversation, 'id'> & {
  lastMessage?: Message;
  otherProfile: Profile;
};
export type GetConversation = Array<Message>;
export type CreateConversation = Omit<Conversation, 'id'>;
