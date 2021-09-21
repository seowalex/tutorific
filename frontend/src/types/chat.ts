import { Profile } from './profile';

export interface ChatInfo {
  id: number;
  otherProfile: Profile;
  lastMessage?: Message;
}

export interface Chat {
  otherProfile: Profile;
  messages: [Message];
}

interface Message {
  senderId: number;
  content: string;
}
