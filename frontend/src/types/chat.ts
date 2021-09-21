import { Profile } from './profile';

export interface Chat {
  id: number;
  otherProfile: Profile;
  lastMessage?: Message;
}

export interface Message {
  senderId: number;
  content: string;
}
