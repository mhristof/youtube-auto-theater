(() => {
  // YouTube remembers theater mode in the "wide" cookie; setting it early
  // makes full page loads render in theater mode on the classic layout.
  document.cookie = "wide=1; domain=.youtube.com; path=/; max-age=31536000; SameSite=Lax";

  // How long after a navigation we keep enforcing theater mode. YouTube may
  // re-open the side panel while the page settles, so one click is not enough.
  const ENFORCE_MS = 8000;
  const CHECK_MS = 300;
  // Minimum gap between clicks so a click has time to take effect.
  const CLICK_COOLDOWN_MS = 1200;

  let interval = null;
  let lastClick = 0;

  function isTheater(flexy) {
    // Classic layout: an explicit "theater" attribute.
    if (flexy.hasAttribute("theater")) return true;
    // Newer layout: theater mode collapses the fixed side panel instead.
    if (flexy.hasAttribute("using-fixed-panel")) {
      return !flexy.hasAttribute("fixed-panel-expanded");
    }
    return false;
  }

  function check() {
    if (location.pathname !== "/watch" || document.fullscreenElement) return;
    const flexy = document.querySelector("ytd-watch-flexy");
    const button = document.querySelector(".ytp-size-button");
    if (!flexy || flexy.hidden || !button || isTheater(flexy)) return;
    if (Date.now() - lastClick < CLICK_COOLDOWN_MS) return;
    lastClick = Date.now();
    button.click();
  }

  function enforce() {
    clearInterval(interval);
    const started = Date.now();
    interval = setInterval(() => {
      if (Date.now() - started > ENFORCE_MS) {
        clearInterval(interval);
        return;
      }
      check();
    }, CHECK_MS);
  }

  // YouTube is a single-page app: catch both full loads and in-app navigation.
  document.addEventListener("yt-navigate-finish", enforce);
  window.addEventListener("load", enforce);
})();
