import { svgResponse, worldBackdropSvg } from "@/lib/geo/maps";

// no request data: prerendered at build time
export function GET() {
  return svgResponse(worldBackdropSvg());
}
