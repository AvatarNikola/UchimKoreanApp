# Learning Features Design
Date: 2026-04-11

## Overview
Based on user feedback, the app is moving towards a stronger integration of Korean language practice directly into mathematical tasks. We are implementing two major features: Seamless Listening Mode and Korean Word Problems.

## Feature 1: Seamless Listening Mode
**Goal:** Enable users to practice comprehending Korean mathematical statements by ear.

### Components
1. **Settings Toggles**: Add a "Listening Mode / Audio Only" checkbox in the setup views of both Practice and Quiz modules.
2. **Obscured Visuals**: When active, the visual math problem string (e.g., `5 + 3 = ?`) is hidden and replaced with a placeholder (e.g., `🎧 ???`).
3. **Audio Replay Button**: A large control allowing the user to restate the problem via Text-To-Speech (TTS).
4. **Natural Parser (`mathAudioUtils.js`)**: Converts math expressions into natural Korean speech strings to avoid the TTS engine parsing it in English or formally. E.g., `5 + 3` -> `오 더하기 삼은?`. 

### Logic Flow
- Setup -> User toggles "Audio mode".
- Practice/Quiz -> `generateMathProblem` creates the problem.
- Component renders placeholder text + triggers `speechSynthesis.speak()`.
- User answers as normal.

## Feature 2: Korean Word Problems
**Goal:** Practice reading comprehension and extracting mathematical requirements from full Korean sentences.

### Components
1. **New Operation**: A `📝 Word Problem` button added to the operation selection grid alongside `+`, `-`, `×`, `÷`.
2. **Data Structure (`wordProblems.js`)**: Templates defining text structure, variables, and the derived mathematical expression.
   ```json
   {
       "ko": "철수는 사과 {a}개를 가졌습니다. 영희가 {b}개를 더 주었습니다. 총 몇 개입니까?",
       "eq": "{a} + {b}",
       "operation": "+"
   }
   ```
3. **Problem Generator Update**: A new generator branch that randomly selects a template, populates variables based on the active difficulty level boundaries, and resolves the answer string.

## Technical Details
- All localized UI text updates will be injected into `ko.json`, `en.json`, and `ru.json`.
- The `Vocabulary` base currently implements TTS efficiently, ensuring consistent engine usage (`ko-KR`).
- Performance: Variables parse asynchronously; TTS cancellation on unmount is strictly enforced.
