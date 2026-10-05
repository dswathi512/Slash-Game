# Slash Game: Hand-Controlled Ball Slicer

A Fruit Ninja-style browser game you play with **your hand and a webcam**, no mouse or keyboard needed. Slice the colored balls, avoid the black ones, and score as high as you can in 60 seconds. Hand tracking runs entirely in your browser using **TensorFlow.js**.

**[▶ Play it live](https://your-username.github.io/your-repo-name/)** &nbsp;|&nbsp; *(replace with your GitHub Pages link)*

![Gameplay screenshot](screenshot.png)
<!-- Add a screenshot or short GIF of gameplay and save it as screenshot.png -->

---

## How to play

1. Open the game and click **Start**.
2. Allow camera access when the browser asks.
3. Hold up one hand so the camera can see it. Your **index fingertip** is your blade.
4. Swipe your finger through the balls to slice them.

| Ball | Effect |
|---|---|
| Colored balls (4 colors) | **+10** points |
| Black balls | **−20** points |

**The round ends when either:**
- the **60-second** timer runs out, or
- you slice **more than 3 black balls**.

A game-over screen then shows your final score.

## Features

- Real-time **hand tracking** with a webcam (no extra hardware)
- Smooth, responsive **fingertip blade trail**
- Reliable cut detection, even for very fast swipes
- Retro **pixel-art UI**: start screen, in-game HUD (score and black balls sliced), and game-over screen
- 100% client-side: your video is processed locally in the browser and is never uploaded

## How it works

```
Webcam frame → Hand pose model → Index fingertip (x, y) → Smoothing → Trail → Collision check → Game logic
```

- **Hand tracking:** the [`@tensorflow-models/hand-pose-detection`](https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection) package with the MediaPipe Hands runtime detects 21 hand keypoints per frame. The game uses keypoint 8, the index fingertip.
- **Smoothing:** raw keypoints jitter, so the fingertip position is smoothed with an exponential moving average (`smooth += (raw − smooth) × α`, with α = 0.6).
- **Cut detection:** a fast-moving finger can jump past a ball between two frames, so the game doesn't test a single point. It tests the **line segment** between the previous and current fingertip positions against each ball's circle (closest point on the segment, clamped to the segment's endpoints, compared with the ball's radius).
- **Game flow:** a small state machine (`start → playing → gameover`) controls which screen is shown and what the game loop does. The timer uses timestamps rather than frame counts, so it stays accurate at any frame rate.
- **Rendering:** HTML5 Canvas for the webcam feed, balls, and trail. The pixel-art look comes from low-resolution drawing scaled up with `image-rendering: pixelated`.

## Tech stack

- HTML, CSS, JavaScript (no build step, no framework)
- [TensorFlow.js](https://www.tensorflow.org/js) and [MediaPipe Hands](https://developers.google.com/mediapipe) via the hand-pose-detection model
- HTML5 Canvas

## Run it locally

Browsers only allow camera access on `localhost` or HTTPS, so don't open `index.html` by double-clicking it. Serve the folder instead:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npx serve
```

Then open the URL it prints (usually `http://localhost:3000`). An internet connection is required, because the TensorFlow.js libraries and hand model are loaded from a CDN.

## Tips for the best experience

- Use a **well-lit room** and keep your hand clearly in front of the camera.
- Play with **one hand**; the game tracks a single hand.
- Use a recent version of Chrome, Edge, or Firefox on a laptop or desktop with a webcam.

## Known limitations

- Holding your finger still on a ball will still cut it (there is no minimum swipe speed).
- Performance depends on your device, because the model runs on every frame.

## Ideas for the future

- Require real slashing speed to cut a ball
- Directional slashes (`\` and `/`) tied to ball color
- Difficulty that ramps up over time
- Sound effects and cut animations
- Local high-score leaderboard

## Credits

- Hand tracking: [TensorFlow.js Models](https://github.com/tensorflow/tfjs-models) and [MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)
