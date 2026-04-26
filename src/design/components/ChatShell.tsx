import type { ChatMessage } from "../../app/types";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

type ChatShellProps = {
  messages: ChatMessage[];
  onSend?: (body: string) => void;
};

export function ChatShell({ messages, onSend }: ChatShellProps) {
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
          const formData = new FormData(event.currentTarget);
          const body = String(formData.get("message") ?? "");
          onSend?.(body);
          event.currentTarget.reset();
        }}
      >
        <TextInput
          ariaLabel="Chat message"
          label="Message"
          name="message"
          placeholder="Say hi"
        />
        <Button type="submit" variant="secondary">Send</Button>
      </form>
    </section>
  );
}
