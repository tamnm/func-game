import { useEffect, useMemo, useState } from "react";
import { mockChat, mockParticipants, screens } from "./app/mockData";
import type { ScreenId } from "./app/types";
import { BoardPreview } from "./design/components/BoardPreview";
import { Button } from "./design/components/Button";
import { ChatShell } from "./design/components/ChatShell";
import { MuteControl } from "./design/components/MuteControl";
import { Panel } from "./design/components/Panel";
import { PlayerBadge } from "./design/components/PlayerBadge";
import { RoomCode } from "./design/components/RoomCode";
import { StatusBanner } from "./design/components/StatusBanner";
import { TextInput } from "./design/components/TextInput";
import { useAudioController } from "./effects/audio/useAudioController";

const roomCode = "F7KQ";

export function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(readScreenFromHash);
  const [displayName, setDisplayName] = useState("Tam");
  const audio = useAudioController();
  const currentScreen = useMemo(
    () => screens.find((screen) => screen.id === activeScreen),
    [activeScreen],
  );

  function goTo(screen: ScreenId) {
    window.location.hash = screen;
    setActiveScreen(screen);
    audio.playCue(screen === "game" ? "start" : "chat");
  }

  useEffect(() => {
    function syncHashRoute() {
      setActiveScreen(readScreenFromHash());
    }

    window.addEventListener("hashchange", syncHashRoute);
    return () => window.removeEventListener("hashchange", syncHashRoute);
  }, []);

  return (
    <main className="app-shell">
      <header className="top-bar">
        <button
          aria-label="Go to home screen"
          className="brand-mark"
          onClick={() => goTo("home")}
          type="button"
        >
          FG
        </button>

        <nav aria-label="Mock screen navigation" className="screen-nav">
          {screens.map((screen) => (
            <button
              aria-current={activeScreen === screen.id ? "page" : undefined}
              className={activeScreen === screen.id ? "active" : ""}
              key={screen.id}
              onClick={() => goTo(screen.id)}
              type="button"
            >
              {screen.label}
            </button>
          ))}
        </nav>

        <MuteControl
          muted={audio.muted}
          onPlaySample={() => audio.playCue("move")}
          onToggle={audio.toggleMuted}
          unlocked={audio.unlocked}
        />
      </header>

      <section className="hero-band">
        <div className="hero-copy">
          <p className="eyebrow">Play with friends</p>
          <h1>Fun Game</h1>
          <p>Share codes, chat, and play.</p>
        </div>

        <div className="hero-status" aria-live="polite">
          <span>Current screen</span>
          <strong>{currentScreen?.label ?? "Home"}</strong>
        </div>
      </section>

      {activeScreen === "home" ? (
        <HomeScreen
          displayName={displayName}
          onCreate={() => goTo("create")}
          onJoin={() => goTo("join")}
          onNameChange={setDisplayName}
        />
      ) : null}
      {activeScreen === "create" ? (
        <CreateRoomScreen
          displayName={displayName}
          onBack={() => goTo("home")}
          onContinue={() => goTo("lobby")}
        />
      ) : null}
      {activeScreen === "join" ? (
        <JoinRoomScreen
          displayName={displayName}
          onBack={() => goTo("home")}
          onContinue={() => goTo("lobby")}
        />
      ) : null}
      {activeScreen === "lobby" ? (
        <LobbyScreen onStart={() => goTo("game")} />
      ) : null}
      {activeScreen === "game" ? <GameScreen /> : null}
    </main>
  );
}

type HomeScreenProps = {
  displayName: string;
  onCreate: () => void;
  onJoin: () => void;
  onNameChange: (name: string) => void;
};

function HomeScreen({
  displayName,
  onCreate,
  onJoin,
  onNameChange,
}: HomeScreenProps) {
  return (
    <section className="screen-grid screen-home">
      <Panel className="primary-panel">
        <p className="eyebrow">Start here</p>
        <h2>Pick a name.</h2>
        <p className="muted-copy">Keep it recognizable for the table.</p>
        <TextInput
          label="Display name"
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Your name"
          value={displayName}
        />
        <div className="action-row">
          <Button onClick={onCreate}>Create room</Button>
          <Button onClick={onJoin} variant="secondary">
            Join room
          </Button>
        </div>
      </Panel>

      <Panel eyebrow="MVP flow" title="What the shell covers">
        <ul className="feature-list">
          <li>Create and share a short room code.</li>
          <li>Join with a readable code.</li>
          <li>See host, players, spectators, and room chat.</li>
          <li>Play area stays central on desktop and mobile.</li>
        </ul>
      </Panel>
    </section>
  );
}

type CreateJoinProps = {
  displayName: string;
  onBack: () => void;
  onContinue: () => void;
};

function CreateRoomScreen({ displayName, onBack, onContinue }: CreateJoinProps) {
  return (
    <section className="screen-grid">
      <Panel className="primary-panel">
        <p className="eyebrow">Create room</p>
        <h2>Host a Tic Tac Toe room.</h2>
        <p className="muted-copy">
          {displayName || "Player"} will host the table and share this code.
        </p>
        <RoomCode code={roomCode} />
        <div className="action-row">
          <Button onClick={onContinue}>Open lobby</Button>
          <Button onClick={onBack} variant="ghost">
            Back
          </Button>
        </div>
      </Panel>

      <Panel eyebrow="Host tools" title="Ready for later wiring">
        <div className="status-stack">
          <StatusBanner tone="success">Room code is readable and copyable.</StatusBanner>
          <StatusBanner>Host controls are waiting in the lobby.</StatusBanner>
          <StatusBanner tone="warning">Guests need the exact code.</StatusBanner>
        </div>
      </Panel>
    </section>
  );
}

function JoinRoomScreen({ displayName, onBack, onContinue }: CreateJoinProps) {
  return (
    <section className="screen-grid">
      <Panel className="primary-panel">
        <p className="eyebrow">Join room</p>
        <h2>Enter a friend's room code.</h2>
        <p className="muted-copy">
          {displayName || "Player"} can enter the code from the host.
        </p>
        <TextInput
          ariaLabel="Room code"
          defaultValue={roomCode}
          label="Room code"
          maxLength={6}
        />
        <div className="action-row">
          <Button onClick={onContinue}>Preview lobby</Button>
          <Button onClick={onBack} variant="ghost">
            Back
          </Button>
        </div>
      </Panel>

      <Panel eyebrow="Connection state" title="Room status">
        <div className="status-stack">
          <StatusBanner>Waiting for room confirmation.</StatusBanner>
          <StatusBanner tone="warning">
            Recheck the code if the room cannot be found.
          </StatusBanner>
        </div>
      </Panel>
    </section>
  );
}

type LobbyScreenProps = {
  onStart: () => void;
};

function LobbyScreen({ onStart }: LobbyScreenProps) {
  return (
    <section className="screen-grid lobby-layout">
      <Panel className="primary-panel lobby-panel">
        <div className="room-heading">
          <div>
            <p className="eyebrow">Lobby</p>
            <h2>Waiting for players</h2>
          </div>
          <RoomCode code={roomCode} />
        </div>

        <div className="participant-grid">
          {mockParticipants.map((participant) => (
            <PlayerBadge key={participant.id} participant={participant} />
          ))}
        </div>

        <div className="lobby-controls">
          <TextInput defaultValue="Tam" label="Rename in lobby" />
          <Button onClick={onStart}>Start game</Button>
        </div>
      </Panel>

      <ChatShell messages={mockChat} />
    </section>
  );
}

function GameScreen() {
  return (
    <section className="game-layout">
      <Panel className="game-status-panel">
        <div className="game-status-grid">
          <PlayerBadge participant={mockParticipants[0]} />
          <div className="turn-card fx-highlighted">
            <p className="eyebrow">Turn</p>
            <strong>X to move</strong>
            <small>Last move is highlighted.</small>
          </div>
          <PlayerBadge participant={mockParticipants[1]} />
        </div>
      </Panel>

      <Panel className="board-panel">
        <BoardPreview />
        <div className="action-row center-actions">
          <Button variant="secondary">Rematch</Button>
          <Button variant="ghost">Leave room</Button>
        </div>
      </Panel>

      <aside className="side-stack">
        <StatusBanner tone="success">Board is ready.</StatusBanner>
        <StatusBanner tone="danger">
          Host disconnected banner style is ready.
        </StatusBanner>
        <ChatShell messages={mockChat} />
      </aside>
    </section>
  );
}

function readScreenFromHash(): ScreenId {
  const hash = window.location.hash.replace("#", "");
  const knownScreen = screens.find((screen) => screen.id === hash);

  return knownScreen?.id ?? "home";
}
