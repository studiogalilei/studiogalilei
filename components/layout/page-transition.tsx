import { ViewTransition } from "react";

/**
 * Page change: the old page fades out where it was on screen, the new one fades in with a
 * slight rise (see the view transition rules in globals.css). Used by the templates, which
 * remount on every navigation; the two pages get no shared name, so nothing morphs or flies
 * between them, whatever the scroll position was.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
