// Platform prototype data: everything lives in the visitor's browser (localStorage).
// The key and the shapes are the ones the original prototype used, so existing data keeps loading.

export type Partner = { id: string; name: string; website: string };
export type Member = { id: string; name: string; city: string; skills: string[]; bio: string };
export type Step = { id: string; title: string; due: string; note: string };
export type Roadmap = {
  service: string;
  deadline: string;
  steps: Step[];
  current: number;
  sentAt: string | null;
};
export type Project = {
  id: string;
  title: string;
  partnerId: string;
  memberId: string;
  deadline: string;
  service: string;
  roadmap: Roadmap | null;
  draft: Roadmap | null;
  createdAt: string;
};
export type Report = {
  id: string;
  projectId: string;
  title: string;
  body: string;
  at: string;
  fileId: string | null;
  fileName: string | null;
  author: string;
};
export type Store = {
  partners: Partner[];
  members: Member[];
  projects: Project[];
  reports: Report[];
};

export type Role = "partner" | "member" | "consultant";
export type Page =
  "home" | "projects" | "documents" | "profile" | "partners" | "members" | "detail";
export type ModalType = "roadmap" | "report" | "project" | "partner" | "member" | "profile";
export type UiState = {
  role: Role | null;
  id: string | null;
  step: "landing" | Role;
  page: Page;
  projectId: string | null;
  modal: ModalType | null;
};

export const initialUi: UiState = {
  role: null,
  id: null,
  step: "landing",
  page: "home",
  projectId: null,
  modal: null,
};

const KEY = "sg_simple_roadmap_v1";

export const makeId = (prefix: string) =>
  prefix + "_" + (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
export const today = () => new Date().toISOString().slice(0, 10);
export const timestamp = () => new Date().toISOString();
export const niceDate = (date: string | null | undefined) =>
  date
    ? new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "short", year: "numeric" }).format(
        new Date(date + "T12:00:00"),
      )
    : "Da definire";
export const isLate = (date: string | null | undefined) => !!date && date < today();

function seed(): Store {
  return {
    partners: [
      { id: "p1", name: "Azienda Alfa S.r.l.", website: "https://example.com" },
      { id: "p2", name: "Impresa Beta S.r.l.", website: "" },
    ],
    members: [
      {
        id: "m1",
        name: "Paolo Rossi",
        city: "Treviso",
        skills: ["Google Ads", "Meta Ads", "Tracking"],
        bio: "Mi occupo di acquisizione clienti attraverso campagne Google Ads e Meta Ads, con particolare attenzione alla misurazione dei risultati.",
      },
      {
        id: "m2",
        name: "Elena Bianchi",
        city: "Padova",
        skills: ["Siti web", "Grafica"],
        bio: "Progetto e realizzo siti aziendali, curando usabilità e identità visiva.",
      },
      {
        id: "m3",
        name: "Marco Verdi",
        city: "Treviso",
        skills: ["Foto", "Video"],
        bio: "Realizzo contenuti fotografici e video per aziende.",
      },
    ],
    projects: [
      {
        id: "pr1",
        title: "Acquisizione clienti",
        partnerId: "p1",
        memberId: "m1",
        deadline: "2026-12-15",
        service: "Google Ads",
        roadmap: {
          service: "Google Ads",
          deadline: "2026-12-15",
          steps: [
            {
              id: "a1",
              title: "Analisi mercato e piano",
              due: "2026-11-02",
              note: "Condivisione della strategia pubblicitaria.",
            },
            {
              id: "a2",
              title: "Attivazione campagne",
              due: "2026-11-12",
              note: "Campagne e tracciamento operativo.",
            },
            {
              id: "a3",
              title: "Ottimizzazione e report",
              due: "2026-12-15",
              note: "Monitoraggio e analisi dei risultati.",
            },
          ],
          current: 1,
          sentAt: "2026-10-25T12:00:00Z",
        },
        draft: null,
        createdAt: "2026-10-24T10:00:00Z",
      },
      {
        id: "pr2",
        title: "Nuovo sito aziendale",
        partnerId: "p1",
        memberId: "m2",
        deadline: "2026-12-10",
        service: "",
        roadmap: null,
        draft: null,
        createdAt: "2026-10-24T11:00:00Z",
      },
      {
        id: "pr3",
        title: "Video aziendale",
        partnerId: "p2",
        memberId: "m3",
        deadline: "2026-11-28",
        service: "Video",
        roadmap: {
          service: "Video",
          deadline: "2026-11-28",
          steps: [
            { id: "b1", title: "Brief e storyboard", due: "2026-11-03", note: "" },
            { id: "b2", title: "Riprese", due: "2026-11-12", note: "" },
            { id: "b3", title: "Montaggio e consegna", due: "2026-11-28", note: "" },
          ],
          current: 0,
          sentAt: "2026-10-25T13:00:00Z",
        },
        draft: null,
        createdAt: "2026-10-24T13:00:00Z",
      },
    ],
    reports: [
      {
        id: "r1",
        projectId: "pr1",
        title: "Aggiornamento campagne",
        body: "Campagne attive, prima verifica dei dati completata.",
        at: "2026-10-25T15:00:00Z",
        fileId: null,
        fileName: null,
        author: "Paolo Rossi",
      },
    ],
  };
}

export function loadStore(): Store {
  try {
    const x = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (x && [x.projects, x.members, x.partners, x.reports].every(Array.isArray)) return x;
  } catch {}
  return seed();
}

/** Returns false when the browser refuses to store the data (e.g. quota exceeded). */
export function saveStore(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}

// Derived views, for the visitor currently signed in as `ui.role` / `ui.id`.

export const roleName = (role: Role | null) =>
  role === "partner" ? "Area Partner" : role === "member" ? "Area Member" : "Area Consulente";

export function actor(store: Store, ui: UiState) {
  if (ui.role === "member") return store.members.find((x) => x.id === ui.id);
  if (ui.role === "partner") return store.partners.find((x) => x.id === ui.id);
  return { name: "Studio Galilei" };
}

export const memberOf = (store: Store, p: Project) =>
  store.members.find((x) => x.id === p.memberId);
export const partnerOf = (store: Store, p: Project) =>
  store.partners.find((x) => x.id === p.partnerId);
export const mayEdit = (ui: UiState, p: Project | undefined): p is Project =>
  !!p && ui.role === "member" && p.memberId === ui.id;

export const visibleProjects = (store: Store, ui: UiState) =>
  store.projects.filter(
    (p) =>
      ui.role === "consultant" ||
      (ui.role === "member" ? p.memberId === ui.id : p.partnerId === ui.id),
  );

export const visibleReports = (store: Store, ui: UiState) => {
  const ps = visibleProjects(store, ui);
  return store.reports.filter((r) => ps.some((p) => p.id === r.projectId));
};

export const currentProject = (store: Store, ui: UiState) =>
  visibleProjects(store, ui).find((p) => p.id === ui.projectId);

export const phase = (p: Project) =>
  p.roadmap
    ? p.roadmap.current >= p.roadmap.steps.length
      ? "Completato"
      : p.roadmap.steps[p.roadmap.current]?.title || "In programma"
    : "Roadmap da preparare";

export const percent = (p: Project) =>
  p.roadmap ? Math.round((100 * p.roadmap.current) / p.roadmap.steps.length) : 0;

export const status = (p: Project) =>
  !p.roadmap
    ? "Da preparare"
    : p.roadmap.current >= p.roadmap.steps.length
      ? "Completato"
      : "In corso";
