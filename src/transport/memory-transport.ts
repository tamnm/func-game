import type { TestTransportHub, TransportEnvelope, TransportPeer } from "./types";

type QueuedMessage = {
  message: TransportEnvelope;
};

export function createMemoryTransport(): TestTransportHub {
  const listeners = new Map<string, Set<(message: TransportEnvelope) => void>>();
  const queue: QueuedMessage[] = [];
  let nextMessageId = 1;

  function connect(roomCode: string, peerId: string): TransportPeer {
    const roomListeners = listeners.get(roomCode) ?? new Set();
    listeners.set(roomCode, roomListeners);

    return {
      peerId,
      send(message) {
        queue.push({
          message: {
            ...message,
            id: `msg-${nextMessageId++}`,
            roomCode,
            senderId: peerId,
          },
        });
      },
      subscribe(listener) {
        roomListeners.add(listener);
        return () => roomListeners.delete(listener);
      },
      disconnect() {
        roomListeners.clear();
      },
    };
  }

  function flush() {
    while (queue.length > 0) {
      const next = queue.shift();
      if (!next) {
        return;
      }

      listeners.get(next.message.roomCode)?.forEach((listener) => {
        listener(next.message);
      });
    }
  }

  return { connect, flush };
}

export const createLocalTestTransport = createMemoryTransport;
