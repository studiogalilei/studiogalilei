import type { Metadata, Viewport } from "next";
import { PlatformApp } from "@/components/platform/platform-app";

export const metadata: Metadata = { title: "Studio Galilei | Platform" };

export const viewport: Viewport = { themeColor: "#061773" };

export default function PlatformPage() {
  return <PlatformApp />;
}
