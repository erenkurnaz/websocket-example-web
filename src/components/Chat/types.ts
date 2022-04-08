export interface Message {
  username: string;
  message: string;
  createdAt: string;
  self?: boolean;
}

export enum SocketEvents {
  CONNECT = 'connect',
  CONNECTED = 'connected',
  DISCONNECT = 'disconnect',
  DISCONNECTED = 'disconnected',
  MESSAGE = 'message',
  UNSEEN_MESSAGES = 'unseen_messages',
  CONNECT_ERROR = 'connect_error',
}
