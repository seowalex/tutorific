export interface Chat {
  id: number;
  profileIds: [number];
  lastMessage: Message;
}

interface Message {
  chatId: number;
  profileId: number;
  content: string;
}
