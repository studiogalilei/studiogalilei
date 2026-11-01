"use client";

import { cn } from "@/lib/cn";
import { usePlatform } from "./platform-context";
import { Brand, buttonBase, Icon, type IconName } from "./ui";

const title =
  "mx-0 mt-0 mb-[13px] text-[clamp(33px,4vw,51px)] leading-[1.14] font-bold tracking-[-1.3px]";
const intro = "mt-0 mb-[33px] text-16 text-[#e0e6ff]";

function AreaChoice({
  icon,
  label,
  text,
  onClick,
}: {
  icon: IconName;
  label: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        buttonBase,
        "flex min-h-[185px] flex-col items-start rounded-xl border-2 border-white bg-white px-6 pt-6 pb-[22px] text-left text-platform-ink hover:border-[#7fa5ff] focus-visible:rounded-xl! max-[721px]:min-h-[160px]",
      )}
    >
      <Icon name={icon} className="mb-6 size-[31px] text-sg" />
      <b className="text-[21px] tracking-[-.3px]">{label}</b>
      <span className="mt-1 text-13 text-platform-mid">{text}</span>
      <strong className="mt-[15px] ml-auto text-sg">Accedi →</strong>
    </button>
  );
}

/** Access screen: pick an area, then the profile to enter with. */
export function Landing() {
  const { store, ui, chooseRole, enter } = usePlatform();
  const profiles =
    ui.step === "partner"
      ? store.partners
      : ui.step === "member"
        ? store.members
        : [{ id: "sg", name: "Studio Galilei" }];

  return (
    <div className="flex min-h-screen flex-col bg-sg px-[clamp(20px,5vw,60px)] py-[35px] text-white max-[721px]:px-[17px] max-[721px]:py-[23px]">
      <div>
        <Brand inverse className="text-[20px]" />
      </div>
      <div className="m-auto w-[min(760px,100%)] py-[70px] text-center max-[721px]:py-[45px]">
        {ui.step === "landing" ? (
          <>
            <h1 className={title}>Un unico spazio per lavorare insieme.</h1>
            <p className={intro}>Accedi alla tua area Studio Galilei.</p>
            <div className="grid grid-cols-2 gap-4 text-left max-[721px]:grid-cols-1">
              <AreaChoice
                icon="building"
                label="Area Partner"
                text="La tua azienda, i tuoi progetti."
                onClick={() => chooseRole("partner")}
              />
              <AreaChoice
                icon="users"
                label="Area Member"
                text="I tuoi incarichi, il tuo lavoro."
                onClick={() => chooseRole("member")}
              />
            </div>
            <button
              type="button"
              onClick={() => chooseRole("consultant")}
              className={cn(
                buttonBase,
                "mt-6 inline-block border-0 bg-transparent p-2.5 text-13 text-white underline underline-offset-[5px] focus-visible:rounded-none!",
              )}
            >
              Accedi come consulente
            </button>
          </>
        ) : (
          <div className="m-auto max-w-[480px]">
            <h1 className={title}>
              {ui.step === "partner"
                ? "Area Partner"
                : ui.step === "member"
                  ? "Area Member"
                  : "Area Consulente"}
            </h1>
            <p className={intro}>Seleziona il profilo per entrare.</p>
            <div className="grid gap-[9px] text-left">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => enter(profile.id)}
                  className={cn(
                    buttonBase,
                    "flex items-center justify-between gap-3.5 rounded-[9px] border border-[#ffffff55] bg-[#ffffff12] px-[19px] py-[17px] text-left text-white hover:bg-[#ffffff25] focus-visible:rounded-[9px]!",
                  )}
                >
                  <span>
                    <b>{profile.name}</b>
                    {"city" in profile && profile.city && (
                      <small className="mt-[3px] block [font-size:smaller] text-[#dfe5ff]">
                        {profile.city}
                      </small>
                    )}
                  </span>
                  <span>→</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => chooseRole("landing")}
              className={cn(
                buttonBase,
                "mt-[25px] inline-flex items-center gap-1.5 border-0 bg-none px-1.5 py-px text-white underline underline-offset-4 focus-visible:rounded-none!",
              )}
            >
              Torna agli accessi
            </button>
          </div>
        )}
      </div>
      <div className="text-12 text-[#e1e6ff]">Studio Galilei</div>
    </div>
  );
}
