export interface Message {
  id: number | null;
  type: MessageType;
}

export enum MessageType {
  TutorListing,
  TuteeListing,
  Chat,
  Profile,
}
