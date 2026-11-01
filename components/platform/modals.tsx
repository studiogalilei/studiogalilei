"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  actor,
  currentProject,
  makeId,
  memberOf,
  timestamp,
  type Member,
  type Project,
  type Roadmap,
  type Step,
} from "./data";
import { putFile } from "./files";
import { usePlatform } from "./platform-context";
import { buttonBase, buttonClass, focusRing, Icon, smallText } from "./ui";

const fieldGroup = "mb-[17px]";
const label = "mb-[7px] block text-12 font-bold";
const field = cn(
  "min-h-[41px] w-full rounded-[7px] border border-[#bfc7da] bg-white px-3 py-2.5 text-14 leading-normal font-normal text-platform-ink file:[all:revert] placeholder:text-[#757575] focus:border-sg focus-visible:rounded-[7px]!",
  // date inputs: undo preflight's datetime resets (they make the field 2px shorter)
  "[&::-webkit-date-and-time-value]:[all:revert] [&::-webkit-datetime-edit]:[all:revert] [&::-webkit-datetime-edit-day-field]:[all:revert] [&::-webkit-datetime-edit-fields-wrapper]:[all:revert] [&::-webkit-datetime-edit-month-field]:[all:revert] [&::-webkit-datetime-edit-year-field]:[all:revert]",
  focusRing,
);
const note = "mb-4 border-l-[3px] border-l-sg bg-[#f5f7ff] px-[13px] py-[11px] text-12";
const footButton = "max-[721px]:flex-1";

function Field({
  label: text,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div className={fieldGroup}>
      <label htmlFor={name} className={label}>
        {text}
      </label>
      <input
        className={field}
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
}

function Select({
  label: text,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { id: string; name: string }[];
  defaultValue?: string;
}) {
  return (
    <div className={fieldGroup}>
      <label htmlFor={name} className={label}>
        {text}
      </label>
      <select className={field} name={name} id={name} defaultValue={defaultValue}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function Foot({ submit }: { submit: React.ReactNode }) {
  const { closeModal } = usePlatform();
  return (
    <div className="mt-2.5 flex justify-end gap-2 border-t border-platform-line pt-[17px] max-[721px]:flex-wrap">
      <button type="button" className={cn(buttonClass("neutral"), footButton)} onClick={closeModal}>
        Annulla
      </button>
      {submit}
    </div>
  );
}

function RoadmapForm({
  project,
  onSubmit,
}: {
  project: Project;
  onSubmit: (road: Roadmap, send: boolean) => void;
}) {
  const { store, flash } = usePlatform();
  const member = memberOf(store, project);
  const [draft] = useState<Roadmap>(
    () =>
      project.draft ||
      project.roadmap || {
        service: member?.skills?.[0] || "",
        deadline: project.deadline,
        steps: [
          { id: makeId("step"), title: "", due: project.deadline, note: "" },
          { id: makeId("step"), title: "", due: project.deadline, note: "" },
        ],
        current: 0,
        sentAt: null,
      },
  );
  const [steps, setSteps] = useState<Step[]>(draft.steps);

  function collect(form: HTMLFormElement): Roadmap {
    const service = (form.elements.namedItem("service") as HTMLSelectElement).value;
    const deadline = (form.elements.namedItem("deadline") as HTMLInputElement).value;
    if (!member || !member.skills.includes(service))
      throw Error("Seleziona un servizio tra le competenze del Member.");
    if (!deadline) throw Error("Indica la scadenza finale.");
    const rows = Array.from(form.querySelectorAll<HTMLElement>("[data-step-id]"));
    if (!rows.length) throw Error("Inserisci almeno una fase.");
    const value = (row: HTMLElement, name: string) =>
      (row.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement).value;
    const collected = rows.map((row) => ({
      id: row.dataset.stepId!,
      title: value(row, "step-title").trim(),
      due: value(row, "step-due"),
      note: value(row, "step-note").trim(),
    }));
    if (collected.some((s) => !s.title || !s.due))
      throw Error("Completa nome e scadenza di ogni fase.");
    if (collected.some((s) => s.due > deadline))
      throw Error("La scadenza di una fase non può superare la deadline finale.");
    if (collected.some((s, i) => i > 0 && s.due < collected[i - 1].due))
      throw Error("Le scadenze delle fasi devono essere in ordine cronologico.");
    return {
      service,
      deadline,
      steps: collected,
      current: Math.min(project.roadmap?.current || 0, collected.length),
      sentAt: project.roadmap?.sentAt || null,
    };
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const send =
          ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === "send";
        try {
          onSubmit(collect(e.currentTarget), send);
        } catch (error) {
          flash((error as Error).message || "Operazione non riuscita.");
        }
      }}
    >
      <div className={note}>
        Seleziona il servizio che eroghi, definisci le fasi e invia la roadmap. Il Partner vedrà
        sempre la fase attuale e la deadline.
      </div>
      <Select
        label="Servizio da erogare"
        name="service"
        options={(member?.skills || []).map((s) => ({ id: s, name: s }))}
        defaultValue={draft.service}
      />
      <Field
        label="Scadenza finale"
        name="deadline"
        type="date"
        defaultValue={draft.deadline}
        required
      />
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="m-0 text-17 font-bold tracking-[-.2px]">Touchpoint</h2>
        <button
          type="button"
          className={buttonClass("outline", true)}
          onClick={() =>
            steps.length >= 15
              ? flash("Massimo 15 fasi per roadmap.")
              : setSteps([
                  ...steps,
                  { id: makeId("step"), title: "", due: project.deadline || "", note: "" },
                ])
          }
        >
          <Icon name="plus" /> Aggiungi fase
        </button>
      </div>
      <div>
        {steps.map((step, i) => (
          <div
            key={step.id}
            data-step-id={step.id}
            className="mb-[11px] rounded-[9px] border border-platform-line p-3.5"
          >
            <div className="mb-3 flex items-center justify-between">
              <b className="text-13">Fase {i + 1}</b>
              <button
                type="button"
                className={cn(
                  buttonBase,
                  "border-0 bg-transparent px-1.5 py-px text-12 text-platform-danger",
                )}
                onClick={() =>
                  steps.length <= 1
                    ? flash("La roadmap deve contenere almeno una fase.")
                    : setSteps(steps.filter((s) => s.id !== step.id))
                }
              >
                Rimuovi
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 max-[721px]:grid-cols-1">
              <div className={fieldGroup}>
                <label className={label}>Nome fase</label>
                <input
                  className={field}
                  name="step-title"
                  defaultValue={step.title}
                  required
                  placeholder="Es. Attivazione campagne"
                />
              </div>
              <div className={fieldGroup}>
                <label className={label}>Scadenza fase</label>
                <input
                  className={field}
                  type="date"
                  name="step-due"
                  defaultValue={step.due || ""}
                  required
                />
              </div>
            </div>
            <div className={cn(fieldGroup, "mb-0")}>
              <label className={label}>Nota (facoltativa)</label>
              <textarea
                name="step-note"
                className={cn(field, "min-h-[65px] resize-y")}
                defaultValue={step.note || ""}
                placeholder="Cosa succede in questa fase"
              />
            </div>
          </div>
        ))}
      </div>
      <Foot
        submit={
          <>
            <button
              className={cn(buttonClass("outline"), footButton)}
              type="submit"
              name="intent"
              value="draft"
            >
              Salva bozza
            </button>
            <button
              className={cn(buttonClass(), footButton)}
              type="submit"
              name="intent"
              value="send"
            >
              Invia al Partner
            </button>
          </>
        }
      />
    </form>
  );
}

const titles = {
  roadmap: "Roadmap del progetto",
  report: "Pubblica report",
  project: "Nuovo progetto",
  partner: "Nuovo Partner",
  member: "Nuovo Member",
  profile: "Modifica profilo",
};

/** The open dialog, if any, over a dimmed page. */
export function Modal() {
  const { store, ui, commit, flash, closeModal, openProject } = usePlatform();
  const type = ui.modal;
  const project = currentProject(store, ui);
  if (!type || ((type === "roadmap" || type === "report") && !project)) return null;

  // Runs a submit handler with the prototype's error reporting.
  const handle =
    (run: (data: FormData) => Promise<void> | void) =>
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await run(new FormData(e.currentTarget));
      } catch (error) {
        flash((error as Error).message || "Operazione non riuscita.");
      }
    };
  const text = (data: FormData, name: string) => String(data.get(name) || "").trim();

  let body: React.ReactNode = null;
  if (type === "roadmap") {
    body = (
      <RoadmapForm
        project={project!}
        onSubmit={(road, send) => {
          commit((draft) => {
            const p = draft.projects.find((x) => x.id === project!.id)!;
            if (send) {
              road.sentAt = timestamp();
              p.roadmap = road;
              p.draft = null;
              p.service = road.service;
              p.deadline = road.deadline;
            } else p.draft = road;
          });
          closeModal();
          flash(send ? "Roadmap inviata al Partner." : "Bozza della roadmap salvata.");
        }}
      />
    );
  } else if (type === "report") {
    body = (
      <form
        onSubmit={handle(async (data) => {
          const title = text(data, "title");
          const reportBody = text(data, "body");
          const file = data.get("file") as File | null;
          if (!title || (!reportBody && (!file || !file.size)))
            throw Error("Inserisci un aggiornamento oppure allega un documento.");
          let fileId: string | null = null;
          let fileName: string | null = null;
          if (file && file.size) {
            if (file.size > 15 * 1024 * 1024) throw Error("File troppo grande. Massimo 15 MB.");
            fileId = makeId("file");
            fileName = file.name;
            await putFile(fileId, file);
          }
          commit((draft) =>
            draft.reports.unshift({
              id: makeId("report"),
              projectId: project!.id,
              title,
              body: reportBody,
              at: timestamp(),
              fileId,
              fileName,
              author: actor(store, ui)?.name || "Member",
            }),
          );
          closeModal();
          flash("Report pubblicato e visibile al Partner.");
        })}
      >
        <Field label="Titolo" name="title" required />
        <div className={fieldGroup}>
          <label htmlFor="body" className={label}>
            Aggiornamento
          </label>
          <textarea
            id="body"
            name="body"
            className={cn(field, "min-h-[104px] resize-y")}
            placeholder="Descrivi ciò che è stato fatto o i risultati da condividere..."
          />
        </div>
        <div className={fieldGroup}>
          <label htmlFor="file" className={label}>
            Allegato (facoltativo)
          </label>
          <input
            className={field}
            type="file"
            id="file"
            name="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xlsx,.csv,.txt"
          />
          <p className="mx-0 mt-[5px] mb-0 text-12 text-platform-mid">
            Massimo 15 MB. Il file sarà visibile al Partner.
          </p>
        </div>
        <Foot
          submit={
            <button type="submit" className={cn(buttonClass(), footButton)}>
              Pubblica
            </button>
          }
        />
      </form>
    );
  } else if (type === "project") {
    body = (
      <form
        onSubmit={handle((data) => {
          const title = text(data, "title");
          const deadline = String(data.get("deadline") || "");
          const partnerId = String(data.get("partner") || "");
          const memberId = String(data.get("member") || "");
          if (
            !title ||
            !deadline ||
            !store.partners.some((p) => p.id === partnerId) ||
            !store.members.some((m) => m.id === memberId)
          )
            throw Error("Compila tutti i campi.");
          const id = makeId("project");
          const next = commit((draft) =>
            draft.projects.unshift({
              id,
              title,
              partnerId,
              memberId,
              deadline,
              service: "",
              roadmap: null,
              draft: null,
              createdAt: timestamp(),
            }),
          );
          openProject(id, next);
          flash("Progetto creato. Il Member può preparare la roadmap.");
        })}
      >
        <Field label="Nome del progetto" name="title" required />
        <Select label="Partner" name="partner" options={store.partners} />
        <Select label="Member incaricato" name="member" options={store.members} />
        <Field label="Deadline del progetto" name="deadline" type="date" required />
        <p className={cn(note, "mt-[1em]")}>
          Il Member selezionerà il servizio tra le proprie competenze e preparerà la roadmap da
          inviare al Partner.
        </p>
        <Foot
          submit={
            <button type="submit" className={cn(buttonClass(), footButton)}>
              Crea progetto
            </button>
          }
        />
      </form>
    );
  } else if (type === "partner") {
    body = (
      <form
        onSubmit={handle((data) => {
          const name = text(data, "name");
          if (!name) throw Error("Inserisci la ragione sociale.");
          commit((draft) =>
            draft.partners.push({
              id: makeId("partner"),
              name,
              website: String(data.get("website") || ""),
            }),
          );
          closeModal();
          flash("Partner aggiunto.");
        })}
      >
        <Field label="Ragione sociale" name="name" required />
        <Field label="Sito web" name="website" type="url" />
        <Foot
          submit={
            <button type="submit" className={cn(buttonClass(), footButton)}>
              Aggiungi Partner
            </button>
          }
        />
      </form>
    );
  } else if (type === "member") {
    body = (
      <form
        onSubmit={handle((data) => {
          const name = text(data, "name");
          const city = text(data, "city");
          const skills = [
            ...new Set(
              String(data.get("skills") || "")
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            ),
          ];
          if (!name || !city || !skills.length)
            throw Error("Inserisci nome, città e almeno una competenza.");
          commit((draft) =>
            draft.members.push({ id: makeId("member"), name, city, skills, bio: "" }),
          );
          closeModal();
          flash("Member aggiunto.");
        })}
      >
        <Field label="Nome e cognome" name="name" required />
        <Field label="Città" name="city" required />
        <Field label="Competenze approvate (separate da virgola)" name="skills" required />
        <p className={cn(smallText, "my-[1em]")}>
          Le competenze determinano quali servizi il Member potrà selezionare nelle roadmap.
        </p>
        <Foot
          submit={
            <button type="submit" className={cn(buttonClass(), footButton)}>
              Aggiungi Member
            </button>
          }
        />
      </form>
    );
  } else {
    body = (
      <form
        onSubmit={handle((data) => {
          commit((draft) => {
            const me = draft.members.find((m) => m.id === ui.id);
            if (me) me.bio = text(data, "bio");
          });
          closeModal();
          flash("Profilo salvato.");
        })}
      >
        <div className={fieldGroup}>
          <label htmlFor="bio" className={label}>
            Presentazione professionale
          </label>
          <textarea
            className={cn(field, "min-h-[104px] resize-y")}
            id="bio"
            name="bio"
            required
            defaultValue={(actor(store, ui) as Member).bio}
          />
        </div>
        <Foot
          submit={
            <button type="submit" className={cn(buttonClass(), footButton)}>
              Salva
            </button>
          }
        />
      </form>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(3,11,43,.55)] p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titles[type]}
        className="max-h-[calc(100vh-32px)] w-[min(720px,100%)] overflow-auto rounded-xl bg-white p-[23px] max-[721px]:p-[17px]"
      >
        <div className="mb-5 flex items-center justify-between gap-[15px] border-b border-platform-line pb-[15px]">
          <h2 className="m-0 text-[20px] font-bold">{titles[type]}</h2>
          <button
            type="button"
            aria-label="Chiudi"
            onClick={closeModal}
            className={cn(
              buttonBase,
              "border-0 bg-white px-1.5 py-px text-[25px] leading-none text-platform-ink focus-visible:rounded-none!",
            )}
          >
            ×
          </button>
        </div>
        {body}
      </div>
    </div>
  );
}
