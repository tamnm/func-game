# Verification Strategy

Verification should match the risk of each slice. Keep tests deterministic where possible and avoid making CI depend on real P2P network behavior early.

## Test Layers

### Unit Tests

Use for:

- Game rules.
- Win/draw detection.
- Player slot mapping.
- Session reducers/state transitions.
- Message parsing where applicable.

### Component/Integration Tests

Use for:

- Board rendering.
- Lobby state rendering.
- Chat rendering and submit behavior.
- Audio mute state.
- Connection banners.

Prefer MemoryTransport for component/integration tests.

### E2E Tests

Use LocalTestTransport for deterministic browser-level flows:

- Create room.
- Join room.
- Rename.
- Send chat.
- Host starts game.
- Play full Tic Tac Toe.
- Rematch.
- Host disconnected state.

Do not make CI depend on real Trystero until it is proven stable.

### Manual P2P Smoke Tests

Use real Trystero manually for:

- Desktop to desktop.
- Desktop to mobile.
- Mobile to mobile if available.
- Wi-Fi and mobile data if practical.
- Host disconnect.
- Browser refresh/background behavior.

## Deployment Verification

After GitHub Pages is configured:

- Build static output.
- Verify correct base path.
- Load deployed app.
- Create room.
- Join from another browser/device.
- Send chat.
- Play a full Tic Tac Toe game.
- Confirm host disconnected behavior.

## Visual And Audio Verification

Check:

- No overlapping text or controls on mobile/desktop.
- Touch targets are comfortable.
- Room code is easy to copy/read.
- Current turn is clear.
- Last move and win states are clear.
- Chat is visible without dominating the game.
- Audio only plays after user interaction.
- Mute control works.

## Definition Of Done For Implementation Epics

An implementation epic is done only when:

- Acceptance criteria are met.
- Relevant tests pass.
- Build passes.
- App remains deployable.
- Notion task is updated with verification notes.
- Any follow-up work is captured explicitly instead of hidden in prose.
