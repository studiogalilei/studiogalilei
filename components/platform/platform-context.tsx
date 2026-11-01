"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  currentProject,
  initialUi,
  loadStore,
  mayEdit,
  visibleProjects,
  saveStore,
  type ModalType,
  type Page,
  type Role,
  type Store,
  type UiState,
} from "./data";
import { downloadFile } from "./files";

type Platform = {
  store: Store;
  ui: UiState;
  toast: string;
  flash: (message: string) => void;
  /** Applies a change to a copy of the data and saves it in the browser. */
  commit: (change: (draft: Store) => void) => Store;
  chooseRole: (step: Role | "landing") => void;
  enter: (id: string) => void;
  exit: () => void;
  goto: (page: Page) => void;
  openProject: (id: string, store?: Store) => void;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  download: (fileId: string, name: string) => Promise<void>;
};

const PlatformContext = createContext<Platform | null>(null);

export function usePlatform() {
  const value = useContext(PlatformContext);
  if (!value) throw new Error("usePlatform outside PlatformProvider");
  return value;
}

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  // The landing screen doesn't show stored data, so reading it on the client only is safe.
  const [store, setStore] = useState<Store>(() =>
    typeof window === "undefined"
      ? ({ partners: [], members: [], projects: [], reports: [] } as Store)
      : loadStore(),
  );
  const [ui, setUi] = useState<UiState>(initialUi);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(0);

  const flash = useCallback((message: string) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 3500);
  }, []);

  const commit = useCallback(
    (change: (draft: Store) => void) => {
      const next = structuredClone(store);
      change(next);
      if (!saveStore(next))
        flash("Impossibile salvare. Lo spazio del browser potrebbe essere pieno.");
      setStore(next);
      return next;
    },
    [store, flash],
  );

  const closeModal = useCallback(() => setUi((u) => ({ ...u, modal: null })), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  const value = useMemo<Platform>(
    () => ({
      store,
      ui,
      toast,
      flash,
      commit,
      closeModal,
      chooseRole: (step) => setUi((u) => ({ ...u, step })),
      enter: (id) => {
        const role = ui.step as Role;
        setUi({ ...initialUi, role, id, page: role === "partner" ? "home" : "projects" });
      },
      exit: () => setUi(initialUi),
      goto: (page) => {
        setUi((u) => ({ ...u, page, projectId: null, modal: null }));
        window.scrollTo(0, 0);
      },
      openProject: (id, data = store) => {
        if (!visibleProjects(data, ui).some((p) => p.id === id)) return;
        setUi((u) => ({ ...u, projectId: id, page: "detail", modal: null }));
        window.scrollTo(0, 0);
      },
      openModal: (type) => {
        const project = currentProject(store, ui);
        const allowed =
          type === "roadmap" || type === "report"
            ? mayEdit(ui, project)
            : type === "profile"
              ? ui.role === "member"
              : ui.role === "consultant";
        if (allowed) setUi((u) => ({ ...u, modal: type }));
      },
      download: async (fileId, name) => {
        if (!(await downloadFile(fileId, name))) flash("File non disponibile su questo browser.");
      },
    }),
    [store, ui, toast, flash, commit, closeModal],
  );

  return <PlatformContext value={value}>{children}</PlatformContext>;
}
