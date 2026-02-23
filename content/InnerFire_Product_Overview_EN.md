# InnerFire — Product Overview (EN)

## 1. What InnerFire Is
InnerFire is a mobile breath-regulation product that turns exhalation into a real-time multisensory experience.

The core interaction is simple:
- the user exhales toward the phone microphone,
- the app reads breath intensity,
- fire visuals, sound, and haptics respond immediately.

InnerFire is designed to make breathing practice tangible, embodied, and easier to stay with. Instead of abstract timers, the user gets direct physical feedback: "my breath changes what I feel and see right now."

At product level, InnerFire is:
- a guided self-regulation tool,
- a sensory breathing companion,
- an experience layer for calm/focus routines.

It is not positioned as a medical device.

---

## 2. Who It Is For
InnerFire is for users who need a fast, practical way to downshift stress and reconnect with their breathing.

Primary audiences:
- People with high daily cognitive load (work/study pressure).
- Users who struggle with traditional "silent breath timer" apps.
- People who respond better to interactive sensory feedback than static instructions.
- Users who want a short reset ritual (1-5 minutes) during the day.

Secondary audiences:
- Wellness-minded users exploring habit-based nervous-system regulation.
- Creators/athletes/knowledge workers who want quick focus recovery between tasks.

Core user need:
- "I need something that helps me regulate right now, without overthinking."

---

## 3. Product Functionality
This section describes functional behavior from user perspective first, then system behavior.

### 3.1 Core User Loop
1. User opens the app.
2. Ambient fire scene is visible (and ambient fire sound can run continuously depending on mode/config).
3. User presses Start to begin active breath interaction systems.
4. User exhales toward the microphone.
5. App maps breath intensity to live feedback:
   - stronger visual flame response,
   - stronger blow sound response,
   - stronger haptic response.
6. User presses Stop to end active interaction.

### 3.2 Breath Input (Blow Detection)
- Reads microphone input continuously when active.
- Converts audio signal into normalized intensity (`0.0...1.0`).
- Uses signal conditioning (thresholding, duration, smoothing) for stable response.
- Supports spectral analysis / spectral gate logic (development-tuned) to reduce false positives from non-breath noises.

### 3.3 Visual System
- Fire video/loop is the primary visual metaphor.
- Breath intensity modulates visual dynamics (for example: apparent activity, strength, atmosphere).
- Visual layer is expected to recover automatically after app lifecycle interruptions.

### 3.4 Audio System
- Two conceptual layers:
  - ambient campfire bed,
  - blow-reactive layer.
- Blow-reactive layer scales with breath intensity.
- Audio route changes (speaker/headphones/Bluetooth) are handled via recovery logic.
- Design goal: resilient continuity with minimal audible glitches across lifecycle events.

### 3.5 Haptics System
- Breath intensity maps to haptic intensity.
- Core Haptics with fallback strategy for device compatibility.
- Manual restart policy is used after specific interruptions (depending on final system rules).

### 3.6 Start/Stop Semantics
- Start activates the interaction loop (blow detection + linked reactive systems).
- Stop halts active interaction.
- Exact subsystem behavior after lock/unlock/background/route change is governed by the recovery spec.

### 3.7 Recovery and Reliability Behavior
InnerFire explicitly defines expected behavior per subsystem after disruptions:
- lock/unlock,
- background/foreground,
- route change (speaker/headphones/Bluetooth),
- control center/notification interactions.

The goal is predictable recovery rules, not best-effort ambiguity.

### 3.8 Breathing Environments (Product Direction)
- Product architecture supports environment-based experiences (e.g., fireplace now, additional environments later).
- Environment-level media/presets can be persisted.

### 3.9 Developer/Calibration Mode (Internal)
For tuning and diagnostics, the app includes internal developer panels:
- Blow detection tuning parameters,
- spectral gate tuning,
- spectral logging/FFT debug controls,
- log export/inspection helpers.

This is internal tooling and not the consumer-facing UX target.

---

## 4. Product Value Proposition
InnerFire differentiates by combining:
- direct breath-to-feedback mapping,
- multisensory reinforcement (visual + audio + haptics),
- high immediacy ("I feel the effect now"),
- technical calibration depth to improve real-world reliability.

In short:
- many apps tell you how to breathe,
- InnerFire lets you feel breathing as an interactive, controllable system.

---

## 5. Current Product Maturity (Pragmatic View)
Current stage is advanced MVP / pre-scale product hardening:
- Core interaction exists and is usable.
- Significant work has gone into modular architecture and diagnostics.
- Main ongoing challenge is robust discrimination of true exhalation vs environmental noise across real-world conditions.

This means the product foundation is real, and current effort is about quality, stability, and confidence at scale.

---

## 6. Near-Term Product Priorities
1. Improve breath signal precision without losing responsiveness.
2. Maintain smooth UX under lifecycle disruptions and route changes.
3. Keep developer tuning powerful but safe and understandable.
4. Prepare clean user-facing mode separate from internal debug mode.
5. Expand environment system once core loop quality is consistently high.

---

## 7. One-Sentence Product Summary
InnerFire is an interactive breathing product where your exhale directly drives fire visuals, sound, and haptics to help you regulate stress through immediate multisensory feedback.
