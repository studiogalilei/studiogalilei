import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

type Messages = AbstractIntlMessages;

/** Copies `path` ("Home" or "Home.hero") from `source` into `target`. */
function pick(source: Messages, target: Messages, path: string) {
  const [head, ...rest] = path.split(".");
  const value = source[head];
  if (value === undefined) return;
  if (!rest.length || typeof value === "string") target[head] = value;
  else pick(value, (target[head] ??= {}) as Messages, rest.join("."));
}

/**
 * Hands the given message namespaces (or sub-trees, e.g. "Home.hero") to the Client
 * Components below it. Only these are serialized into the page, instead of every
 * translation of the site.
 */
export async function ClientMessages({
  namespaces,
  children,
}: {
  namespaces: string[];
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const selected: Messages = {};
  for (const ns of namespaces) pick(messages, selected, ns);
  return <NextIntlClientProvider messages={selected}>{children}</NextIntlClientProvider>;
}
