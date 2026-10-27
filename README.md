# YouTube Auto Theater

Brave/Chrome extension (Manifest V3) that automatically switches YouTube watch pages to theater mode.

## Install

1. Open `brave://extensions` (or `chrome://extensions`).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this folder.

After changing the code, click the reload icon on the extension and hard-reload open YouTube tabs.

## How it works

- Sets YouTube's `wide=1` cookie so full page loads start in theater mode (classic layout).
- For 8 seconds after each navigation, clicks the theater button whenever the player is not in theater mode. On the newer layout, theater mode is detected by the side panel being collapsed (`fixed-panel-expanded` absent on `ytd-watch-flexy`).

## Known limitations

- **Always forces theater mode.** Every new video is switched to theater mode, even if you turned it off on the previous one. There is no option to remember your choice.
- **Fights you briefly after each load.** For 8 seconds after a video loads, opening the side panel (e.g. comments) is undone automatically. After that window it leaves you alone.
- **May miss slow loads.** If the player or panel takes longer than 8 seconds to settle, theater mode may not be applied.
- **Depends on YouTube's markup.** It relies on `.ytp-size-button` and attributes on `ytd-watch-flexy`. A YouTube redesign can break it without warning.
- **Watch pages on www.youtube.com only.** Shorts, embedded players, `m.youtube.com` and `music.youtube.com` are not affected.
- **Skipped in fullscreen.** Nothing happens while the player is fullscreen.
- **Not in a store.** It has to be loaded unpacked in developer mode; Brave/Chrome won't auto-update it.
