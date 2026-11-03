/// <reference lib="webworker" />
import {
  createGlobeLoop,
  createGlobeRenderer,
  type GlobeFromWorker,
  type GlobeMessage,
} from "./globe-render";

// The globe's rotation, drawn off the main thread. Each frame is drawn on this worker's own
// canvas and sent to the page as an ImageBitmap (transferred, not copied), which shows it on
// an ordinary canvas: unlike a canvas whose control was handed to a worker, that one is
// captured like any other element in the snapshots of a view transition (a language switch,
// say), instead of as a blank or black square.
const canvas = new OffscreenCanvas(1, 1);
let scale = 1;
let loop: ReturnType<typeof createGlobeLoop> | undefined;

const post = (message: GlobeFromWorker, transfer: Transferable[] = []) =>
  self.postMessage(message, transfer);

self.onmessage = (event: MessageEvent<GlobeMessage>) => {
  const message = event.data;
  if (message.type === "init") {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const render = createGlobeRenderer(ctx);
    loop = createGlobeLoop(
      (angle) => {
        render(angle, scale);
        const bitmap = canvas.transferToImageBitmap();
        post({ type: "frame", bitmap, angle }, [bitmap]);
      },
      undefined,
      message.angle,
    );
  }
  if ((message.type === "init" || message.type === "resize") && loop) {
    canvas.width = canvas.height = message.width;
    scale = message.scale;
    loop.redraw();
    if (message.type === "init") post({ type: "ready", paced: loop.paced });
  }
  if (message.type === "run") {
    if (message.on) loop?.start();
    else loop?.stop();
  }
  if (message.type === "frame") loop?.frame(message.time);
};
