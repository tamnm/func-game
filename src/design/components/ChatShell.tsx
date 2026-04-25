import type { ChatMessage } from "../../app/types";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

type ChatShellProps = {
  messages: ChatMessage[];
};

export function ChatShell({ messages }: ChatShellProps) {
  return (
    <section className="chat-shell" aria-labelledby="chat-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Chat</p>
          <h2 id="chat-heading">Room talk</h2>
        </div>
        <span className="notification-dot fx-notification" aria-label="Unread mock chat" />
      </div>

      <ol className="chat-list">
        {messages.map((message) => (
          <li
            className={`chat-message ${
              message.tone === "system" ? "chat-message-system" : ""
            }`}
            key={message.id}
          >
            <strong>{message.author}</strong>
            <span>{message.body}</span>
          </li>
        ))}
      </ol>

      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <TextInput
          ariaLabel="Mock chat message"
          label="Message"
          placeholder="Say hi"
        />
        <Button variant="secondary">Send</Button>
      </form>
    </section>
  );
}
