/**
 * Runs `callback` once the page has loaded and the browser is idle, i.e. after React has
 * hydrated the server-rendered tree, so DOM enhancements can't cause hydration mismatches.
 * Returns a function that cancels the pending call.
 */
export function afterHydration(callback: () => void): () => void {
  // Safari has no requestIdleCallback
  const hasIdle = "requestIdleCallback" in window;
  let handle = 0;
  const schedule = () => {
    handle = hasIdle ? requestIdleCallback(callback) : window.setTimeout(callback, 1);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (hasIdle) cancelIdleCallback(handle);
    else clearTimeout(handle);
  };
}
