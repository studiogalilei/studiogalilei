import { useTranslations } from "next-intl";
import {
  CalendarDays,
  ChevronDown,
  Database,
  FileText,
  LayoutGrid,
  MessageSquare,
  TriangleAlert,
  UserCog,
  Users,
  type IconProps,
} from "@/components/icons";
import { cn } from "@/lib/cn";

/*
 * Mock-ups of the tour operator app built for FunDallas Tours and BeaVita Tours, with the
 * real data blurred into placeholder bars. Each screen is drawn at 1100×680 and scaled
 * by ScreenFrame.
 */

const NAVY = "#061773";
const AZURE = "#0689FF";

const NAV = [
  { key: "overview", label: "dashboard", icon: LayoutGrid },
  { key: "calendar", label: "calendario", icon: CalendarDays },
  { key: "lists", label: "listePasseggeri", icon: FileText },
  { key: "resources", label: "risorse", icon: Users },
  { key: "messages", label: "messaggi", icon: MessageSquare },
  { key: "users", label: "utenti", icon: UserCog },
] as const;

type ScreenKey = (typeof NAV)[number]["key"];

/** A blurred-out piece of text. */
function Bar({
  w = 80,
  h = 8,
  tone = "#E3E8F4",
}: {
  w?: number | string;
  h?: number;
  tone?: string;
}) {
  return <span className="block rounded-full" style={{ width: w, height: h, background: tone }} />;
}

function Dot({ color }: { color: string }) {
  return <span className="size-[9px] rounded-full" style={{ background: color }} />;
}

const pillTones = {
  azure: "bg-[#DCEEFF] text-[#0560C2]",
  navy: "bg-sg text-white",
  ink: "bg-ink text-white",
  pale: "bg-pale text-sg",
};

function Pill({
  tone = "azure",
  children,
}: {
  tone?: keyof typeof pillTones;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-11 font-semibold",
        pillTones[tone],
      )}
    >
      {children}
    </span>
  );
}

function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-line bg-white shadow-[0_1px_2px_rgba(6,23,115,.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Select({ label, value, w = 190 }: { label: string; value: string; w?: number }) {
  return (
    <div>
      <p className="mb-1.5 text-10 font-semibold tracking-14 text-ink/50 uppercase">{label}</p>
      <div
        className="flex items-center justify-between rounded-lg border border-[#D9E0EF] bg-white px-3 py-2 text-13"
        style={{ width: w }}
      >
        {value}
        <ChevronDown size={14} className="text-ink/40" />
      </div>
    </div>
  );
}

function AppShell({
  active,
  kicker,
  title,
  right,
  children,
}: {
  active: ScreenKey;
  kicker: string;
  title: string;
  right: React.ReactNode;
  children: React.ReactNode;
}) {
  const s = useTranslations("CaseStudies.screens");
  return (
    <div className="flex h-full w-full bg-[#F4F6FB] font-sans text-ink">
      <aside className="flex w-[190px] flex-none flex-col bg-sg-deep px-3 py-5 text-white">
        <div className="mb-7 flex items-center gap-2 px-2">
          <span className="grid size-7 place-items-center rounded-lg bg-white/10">
            <span className="size-3 rounded-full" style={{ background: AZURE }} />
          </span>
          <Bar w={84} h={7} tone="rgba(255,255,255,.28)" />
        </div>
        <ul className="space-y-1">
          {NAV.map(({ key, label, icon: Icon }) => {
            const current = key === active;
            return (
              <li
                key={key}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-12.5",
                  current ? "bg-white font-semibold text-sg" : "text-white/70",
                )}
              >
                <Icon
                  size={15}
                  strokeWidth={2}
                  style={{ color: current ? AZURE : "rgba(255,255,255,.6)" }}
                />
                {s(label)}
              </li>
            );
          })}
        </ul>
        <div className="mt-auto flex items-center gap-2 px-2">
          <span className="size-7 rounded-full bg-white/15" />
          <Bar w={70} h={6} tone="rgba(255,255,255,.22)" />
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-end justify-between border-b border-line bg-white px-7 pt-5 pb-4">
          <div>
            <p
              className="text-10 font-semibold tracking-[0.16em] uppercase"
              style={{ color: AZURE }}
            >
              {s(kicker)}
            </p>
            <p className="mt-1 text-22 font-semibold -tracking-2" style={{ color: NAVY }}>
              {s(title)}
            </p>
          </div>
          {right}
        </header>
        <div className="min-h-0 flex-1 overflow-hidden p-6">{children}</div>
      </main>
    </div>
  );
}

const WEEKDAYS = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];
// July 2026 starts on a Wednesday
const JULY_DAYS = [null, null, null, ...Array.from({ length: 18 }, (_, i) => i + 1)];

/** Month calendar with the first two or three weeks of July 2026. */
function MonthGrid({
  top,
  rows = 2,
  cell,
}: {
  top: React.ReactNode;
  rows?: number;
  cell: (day: number) => React.ReactNode;
}) {
  const s = useTranslations("CaseStudies.screens");
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-end justify-between border-b border-line p-4">{top}</div>
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="border-r border-b border-line bg-[#F7F9FD] px-3 py-2 text-10.5 font-semibold tracking-12 text-ink/55 uppercase"
          >
            {s(day)}
          </div>
        ))}
        {JULY_DAYS.slice(0, rows * 7).map((day, i) => (
          <div
            key={i}
            className="h-[232px] overflow-hidden border-r border-b border-line p-2.5"
            style={{ background: day ? "#fff" : "#F7F9FD" }}
          >
            {day && (
              <p className="mb-2 text-14 font-semibold" style={{ color: NAVY }}>
                {day}
              </p>
            )}
            {day && cell(day)}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function OverviewScreen() {
  const s = useTranslations("CaseStudies.screens");
  const stats: {
    title: string;
    value: string;
    note: string;
    icon: (p: IconProps) => React.ReactNode;
    tone: string;
  }[] = [
    {
      title: "messaggiInviati",
      value: "29",
      note: "servizioDel03Lug2026",
      icon: MessageSquare,
      tone: AZURE,
    },
    {
      title: "messaggiFalliti",
      value: "1",
      note: "messaggiDaControllare",
      icon: TriangleAlert,
      tone: "#0A0A1A",
    },
    { title: "listePasseggeri", value: "19/19", note: "luglio2026", icon: FileText, tone: AZURE },
    {
      title: "syncPrenotazioni",
      value: "riuscita",
      note: "n02Lug20261942",
      icon: Database,
      tone: NAVY,
    },
  ];
  return (
    <AppShell
      active="overview"
      kicker="dashboard"
      title="panoramica"
      right={
        <div className="flex gap-2">
          <Pill tone="pale">Admin</Pill>
          <Pill tone="navy">{s("daControllare")}</Pill>
        </div>
      }
    >
      <div className="grid grid-cols-4 gap-4">
        {stats.map(({ title, value, note, icon: Icon, tone }) => {
          const dark = tone === "#0A0A1A";
          return (
            <Panel key={title} className="p-4">
              <div className="flex items-start justify-between">
                <p className="text-12.5 font-medium">{s(title)}</p>
                <span
                  className="grid size-8 place-items-center rounded-lg"
                  style={{ background: dark ? "#0A0A1A" : "#E6F1FF" }}
                >
                  <Icon size={16} style={{ color: dark ? "#fff" : tone }} />
                </span>
              </div>
              <p className="mt-3 text-[24px] font-semibold -tracking-2" style={{ color: NAVY }}>
                {/^[\d/]+$/.test(value) ? value : s(value)}
              </p>
              <p className="mt-1 text-11.5 text-ink/55">{s(note)}</p>
            </Panel>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-[1fr_1.25fr] gap-4">
        <Panel className="h-[400px]">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="text-14 font-semibold" style={{ color: NAVY }}>
              {s("daControllare")}
            </p>
            <Pill tone="pale">{s("n1Elemento")}</Pill>
          </div>
          <div className="flex gap-3 px-4 py-4">
            <span className="grid size-8 flex-none place-items-center rounded-lg bg-ink">
              <TriangleAlert size={15} className="text-white" />
            </span>
            <div>
              <p className="text-13 font-semibold">{s("messaggiNonConsegnati")}</p>
              <p className="text-11.5 text-ink/55">{s("n1MessaggioClienteFallito")}</p>
            </div>
          </div>
        </Panel>
        <Panel className="h-[400px] overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="text-14 font-semibold" style={{ color: NAVY }}>
                {s("listePasseggeri")}
              </p>
              <p className="text-11.5 text-ink/55">{s("luglio2026")}</p>
            </div>
            <span
              className="rounded-lg border border-[#D9E0EF] px-3 py-1.5 text-12 font-medium"
              style={{ color: NAVY }}
            >
              {s("apriListe")}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 px-4 py-3">
            {[
              ["inviate", "19", AZURE],
              ["inLavorazione", "0", NAVY],
              ["fallite", "0", "#0A0A1A"],
            ].map(([label, count, color]) => (
              <div key={label} className="rounded-lg border border-line px-3 py-2">
                <p className="text-9.5 font-semibold tracking-12 text-ink/50 uppercase">
                  {s(label)}
                </p>
                <p className="text-18 font-semibold" style={{ color }}>
                  {count}
                </p>
              </div>
            ))}
          </div>
          {["18:03", "18:02", "18:02", "07:02", "07:02", "07:02"].map((time, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-t border-[#EEF1F7] px-4 py-[11px]"
            >
              <div className="space-y-1.5">
                <Bar w={110} />
                <Bar w={70} h={6} tone="#EDF0F7" />
              </div>
              <div className="flex items-center gap-3">
                <Pill>{s("inviata")}</Pill>
                <span className="text-11.5 text-ink/60">
                  {s("n02Lug2026")}
                  {time}
                </span>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </AppShell>
  );
}

// Seats sold / capacity for each departure, 1–9 July
const CALENDAR = [
  ["32/32", "4/8", null, null, null, null, "22/50"],
  ["8/8", "7/8", null, null, "4/8", "1/1", "38/50"],
  ["17/24", "8/8", null, null, null, null, "45/63"],
  ["19/24", "8/8", "8/8", null, null, null, "31/50"],
  ["7/8", null, null, null, null, "0/5", null],
  ["13/40", "0/8", null, null, null, "0/5", "28/50"],
  ["11/40", "3/8", null, null, null, "0/5", "8/50"],
  ["17/40", "4/8", null, "0/50", null, "0/5", "22/50"],
  ["15/40", "8/16", null, null, "0/50", "0/5", "28/63"],
];
const CALENDAR_WEEKDAYS = ["mer", "gio", "ven", "sab", "dom", "lun", "mar", "mer", "gio"];

function CalendarScreen() {
  const s = useTranslations("CaseStudies.screens");
  const header =
    "border-r border-b border-line bg-[#F7F9FD] px-2 py-3 text-center text-11 font-semibold tracking-widest text-ink/55 uppercase";
  return (
    <AppShell
      active="calendar"
      kicker="syncPrenotazioni"
      title="calendario"
      right={<span className="text-11.5 text-ink/55">{s("aggiornato02Lug20261942")}</span>}
    >
      <Panel className="overflow-hidden">
        <div className="flex items-end gap-5 border-b border-line p-4">
          <Select label={s("mese")} value={s("luglio2026")} />
          <Select label={s("prodotto")} value={s("tutti")} w={210} />
          <div className="ml-auto grid grid-cols-3 gap-6 rounded-10 bg-[#EEF4FF] px-5 py-3">
            {[
              ["totale", "1164 pax"],
              ["minivan", "526 pax"],
              ["bus", "638 pax"],
            ].map(([label, total]) => (
              <div key={label}>
                <p className="text-9.5 font-semibold tracking-12 text-ink/50 uppercase">
                  {s(label)}
                </p>
                <p className="text-15 font-semibold" style={{ color: NAVY }}>
                  {total}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[80px_140px_repeat(7,1fr)] text-12.5">
          <div className={header}>{s("data")}</div>
          <div className={header}>{s("note")}</div>
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-center border-r border-b border-line py-3"
              style={{ background: i % 2 ? "#E6F1FF" : "#EEF1FA" }}
            >
              <Bar w={46} h={7} tone={i % 2 ? "#BFDDFF" : "#D3DAEE"} />
            </div>
          ))}
          {CALENDAR.map((row, i) => (
            <div key={i} className="contents">
              <div
                className="border-r border-b border-line px-2 py-[7px] text-center"
                style={{ background: i === 1 || i === 4 ? "#DCEEFF" : "#fff" }}
              >
                <p className="text-[9px] text-ink/50 uppercase">{s(CALENDAR_WEEKDAYS[i])}</p>
                <p className="text-13 leading-tight font-semibold" style={{ color: NAVY }}>
                  {i + 1}
                  {s("lug")}
                </p>
              </div>
              <div className="flex items-center justify-center border-r border-b border-line text-12 text-ink/70">
                {i === 2 ? s("fuoriOrario") : ""}
              </div>
              {row.map((seats, j) => {
                const [sold, capacity] = seats?.split("/") ?? [];
                return (
                  <div
                    key={j}
                    className="flex items-center justify-center border-r border-b border-line font-medium"
                    style={{
                      background: seats ? "#fff" : "#EEF1F8",
                      color: seats && sold === capacity ? AZURE : "#0A0A1A",
                    }}
                  >
                    {seats}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

function ListsScreen() {
  const s = useTranslations("CaseStudies.screens");
  return (
    <AppShell
      active="lists"
      kicker="listePasseggeri"
      title="liste"
      right={
        <div className="flex gap-2">
          <Pill>{s("n19Inviate")}</Pill>
          <Pill tone="ink">{s("n0Fallite")}</Pill>
        </div>
      }
    >
      <MonthGrid
        top={<Select label={s("mese")} value={s("luglio2026")} w={260} />}
        cell={(day) => (
          <div className="space-y-1.5">
            {Array.from({ length: day === 2 ? 4 : 3 }, (_, i) => {
              const sent = day <= 3;
              return (
                <div key={i} className="rounded-lg border border-line px-2 py-1.5">
                  <Bar w="70%" h={6} />
                  <div className="mt-1.5 flex gap-1">
                    <Dot color={sent ? AZURE : "#BFC8E6"} />
                    <Dot color={sent && i !== 2 ? AZURE : "#BFC8E6"} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      />
    </AppShell>
  );
}

// Passengers per van, by day
const ASSIGNMENTS = [
  [32, 4],
  [1, 4, 8],
  [17, 8],
  [8, 19, 8],
  [0, 7],
  [0, 13, 0],
  [0, 11, 3],
  [0, 0, 17],
  [0, 0, 15],
  [0, 6, 13],
  [0, 23, 0],
];

function ResourcesScreen() {
  const s = useTranslations("CaseStudies.screens");
  return (
    <AppShell
      active="resources"
      kicker="risorse"
      title="assegnazioni"
      right={<span className="text-11.5 text-ink/55">{s("aggiornato02Lug20261943")}</span>}
    >
      <MonthGrid
        top={
          <div className="flex gap-5">
            <Select label={s("mese")} value={s("luglio2026")} />
            <Select label={s("mezzo")} value={s("van")} />
          </div>
        }
        cell={(day) => (
          <div className="space-y-1.5">
            {(ASSIGNMENTS[day - 1] ?? [0]).map((pax, i) => {
              const busy = pax >= 15 || (i === 0 && day > 4);
              return (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg px-2 py-2"
                  style={{
                    background: busy ? "#E6F1FF" : "#fff",
                    border: `1px solid ${busy ? "#BFDDFF" : "#E3E8F4"}`,
                  }}
                >
                  <Bar w="45%" h={6} tone={busy ? "#BFDDFF" : "#E3E8F4"} />
                  <span
                    className="text-10.5 font-semibold whitespace-nowrap"
                    style={{ color: busy ? NAVY : "#0A0A1A" }}
                  >
                    {pax} pax
                  </span>
                </div>
              );
            })}
          </div>
        )}
      />
    </AppShell>
  );
}

// Passengers per departure, by service day
const MESSAGES = [
  [22, 32, 4],
  [1, 4, 38, 8],
  [45, 17, 8],
  [31, 8, 19, 8],
  [7],
  [28, 13],
  [8, 11, 3],
  [22, 17, 4],
  [28, 15, 8],
  [30, 6, 13],
  [54, 23],
];

function MessagesScreen() {
  const s = useTranslations("CaseStudies.screens");
  return (
    <AppShell
      active="messages"
      kicker="messaggi"
      title="messaggiAiClienti"
      right={
        <div className="flex gap-2">
          <Pill>{s("n29Inviati")}</Pill>
          <Pill tone="ink">{s("n1Fallito")}</Pill>
        </div>
      }
    >
      <Panel className="mb-3 flex items-center justify-between px-4 py-3">
        <p className="flex items-center gap-2 text-13.5 font-semibold" style={{ color: NAVY }}>
          <MessageSquare size={16} style={{ color: AZURE }} />
          {s("smsManuale")}
        </p>
        <ChevronDown size={16} className="text-ink/40" />
      </Panel>
      <MonthGrid
        top={
          <>
            <Select label={s("mese")} value={s("luglio2026")} />
            <div className="flex gap-4 text-11 text-ink/65">
              {[
                ["inviato", AZURE],
                ["parziale", "#9CCBFF"],
                ["mancante", NAVY],
                ["fermato", "#0A0A1A"],
                ["nonDovuto", "#D3DAEE"],
              ].map(([label, color]) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Dot color={color} />
                  {s(label)}
                </span>
              ))}
            </div>
          </>
        }
        cell={(day) => (
          <div className="space-y-1.5">
            {(MESSAGES[day - 1] ?? []).map((pax, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-line px-2 py-1.5"
              >
                <span className="flex items-center gap-1.5">
                  <Dot color={day === 3 && i === 0 ? NAVY : AZURE} />
                  <Bar w={30} h={6} />
                </span>
                <span className="text-10.5 font-semibold whitespace-nowrap">{pax} pax</span>
              </div>
            ))}
          </div>
        )}
      />
    </AppShell>
  );
}

export const screens = {
  overview: OverviewScreen,
  calendar: CalendarScreen,
  lists: ListsScreen,
  resources: ResourcesScreen,
  messages: MessagesScreen,
};
