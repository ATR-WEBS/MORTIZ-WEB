(() => {
  "use strict";

  const root = document.documentElement;
  const duration = (name) =>
    parseFloat(getComputedStyle(root).getPropertyValue(name)) * 1000;

  const revealable = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const watcher = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    revealable.forEach((el) => watcher.observe(el));
  } else {
    revealable.forEach((el) => el.classList.add("is-shown"));
  }

  if (!root.classList.contains("intro")) return;

  const skip = new AbortController();
  let opened = false;

  const open = () => {
    if (opened) return;
    opened = true;
    skip.abort();
    root.classList.remove("intro", "dusk");
    root.classList.add("opening");
    setTimeout(
      () => root.classList.remove("opening"),
      duration("--intro-rise")
    );
  };

  setTimeout(open, Math.max(0, duration("--intro-dusk") - performance.now()));
  addEventListener("click", open, { signal: skip.signal });
  addEventListener("keydown", open, { signal: skip.signal });
})();
