# Tetris Plan ABC

Tetris Plan ABC is a React Native Tetris for iOS and Android. One screen runs the well, a five-piece preview, the score, and the controls. The rules live in the app: a class component steps the piece on a timer and paints the board by updating each cell directly.

**Wan Yau** · [github.com/WanCodes](https://github.com/WanCodes)

## Play

The app opens on a modal. **START** deals the first piece. The board title is `TETRIS Plan ABC`.

| Rule | Behavior |
| --- | --- |
| Well | 10 columns. The grid is 24 rows; the top 4 are a hidden spawn buffer, so 20 rows show. Visible cells are 24×24. |
| Pieces | I, O, T, S, Z, J, and L, each spawned from fixed coordinates in the buffer. |
| Preview | **NEXT** lists five upcoming pieces. Spawning one takes it off the list and appends a new piece. |
| Color | Shape and color are chosen separately. Colors are `yellow`, `purple`, `red`, `blue`, `orange`, `green`, and `skyblue`. |
| Controls | Left, right, down, and rotate. Glyphs are Ionicons: `ios-caret-back`, `ios-caret-forward`, `ios-caret-down`, `ios-sync`. |
| Gravity | One step every 450 ms. Down replaces that timer with a 10 ms tick until the piece locks. The next piece restores 450 ms. |
| Lock | A piece that cannot step down is painted gray and joins the stack. |
| Lines | A row with no empty cell is removed and the rows above it move down. Each cleared row adds 1,000 points. |
| End | The run stops when the falling piece cannot move down and row 3 (the last buffer row) contains a filled cell. Cells of the falling piece count. **TRY AGAIN** clears the visible well, sets the score to 0, and starts again. |

## Stack

| Layer | Choice |
| --- | --- |
| Runtime | React Native 0.63.3, React 16.13.1 |
| Language | TypeScript 4.2 (strict, `noEmit`) for `App`, `Board`, and `Cell`. The game loop is JavaScript. |
| Icons | `react-native-vector-icons` 8, Ionicons |
| Android JS engine | JavaScriptCore. Hermes is disabled (`enableHermes: false`). |
| Android | `com.tetrisplanabc`, minSdk 16, compile and target SDK 29, build-tools 29.0.2, Gradle 6.2, Android Gradle Plugin 3.5.3 |
| iOS | Deployment target 10.0, CocoaPods, bundle id `org.reactjs.native.example.TetrisPlanABC` |
| Debug | Flipper on debug builds (iOS `use_flipper!`, Android debug initializer). `Podfile.lock` pins Flipper 0.54.0. |
| Tests | Jest 25 with the `react-native` preset |
| Lint | ESLint 6, `@react-native-community/eslint-config`, `@typescript-eslint` |

`index.js` registers the component name from `app.json` (`TetrisPlanABC`). `App.tsx` renders a dark-content status bar, a safe area, and `Board`. `Board` sets the grid size with `<Grid w={10} h={24} />`.

`package.json` lists `@types/react-redux` and `@types/react-navigation`. The screen tree does not import Redux or React Navigation. State stays on the `Grid` component.

## How the board updates

`Grid` (`src/components/Grid/Grid.js`) owns the timer, the queue, the score, and the rules.

Two copies of the well stay in sync:

- A ref for every cell. `Cell` keeps its color in component state and exposes `changeColor`, so a tick can recolor squares without storing a new grid in React state.
- A binary matrix on the instance (`0` empty, `1` filled). Line clears and the end-of-run check read this matrix. `changeColor` writes both: any color other than white stores `1`.

The falling piece is whichever cells still use a palette color. `belongs` in `src/shared/helpers.js` matches those seven colors. Gray is locked. White is empty. On lock, palette cells are repainted gray.

Left and right collect the palette cells and shift them one column when every destination is inside the grid and not gray. The move is skipped while any falling cell is still on the first visible row (row index 4).

Rotation applies the offsets in `src/shared/rotation.js` for that shape. The result is kept only when every target cell is inside the grid and not gray; otherwise the previous cells are painted back. The O piece has no offsets.

After a lock, filled visible rows are cleared from the bottom. Each row above a cleared row is copied down. The score increases by `1000` times the number of rows cleared on that lock.

The preview reuses `Cell`. `Block` builds a 4×4 grid, stamps the shape, and draws occupied cells at 10×10 in that piece’s color.

`src/constants/constants.js` exports the seven type names. `createRandomBlock` does not import them; it uses the type list and color list in `src/shared/helpers.js`.

## Repository

```
index.js                          registers TetrisPlanABC
App.tsx                           status bar, safe area, Board
src/screens/Board/Board.tsx      grid size
src/components/Grid/Grid.js      timer, rules, score, layout
src/components/Grid/GridStyles.js
src/components/Grid/Helper/      createGrid
src/components/Cells/Cells.js    well; rows 0–3 are height 0
src/components/Cell/Cell.tsx     one square
src/components/Preview/Preview.js
src/components/Block/Block.js    4×4 preview of one piece
src/components/Controls/Controls.js
src/components/StartModal/StartModal.js
src/shared/helpers.js            random piece, palette, belongs
src/shared/rotation.js           per-shape rotation offsets
src/constants/constants.js       type-name constants
__tests__/App-test.js            renders App
android/                          application id com.tetrisplanabc
ios/                              Xcode project, Podfile, Podfile.lock
```

The Xcode project also contains the tvOS target added by the React Native 0.63 template. The game UI is the phone app started by `npm run ios` and `npm run android`.

## Run

Install the toolchain from the [React Native 0.63 environment setup](https://reactnative.dev/docs/0.63/environment-setup): Node, Watchman, a JDK, and Xcode or Android Studio with Android SDK 29.

```bash
npm install
```

### iOS

Install pods before the first native build. The Podfile pulls in React Native modules and `RNVectorIcons`. `ios/Podfile.lock` pins those versions. `Ionicons.ttf` is registered under `UIAppFonts` in `ios/TetrisPlanABC/Info.plist`.

```bash
cd ios && pod install && cd ..
npm run ios
```

### Android

```bash
npm run android
```

Debug builds use the debug keystore in `android/app`. Native packages are autolinked through `PackageList` in `MainApplication`.

The Android project does not apply `react-native-vector-icons/fonts.gradle`, and `Ionicons.ttf` is not in `android/app/src/main/assets/fonts`. The four control buttons still lay out. The glyphs draw after `Ionicons.ttf` is copied into that directory, or after `fonts.gradle` from `react-native-vector-icons` is applied. Rebuild once the font is included.

### Metro

`npm run ios` and `npm run android` start Metro. To run the packager on its own:

```bash
npm start
```

## Test and lint

```bash
npm test
npm run lint
```

`npm test` runs Jest. The only test is `__tests__/App-test.js`, which renders `<App />` with `react-test-renderer`. `npm run lint` runs `eslint .` with `.eslintrc.js` (`@react-native-community`, `@typescript-eslint/recommended`, and `plugin:flowtype/recommended`).

## Scope

- Gravity stays at 450 ms from piece to piece for the whole run.
- A cleared row is worth 1,000 points. Four rows cleared on one lock score 4,000.
- Input is the four on-screen buttons. The game has no hold piece, ghost piece, pause, or saved high score.
- Rotation is kept only when every new cell lies inside the well and is not already locked.
