/// <reference lib="webworker" />
import {
  createGlobeLoop,
  createGlobeRenderer,
  type GlobeMessage,
  type GlobeReady,
} from "./globe-render";

// The globe's rotation, drawn off the main thread on the canvas globe.tsx transferred here.
let canvas: OffscreenCanvas | undefined;
let scale = 1;
let loop: ReturnType<typeof createGlobeLoop> | undefined;

self.onmessage = (event: MessageEvent<GlobeMessage>) => {
  const message = event.data;
  if (message.type === "init") {
    canvas = message.canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const render = createGlobeRenderer(ctx);
    loop = createGlobeLoop((angle) => render(angle, scale));
  }
  if ((message.type === "init" || message.type === "resize") && canvas && loop) {
    canvas.width = canvas.height = message.width;
    scale = message.scale;
    loop.redraw();
    if (message.type === "init") self.postMessage({ paced: loop.paced } satisfies GlobeReady);
  }
  if (message.type === "run") {
    if (message.on) loop?.start();
    else loop?.stop();
  }
  if (message.type === "frame") loop?.frame(message.time);
};
