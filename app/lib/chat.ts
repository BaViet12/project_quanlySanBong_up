export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  messages: Message[];
  participants: string[];
  lastMessageAt: Date;
}
