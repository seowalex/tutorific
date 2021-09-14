import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  RelationId,
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
  @IsNotEmpty({
    message: 'Message content should not be empty',
  })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  // for some reason, typeorm does not automatically give foreign key ids on .find
  // need to use https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md#relationid
  @RelationId((msg: Message) => msg.sender)
  senderId?: number;
}

export type CreateMessage = Omit<Message, 'id' | 'createdAt'>;
