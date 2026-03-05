# TASK-053: Video demos on index.html and blog article

Status: DONE
Priority: High
Owner: Executor AI
Depends on: none

## Context

We have 3 demo videos of InnerFire in action (filmed from the side: person blowing into phone, fire reacting). Videos are vertical (9:16), with original audio. They need to be embedded on the homepage carousel section and in the blog article `blog/build-breathing-habit.html`.

Videos will be placed in `assets/videos/` as `demo-1.mp4`, `demo-2.mp4`, `demo-3.mp4` by the project owner. Optimized WebM/MP4 variants and posters will also be provided.

**This task modifies 3 files, creates 0 files.**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `index.html` -- add video elements to carousel cards |
| MODIFY | `blog/build-breathing-habit.html` -- add video demo after intro paragraph |
| MODIFY | `styles.css` -- add video-in-card styles |
| MODIFY | `script.js` -- add IntersectionObserver for video play/pause |

## Requirements

### Homepage (index.html) -- Carousel section (#demo)

1. Replace static gradient backgrounds on 3 of the 5 carousel cards with `<video>` backgrounds:
   - `.card-mountains` -> `demo-1.mp4`
   - `.card-meditation` -> `demo-2.mp4`
   - `.card-forest` -> `demo-3.mp4`
   - `.card-city` and `.card-ocean` keep their CSS gradients (no video yet)

2. Video element inside each card:
```html
<div class="carousel-card card-mountains">
  <video class="card-bg-video" autoplay muted loop playsinline preload="metadata"
         poster="./assets/videos/demo-1-poster.webp">
    <source src="./assets/videos/demo-1.webm" type="video/webm" />
    <source src="./assets/videos/demo-1.mp4" type="video/mp4" />
  </video>
  <div class="card-overlay">
    <!-- existing overlay content unchanged -->
  </div>
</div>
```

3. NOTE: Videos on carousel are **muted** (autoplay requires muted). Audio is used only in the blog embed.

4. CSS for `.card-bg-video`:
```css
.card-bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  border-radius: inherit;
}
```

5. The `.card-overlay` already has `position: absolute; inset: 0; z-index: 1` so it will layer on top of the video naturally.

### Blog (blog/build-breathing-habit.html)

1. Add ONE video demo after the second `<p>` in `.article-body` (after "This is not a willpower problem. It is a habit design problem."):

```html
<figure class="media-block media-video-v">
  <div class="media-video-v-shell">
    <video controls preload="metadata" loop playsinline
           poster="../assets/videos/demo-2-poster.webp">
      <source src="../assets/videos/demo-2.webm" type="video/webm" />
      <source src="../assets/videos/demo-2.mp4" type="video/mp4" />
    </video>
  </div>
  <figcaption>InnerFire reacts to your breath in real time.</figcaption>
</figure>
```

2. Blog video has `controls` (user can play/pause, adjust volume) and is NOT autoplay -- user initiates playback. It DOES have original audio.

### JavaScript (script.js)

Add IntersectionObserver to auto-play/pause `.card-bg-video` elements when they enter/leave viewport:

```js
// Video autoplay on viewport visibility
(function() {
  var videos = document.querySelectorAll('.card-bg-video');
  if (!videos.length || !('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.25 });
  videos.forEach(function(v) { observer.observe(v); });
})();
```

## Verification

1. Open index.html -- 3 carousel cards show looping video, 2 keep gradient
2. Scroll past carousel -- videos pause (check via DevTools)
3. Scroll back -- videos resume
4. Open blog article -- video is visible, has play button, plays with sound on click
5. Mobile viewport (375px) -- videos scale correctly, no overflow
6. Lighthouse performance -- no major regression (videos are lazy)

## Behavior changes
- Carousel cards that had static gradients now show looping video backgrounds (3 of 5)
- Blog article gains one embedded video with controls
