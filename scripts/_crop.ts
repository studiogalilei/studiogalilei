import { readFileSync, writeFileSync } from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
const [, , a, b, region, out] = process.argv; // region: top:N | bottom:N
const A = PNG.sync.read(readFileSync(a)),
  B = PNG.sync.read(readFileSync(b));
const [kind, n] = region.split(":");
const h = Number(n),
  w = Math.min(A.width, B.width);
const crop = (img: PNG) => {
  const o = new PNG({ width: w, height: h });
  PNG.bitblt(img, o, 0, kind === "top" ? 0 : img.height - h, w, h, 0, 0);
  return o;
};
const ca = crop(A),
  cb = crop(B),
  d = new PNG({ width: w, height: h });
const n2 = pixelmatch(ca.data, cb.data, d.data, w, h, { threshold: 0.1 });
const both = new PNG({ width: w, height: h * 3 });
PNG.bitblt(ca, both, 0, 0, w, h, 0, 0);
PNG.bitblt(cb, both, 0, 0, w, h, 0, h);
PNG.bitblt(d, both, 0, 0, w, h, 0, 2 * h);
writeFileSync(out, PNG.sync.write(both));
console.log(region, ((n2 / (w * h)) * 100).toFixed(3) + "%");
