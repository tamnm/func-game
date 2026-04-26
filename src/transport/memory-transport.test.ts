import { describe, expect, it } from "vitest";
import { createLocalTestTransport } from "./memory-transport";

describe("LocalTestTransport", () => {
  it("delivers scoped messages deterministically after flush", () => {
    const transport = createLocalTestTransport();
    const host = transport.connect("ROOM", "host");
    const guest = transport.connect("ROOM", "guest");
    const received: string[] = [];

    guest.subscribe((message) => {
      received.push(`${message.scope}:${message.type}:${message.senderId}`);
    });

    host.send({
      roomCode: "ROOM",
      scope: "lobby",
      type: "join-accepted",
      payload: { ok: true },
    });
    host.send({
      roomCode: "ROOM",
      scope: "chat",
      type: "message",
      payload: { body: "hi" },
    });

    expect(received).toEqual([]);

    transport.flush();

    expect(received).toEqual([
      "lobby:join-accepted:host",
      "chat:message:host",
    ]);
  });
});
