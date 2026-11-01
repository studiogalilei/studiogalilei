"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { CircleCheck, Mail } from "@/components/icons";
import { company } from "@/lib/company";

const label = "mb-2 block text-14 font-medium text-sg";
const input =
  "w-full rounded-10 border border-sg/15 bg-white px-4 py-3 text-15 text-ink placeholder:text-ink/35 focus:border-ai focus:ring-2 focus:ring-ai/20 focus:outline-none";

type Fields = Record<string, string>;

async function send(fields: Fields) {
  try {
    const res = await fetch("/api/invia-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        tipo: "contatto",
        replyto: fields.email ?? "",
        campi: fields,
      }),
    });
    const data = await res.json().catch(() => null);
    return res.ok && data?.ok === true;
  } catch {
    return false;
  }
}

/** Same message, ready in the visitor's mail app, for when sending fails. */
function mailtoHref(subject: string, fields: Fields) {
  const body = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [mailto, setMailto] = useState("");

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 py-10" role="status">
        <CircleCheck size={36} className="text-sw" aria-hidden="true" />
        <h2 className="text-1.6rem font-semibold -tracking-2 text-sg">{t("sentTitle")}</h2>
        <p className="text-16 leading-relaxed text-ink/65">{t("sentText")}</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    if (data.get("_honey")) return; // filled by bots only
    const fields: Fields = {};
    data.forEach((value, key) => {
      if (!key.startsWith("_")) fields[key] = String(value);
    });
    setError("");
    setMailto("");
    setSending(true);
    try {
      if (await send(fields)) return setSent(true);
      console.error("Contact form submit failed");
      setMailto(mailtoHref(t("mailSubject"), fields));
      setError(t("sendFailed"));
    } finally {
      setSending(false);
    }
  }

  const optional = <span className="font-normal text-ink/45">{t("optional")}</span>;

  return (
    <form className="grid max-w-[34rem] gap-5" onSubmit={onSubmit}>
      <div>
        <label htmlFor="nome" className={label}>
          {t("name")}
        </label>
        <input
          id="nome"
          name="nome"
          required
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          className={input}
        />
      </div>
      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          className={input}
        />
      </div>
      <div>
        <label htmlFor="sito" className={label}>
          {t("website")} {optional}
        </label>
        <input
          id="sito"
          name="sito"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder={t("websitePlaceholder")}
          className={input}
        />
      </div>
      <div>
        <label htmlFor="telefono" className={label}>
          {t("phone")} {optional}
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          placeholder={t("phonePlaceholder")}
          className={input}
        />
      </div>
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="flex flex-col items-start gap-3 pt-1">
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-10 bg-sg px-6 py-3.5 text-15 font-medium text-white hover:bg-sg-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {sending ? t("sending") : t("send")}
        </button>
        {error && (
          <p role="alert" className="text-14 leading-relaxed text-red-600">
            {error}
          </p>
        )}
        {error && mailto && (
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-10 border border-sg/25 px-[18px] py-[11px] text-15 font-medium text-sg hover:border-sg hover:bg-pale"
          >
            <Mail size={17} strokeWidth={2} aria-hidden="true" />
            {t("sendByEmail")}
          </a>
        )}
      </div>
    </form>
  );
}
