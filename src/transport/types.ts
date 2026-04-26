export type MessageScope = "lobby" | "game" | "chat" | "system";

export type TransportEnvelope<TPayload = unknown> = {
  id: string;
  roomCode: string;
  senderId: string;
  scope: MessageScope;
  type: string;
  payload: TPayload;
};

export type TransportPeer = {
  peerId: string;
  send: (message: Omit<TransportEnvelope, "id" | "senderId">) => void;
  subscribe: (listener: (message: TransportEnvelope) => void) => () => void;
  disconnect: () => void;
};

export type TestTransportHub = {
  connect: (roomCode: string, peerId: string) => TransportPeer;
  flush: () => void;
};
