import { useEffect, useMemo, useState } from "react";
import { mockChat, mockParticipants, screens } from "./app/mockData";
import type { ScreenId } from "./app/types";
import { Button } from "./design/components/Button";
import { ChatShell } from "./design/components/ChatShell";
import { MuteControl } from "./design/components/MuteControl";
import { Panel } from "./design/components/Panel";
import { PlayerBadge } from "./design/components/PlayerBadge";
import { RoomCode } from "./design/components/RoomCode";
import { StatusBanner } from "./design/components/StatusBanner";
import { TextInput } from "./design/components/TextInput";
import { useAudioController } from "./effects/audio/useAudioController";
import { ticTacToeDefinition } from "./games/tic-tac-toe/definition";
import { TicTacToeBoard } from "./games/tic-tac-toe/renderer/TicTacToeBoard";
import type { TicTacToeState } from "./games/tic-tac-toe/rules";

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
      {activeScreen === "game" ? <GameScreen onCue={audio.playCue} /> : null}
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

type GameScreenProps = {
  onCue: ReturnType<typeof useAudioController>["playCue"];
};

function GameScreen({ onCue }: GameScreenProps) {
  const [gameState, setGameState] = useState<TicTacToeState>(
    ticTacToeDefinition.createInitialState,
  );
  const statusText = getGameStatusText(gameState);

  function handleCellSelect(cellIndex: number) {
    const nextState = ticTacToeDefinition.applyMove(gameState, {
      cellIndex,
      player: gameState.currentTurn,
    });

    setGameState(nextState);

    if (nextState.invalidMove) {
      onCue("invalid");
    } else if (nextState.result.type === "playing") {
      onCue("move");
    } else {
      onCue("result");
    }
  }

  function resetGame() {
    setGameState(ticTacToeDefinition.createInitialState());
    onCue("start");
  }

  return (
    <section className="game-layout">
      <Panel className="game-status-panel">
        <div className="game-status-grid">
          <PlayerBadge participant={mockParticipants[0]} />
          <div
            className={`turn-card ${
              gameState.result.type === "playing" ? "fx-highlighted" : "fx-notification"
            }`}
            aria-live="polite"
          >
            <p className="eyebrow">Turn</p>
            <strong>{statusText}</strong>
            <small>
              {gameState.invalidMove
                ? getInvalidMoveText(gameState.invalidMove)
                : "Last move and winning cells stay highlighted."}
            </small>
          </div>
          <PlayerBadge participant={mockParticipants[1]} />
        </div>
      </Panel>

      <Panel className="board-panel">
        <TicTacToeBoard state={gameState} onCellSelect={handleCellSelect} />
        <div className="action-row center-actions">
          <Button onClick={resetGame} variant="secondary">
            Rematch
          </Button>
          <Button variant="ghost">Leave room</Button>
        </div>
      </Panel>

      <aside className="side-stack">
        <StatusBanner tone="success">Local Tic Tac Toe is playable.</StatusBanner>
        <StatusBanner
          tone={gameState.result.type === "playing" ? "warning" : "success"}
        >
          {gameState.result.type === "playing"
            ? `${gameState.currentTurn} is choosing a square.`
            : "Game complete. Start a rematch when ready."}
        </StatusBanner>
        <ChatShell messages={mockChat} />
      </aside>
    </section>
  );
}

function getGameStatusText(state: TicTacToeState) {
  if (state.result.type === "win") {
    return `${state.result.winner} wins`;
  }

  if (state.result.type === "draw") {
    return "Draw game";
  }

  return `${state.currentTurn} to move`;
}

function getInvalidMoveText(invalidMove: TicTacToeState["invalidMove"]) {
  if (invalidMove === "cell-occupied") {
    return "That square is already taken.";
  }

  if (invalidMove === "wrong-turn") {
    return "Wait for your turn.";
  }

  if (invalidMove === "game-finished") {
    return "Start a rematch to play again.";
  }

  return "Choose a square on the board.";
}

function readScreenFromHash(): ScreenId {
  const hash = window.location.hash.replace("#", "");
  const knownScreen = screens.find((screen) => screen.id === hash);

  return knownScreen?.id ?? "home";
}
