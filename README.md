## TetrisPlanABC

**TetrisPlanABC** is a React Native implementation of the classic Tetris puzzle game, built to run on both iOS and Android.

### Tech stack
- **Framework**: `React Native 0.63.3`
- **Language**: TypeScript / JavaScript
- **Testing**: Jest with React Native preset
- **Linting**: ESLint (`@react-native-community/eslint-config`)

### Project structure (high level)
- `App.tsx` – main application entry component
- `index.js` – React Native bootstrap file
- `src/components` – reusable UI components such as:
  - `Grid`, `Cell`, `Block`, `Preview`, `Controls`, `StartModal`
- `src/screens/Board` – main game board screen
- `src/shared` – shared helpers and rotation logic for Tetris pieces
- `src/constants` – game-related constants (shapes, colors, etc.)
- `android` / `ios` – native platform projects

### Getting started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Start the Metro bundler

```bash
npm run start
```

#### 3. Run on a device or simulator

- **iOS** (requires Xcode / iOS simulator):

```bash
npm run ios
```

- **Android** (requires Android SDK / emulator or device):

```bash
npm run android
```

### Testing & linting

- **Run tests**

```bash
npm test
```

- **Run linter**

```bash
npm run lint
```

### Notes
- This project assumes a working React Native environment (Xcode for iOS, Android Studio/SDK for Android) is already set up on your machine.
