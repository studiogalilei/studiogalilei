"use client";

import { useEffect, useRef } from "react";

const workspace = "https://workspace.studiogalilei.com";

export function PrivateAreaSignIn({
  locale,
  title,
  fallback,
}: {
  locale: string;
  title: string;
  fallback: string;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const language = locale === "en" ? "en" : "it";

  function connect() {
    frame.current?.contentWindow?.postMessage({ type: "workspace:signin-connect" }, workspace);
  }

  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== workspace || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "workspace:signin-ready") connect();
      if (event.data?.type === "workspace:signin-complete") {
        window.location.assign(new URL(`/?lang=${language}`, workspace).href);
      }
    }
    window.addEventListener("message", receive);
    connect();
    return () => window.removeEventListener("message", receive);
  }, [language]);

  return (
    <section className="bg-mist" aria-label={title}>
      <iframe
        ref={frame}
        title={title}
        src={`${workspace}/website-sign-in?lang=${language}`}
        onLoad={connect}
        className="block h-[max(480px,calc(100dvh-73px))] w-full border-0"
        referrerPolicy="origin"
      />
      <noscript>
        <a href={`${workspace}/?lang=${language}`}>{fallback}</a>
      </noscript>
    </section>
  );
}
