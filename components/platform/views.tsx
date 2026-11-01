"use client";

import { cn } from "@/lib/cn";
import {
  actor,
  currentProject,
  mayEdit,
  memberOf,
  niceDate,
  partnerOf,
  percent,
  phase,
  status,
  visibleProjects,
  visibleReports,
  type Member,
  type Project,
} from "./data";
import { usePlatform } from "./platform-context";
import { buttonBase, buttonClass, DateMark, Heading, Icon, smallText, StatusPill } from "./ui";

const panel = "overflow-hidden rounded-11 border border-platform-line bg-white";
const empty = "p-6 text-platform-mid";
const linkButton = cn(
  buttonBase,
  "border-0 bg-none px-0 py-1 font-bold text-sg focus-visible:rounded-none!",
);
const sectionRow = "mb-3 flex items-center justify-between gap-3";
// inside a .block the block's h2 margin won over the row's (later in the stylesheet)
const sectionTitle = "m-0 text-17 font-bold tracking-[-.2px]";
const block = "mb-[18px] rounded-11 border border-platform-line p-[21px]";
const blockTitle = "mx-0 mt-0 mb-4 text-17 font-bold";
const infoRow =
  "flex items-center justify-between gap-3 border-b border-platform-line py-3.5 last:border-0";

function ProjectRow({ project }: { project: Project }) {
  const { store, ui, openProject } = usePlatform();
  return (
    <button
      type="button"
      onClick={() => openProject(project.id)}
      className={cn(
        buttonBase,
        "flex w-full items-center gap-[15px] border-0 border-b border-platform-line bg-white px-5 py-[19px] text-left last:border-0 hover:bg-[#f9faff] focus-visible:rounded-none! max-[721px]:gap-[9px] max-[721px]:px-3 max-[721px]:py-4",
      )}
    >
      <span className="grid size-[41px] flex-none place-items-center rounded-[9px] border border-platform-line text-sg max-[721px]:size-9">
        <Icon name="folder" className="size-[21px]" />
      </span>
      <span className="min-w-0 flex-1">
        <b className="block text-14">{project.title}</b>
        <small className="mt-1 block text-12 text-platform-mid">
          {ui.role === "partner"
            ? `Member: ${memberOf(store, project)?.name || "Non assegnato"}`
            : `${partnerOf(store, project)?.name || ""} · ${project.service || "Servizio da definire"}`}
        </small>
        <small className="mt-1 block text-12 text-platform-mid">Fase: {phase(project)}</small>
      </span>
      <span className="flex-none text-right max-[721px]:max-w-[120px]">
        <StatusPill project={project} />
        <small className="mt-1.5 block text-11 text-platform-mid">
          Scadenza {niceDate(project.roadmap?.deadline || project.deadline)}
        </small>
      </span>
    </button>
  );
}

function ProjectRows({ projects, emptyText }: { projects: Project[]; emptyText: string }) {
  return (
    <div className={cn(panel, "grid")}>
      {projects.length ? (
        projects.map((p) => <ProjectRow key={p.id} project={p} />)
      ) : (
        <div className={empty}>{emptyText}</div>
      )}
    </div>
  );
}

export function Home() {
  const { store, ui, goto } = usePlatform();
  const projects = visibleProjects(store, ui);
  const deadline = (p: Project) => p.roadmap?.deadline || p.deadline;
  const next = projects
    .filter((p) => status(p) !== "Completato")
    .sort((a, b) => deadline(a).localeCompare(deadline(b)))[0];
  const stat =
    "rounded-11 border border-platform-line px-[22px] py-[19px] max-[721px]:px-2.5 max-[721px]:py-[13px]";
  const statLabel =
    "mb-[11px] block text-12 text-platform-mid max-[721px]:min-h-8 max-[721px]:text-10";
  const statValue = "text-[27px] tracking-[-.6px] max-[721px]:text-22";
  return (
    <>
      <Heading title="I tuoi progetti" subtitle="Segui le attività e le prossime consegne." />
      <div className="mb-[26px] grid grid-cols-3 gap-[13px] max-[721px]:gap-[7px]">
        <div className={stat}>
          <span className={statLabel}>Progetti in corso</span>
          <strong className={statValue}>
            {projects.filter((p) => status(p) === "In corso").length}
          </strong>
        </div>
        <div className={stat}>
          <span className={statLabel}>Da pianificare</span>
          <strong className={statValue}>{projects.filter((p) => !p.roadmap).length}</strong>
        </div>
        <div className={stat}>
          <span className={statLabel}>Prossima deadline</span>
          <strong className={statValue} style={{ fontSize: 17 }}>
            {next ? niceDate(deadline(next)) : "Nessuna"}
          </strong>
        </div>
      </div>
      <div className={sectionRow}>
        <h2 className={sectionTitle}>Progetti</h2>
        <button type="button" className={linkButton} onClick={() => goto("projects")}>
          Vedi tutti
        </button>
      </div>
      <ProjectRows projects={projects} emptyText="Nessun progetto assegnato." />
    </>
  );
}

export function ProjectList() {
  const { store, ui, openModal } = usePlatform();
  return (
    <>
      <Heading
        title={ui.role === "member" ? "I miei progetti" : "Progetti"}
        subtitle={
          ui.role === "partner"
            ? "Vedi fase attuale, avanzamento e scadenze dei lavori."
            : ui.role === "member"
              ? "Prepara la roadmap, aggiorna le fasi e pubblica i report."
              : "Progetti e Member assegnati."
        }
        actions={
          ui.role === "consultant" && (
            <button type="button" className={buttonClass()} onClick={() => openModal("project")}>
              <Icon name="plus" /> Nuovo progetto
            </button>
          )
        }
      />
      <ProjectRows projects={visibleProjects(store, ui)} emptyText="Non ci sono ancora progetti." />
    </>
  );
}

function RoadmapView({ project }: { project: Project }) {
  const { ui, openModal, commit, flash } = usePlatform();
  const r = project.roadmap;
  const editable = mayEdit(ui, project);
  if (!r) {
    return (
      <div className={cn(empty, "p-0")}>
        La roadmap non è ancora stata pubblicata.
        {editable && (
          <div className="mt-[13px]">
            <button type="button" className={buttonClass()} onClick={() => openModal("roadmap")}>
              Prepara la roadmap
            </button>
          </div>
        )}
      </div>
    );
  }
  const done = r.current >= r.steps.length;
  const move = (delta: 1 | -1) => {
    let finished = false;
    commit((draft) => {
      const roadmap = draft.projects.find((p) => p.id === project.id)!.roadmap!;
      roadmap.current += delta;
      finished = roadmap.current >= roadmap.steps.length;
    });
    flash(
      delta < 0
        ? "Fase precedente ripristinata."
        : finished
          ? "Progetto completato."
          : "Fase completata. Il Partner vede ora la fase successiva.",
    );
  };
  return (
    <>
      <div className={sectionRow}>
        <h2 className={cn(sectionTitle, "mb-4")}>Roadmap</h2>
        <span className={smallText}>
          {done ? "Tutte le fasi completate" : `Fase ${r.current + 1} di ${r.steps.length}`}
        </span>
      </div>
      <div
        className="mt-[13px] mb-2 h-[7px] overflow-hidden rounded-md bg-[#e7eafd]"
        aria-label={`Avanzamento ${percent(project)}%`}
      >
        {/* no width transition: the prototype redrew the page on every change, so it never ran */}
        <i className="block h-full bg-sg" style={{ width: `${percent(project)}%` }} />
      </div>
      <div className={cn(smallText, "mb-[22px]")}>{percent(project)}% completato</div>
      <div className="mt-4">
        {r.steps.map((step, i) => {
          const state = i < r.current ? "done" : i === r.current ? "active" : "";
          return (
            <div
              key={step.id}
              className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-[13px] pb-5 not-last:before:absolute not-last:before:top-[31px] not-last:before:bottom-0 not-last:before:left-[15px] not-last:before:w-px not-last:before:bg-[#ccd2e6] not-last:before:content-['']"
            >
              <span
                className={cn(
                  "z-1 grid size-[31px] place-items-center rounded-full border border-[#d0d6e8] bg-white text-12 font-bold text-sg",
                  state && "border-sg bg-sg text-white",
                  state === "active" && "shadow-[0_0_0_4px_#e9edff]",
                )}
              >
                {state === "done" ? <Icon name="check" /> : i + 1}
              </span>
              <div className="min-w-0 pt-[3px]">
                <b className="block text-14">{step.title}</b>
                {step.note && (
                  <p className="mx-0 my-[5px] text-13 wrap-anywhere whitespace-pre-line text-platform-mid">
                    {step.note}
                  </p>
                )}
                <div className="mt-[7px] flex flex-wrap gap-x-4 gap-y-2 text-12 text-[#414757]">
                  <span>
                    {state === "done"
                      ? "Completata"
                      : state === "active"
                        ? "In lavorazione"
                        : "Da iniziare"}
                  </span>
                  <span>Entro {niceDate(step.due)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {editable && (
        <div className="flex flex-wrap items-center gap-2.5 border-t border-platform-line pt-4">
          {!done && (
            <button type="button" className={buttonClass()} onClick={() => move(1)}>
              {r.current === r.steps.length - 1 ? (
                "Completa il progetto"
              ) : (
                <>
                  <Icon name="check" /> Completa fase
                </>
              )}
            </button>
          )}
          {r.current > 0 && (
            <button type="button" className={buttonClass("outline", true)} onClick={() => move(-1)}>
              Torna alla fase precedente
            </button>
          )}
        </div>
      )}
    </>
  );
}

function ReportList({ project }: { project: Project }) {
  const { store, download } = usePlatform();
  const reports = store.reports
    .filter((r) => r.projectId === project.id)
    .sort((a, b) => b.at.localeCompare(a.at));
  if (!reports.length) return <div className={cn(empty, "p-0")}>Nessun report pubblicato.</div>;
  return reports.map((r) => (
    <div key={r.id} className="border-b border-platform-line py-3.5 last:border-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-[15px]">
        <b className="text-13">{r.title}</b>
        <time className="text-11 text-platform-mid">{niceDate(r.at.slice(0, 10))}</time>
      </div>
      {r.body && (
        <p className="mt-[5px] mb-[9px] text-13 wrap-anywhere whitespace-pre-line text-[#32343c]">
          {r.body}
        </p>
      )}
      <div className={smallText}>{r.author}</div>
      {r.fileId && (
        <button
          type="button"
          className={linkButton}
          onClick={() => download(r.fileId!, r.fileName || "documento")}
        >
          {/* the prototype left this icon unsized, inline in the text */}
          <Icon name="download" className="inline align-baseline" /> Scarica{" "}
          {r.fileName || "allegato"}
        </button>
      )}
    </div>
  ));
}

export function ProjectDetail() {
  const { store, ui, goto, openModal } = usePlatform();
  const project = currentProject(store, ui);
  if (!project) return <ProjectList />;
  const r = project.roadmap;
  const editable = mayEdit(ui, project);
  const member = memberOf(store, project);
  return (
    <>
      <button
        type="button"
        onClick={() => goto("projects")}
        className={cn(
          buttonBase,
          "mb-4 border-0 bg-none p-0 font-bold text-sg focus-visible:rounded-none!",
        )}
      >
        ← Torna ai progetti
      </button>
      <div className="mb-5 flex items-start justify-between gap-[18px] max-[721px]:flex-col max-[721px]:items-stretch">
        <div>
          <div className="mb-2 text-12 font-bold tracking-[.05em] text-sg">
            {partnerOf(store, project)?.name || "Partner"}
          </div>
          <h1 className="mx-0 mt-1 mb-[5px] text-[clamp(25px,3vw,32px)] font-bold tracking-[-.7px]">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-x-[25px] gap-y-[9px] text-13 text-[#373b48] max-[721px]:gap-x-[17px] max-[721px]:gap-y-2">
            <span>
              Member: <b>{member?.name || "Non assegnato"}</b>
            </span>
            <span>
              Servizio: <b>{r?.service || project.service || "Da definire"}</b>
            </span>
            <span>
              Deadline: <DateMark date={r?.deadline || project.deadline} />
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {editable && (
            <>
              <button
                type="button"
                className={buttonClass("outline")}
                onClick={() => openModal("roadmap")}
              >
                <Icon name="edit" /> {r ? "Modifica roadmap" : "Crea roadmap"}
              </button>
              <button type="button" className={buttonClass()} onClick={() => openModal("report")}>
                <Icon name="plus" /> Pubblica report
              </button>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(280px,.78fr)] gap-5 max-[1051px]:grid-cols-1">
        <div>
          <section className={block}>
            <RoadmapView project={project} />
          </section>
          <section className={block}>
            <div className={sectionRow}>
              <h2 className={cn(sectionTitle, "mb-4")}>Report e aggiornamenti</h2>
              {editable && (
                <button type="button" className={linkButton} onClick={() => openModal("report")}>
                  Aggiungi
                </button>
              )}
            </div>
            <ReportList project={project} />
          </section>
        </div>
        <aside>
          <section className={block}>
            <h2 className={blockTitle}>Riepilogo</h2>
            <div className={infoRow}>
              <span>Stato</span>
              <StatusPill project={project} />
            </div>
            <div className={infoRow}>
              <span>Fase attuale</span>
              <b className="max-w-[160px] text-right">{phase(project)}</b>
            </div>
            <div className={infoRow}>
              <span>Scadenza finale</span>
              <DateMark date={r?.deadline || project.deadline} />
            </div>
            <div className={infoRow}>
              <span>Avanzamento</span>
              <b>{percent(project)}%</b>
            </div>
          </section>
          {editable && project.draft && (
            <section className={block}>
              <h2 className={blockTitle}>Bozza salvata</h2>
              <p className={cn(smallText, "my-[1em]")}>
                Hai modifiche alla roadmap non ancora inviate al Partner.
              </p>
              <button
                type="button"
                className={buttonClass("outline")}
                onClick={() => openModal("roadmap")}
              >
                Riprendi la bozza
              </button>
            </section>
          )}
          <section className={block}>
            <h2 className={blockTitle}>Referenti</h2>
            <div className="font-bold">{member?.name || "Da assegnare"}</div>
            <div className={smallText}>Member incaricato</div>
            <div className="mt-[17px] font-bold">Studio Galilei</div>
            <div className={smallText}>Consulente responsabile</div>
          </section>
        </aside>
      </div>
    </>
  );
}

export function Documents() {
  const { store, ui, openProject, download } = usePlatform();
  const rows = visibleReports(store, ui)
    .filter((r) => r.fileId || r.body)
    .sort((a, b) => b.at.localeCompare(a.at));
  return (
    <>
      <Heading
        title={ui.role === "member" ? "Materiali" : "Documenti"}
        subtitle={
          ui.role === "partner"
            ? "Report e documenti condivisi sui tuoi progetti."
            : "Materiali pubblicati nei progetti assegnati."
        }
      />
      <div className={cn(panel, "grid p-[21px]")}>
        {rows.length ? (
          rows.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-3 border-b border-platform-line py-[15px] last:border-0"
            >
              <span className="grid size-[41px] flex-none place-items-center rounded-[9px] border border-platform-line text-sg max-[721px]:size-9">
                <Icon name="document" className="size-[21px]" />
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-13">{r.title}</b>
                <small className="block text-12 text-platform-mid">
                  {store.projects.find((p) => p.id === r.projectId)?.title || ""} ·{" "}
                  {niceDate(r.at.slice(0, 10))}
                </small>
              </span>
              {r.fileId ? (
                <button
                  type="button"
                  className={buttonClass("outline", true)}
                  onClick={() => download(r.fileId!, r.fileName!)}
                >
                  Scarica
                </button>
              ) : (
                <button
                  type="button"
                  className={buttonClass("outline", true)}
                  onClick={() => openProject(r.projectId)}
                >
                  Apri
                </button>
              )}
            </div>
          ))
        ) : (
          <div className={empty}>Nessun materiale condiviso.</div>
        )}
      </div>
    </>
  );
}

export function MemberProfile() {
  const { store, ui, openModal } = usePlatform();
  const member = actor(store, ui) as Member;
  return (
    <>
      <Heading
        title="Il tuo profilo"
        subtitle="Le informazioni professionali visibili ai Partner assegnati."
        actions={
          <button
            type="button"
            className={buttonClass("outline")}
            onClick={() => openModal("profile")}
          >
            <Icon name="edit" /> Modifica
          </button>
        }
      />
      <div className={cn(panel, "max-w-[650px] p-[21px]")}>
        <div className="flex items-center gap-3.5">
          <div className="grid size-[50px] flex-none place-items-center rounded-full bg-sg text-18 font-bold text-white">
            {member.name.charAt(0)}
          </div>
          <div>
            <h2 className="m-0 text-[1.5em] font-bold">{member.name}</h2>
            <div className={smallText}>Member Studio Galilei · {member.city}</div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-[30px] border border-platform-line px-2.5 py-[5px] text-12 font-bold text-sg"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="mx-0 mt-6 mb-0 max-w-[65ch]">{member.bio || ""}</p>
      </div>
    </>
  );
}

export function PartnersView() {
  const { store, openModal } = usePlatform();
  return (
    <>
      <Heading
        title="Partner"
        subtitle="Le aziende che collaborano con Studio Galilei."
        actions={
          <button type="button" className={buttonClass()} onClick={() => openModal("partner")}>
            <Icon name="plus" /> Nuovo Partner
          </button>
        }
      />
      <div className={cn(panel, "p-[21px]")}>
        {store.partners.map((p) => (
          <div key={p.id} className={infoRow}>
            <div>
              <b>{p.name}</b>
              <small className="block [font-size:smaller] text-platform-mid">
                {store.projects.filter((x) => x.partnerId === p.id).length} progetti
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function MembersView() {
  const { store, openModal } = usePlatform();
  return (
    <>
      <Heading
        title="Member Club"
        subtitle="Professionisti e competenze approvate."
        actions={
          <button type="button" className={buttonClass()} onClick={() => openModal("member")}>
            <Icon name="plus" /> Nuovo Member
          </button>
        }
      />
      <div className={cn(panel, "p-[21px]")}>
        {store.members.map((m) => (
          <div key={m.id} className={infoRow}>
            <div>
              <b>{m.name}</b>
              <small className="block [font-size:smaller] text-platform-mid">
                {m.skills.join(" · ")} · {m.city}
              </small>
            </div>
            <span className={smallText}>
              {store.projects.filter((x) => x.memberId === m.id).length} incarichi
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
