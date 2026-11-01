"use client";

import { cn } from "@/lib/cn";
import { actor, roleName, type Page, type Role } from "./data";
import { usePlatform } from "./platform-context";
import { Brand, buttonBase, Icon, type IconName } from "./ui";

const menus: Record<Role, [Page, string, IconName][]> = {
  partner: [
    ["home", "Panoramica", "home"],
    ["projects", "Progetti", "folder"],
    ["documents", "Documenti", "document"],
  ],
  member: [
    ["projects", "I miei progetti", "folder"],
    ["documents", "Materiali", "document"],
    ["profile", "Profilo", "users"],
  ],
  consultant: [
    ["projects", "Progetti", "folder"],
    ["partners", "Partner", "building"],
    ["members", "Member Club", "users"],
  ],
};

/** Signed-in layout: sidebar (a top bar on phones), page header and content. */
export function Shell({ children }: { children: React.ReactNode }) {
  const { store, ui, goto, exit } = usePlatform();
  const role = ui.role!;
  const label = actor(store, ui)?.name || "Studio Galilei";

  return (
    <div className="grid min-h-screen grid-cols-[230px_minmax(0,1fr)] max-[721px]:block">
      <aside className="sticky top-0 flex h-screen flex-col gap-[33px] self-start border-r border-platform-line bg-white px-[13px] pt-[25px] pb-4 max-[721px]:relative max-[721px]:h-auto max-[721px]:max-h-none max-[721px]:gap-3.5 max-[721px]:border-r-0 max-[721px]:border-b max-[721px]:px-[15px] max-[721px]:py-3.5">
        <Brand
          className="pl-2.5 max-[721px]:text-16"
          markClassName="max-[721px]:h-8 max-[721px]:w-[29px]"
        />
        <div>
          <div className="mt-0 mr-0 mb-3 ml-[13px] text-11 font-bold tracking-[.04em] text-sg max-[721px]:hidden">
            {roleName(role)}
          </div>
          <nav className="grid gap-1.5 max-[721px]:flex max-[721px]:gap-[5px] max-[721px]:overflow-x-auto max-[721px]:pb-px">
            {menus[role].map(([page, name, icon]) => {
              const active = ui.page === page || (ui.page === "detail" && page === "projects");
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goto(page)}
                  className={cn(
                    buttonBase,
                    "flex w-full items-center gap-[11px] rounded-lg border-0 px-3 py-[11px] text-left font-semibold focus-visible:rounded-lg! max-[721px]:w-auto max-[721px]:px-3 max-[721px]:py-[9px] max-[721px]:text-12 max-[721px]:whitespace-nowrap",
                    "[&_svg]:size-[19px] max-[721px]:[&_svg]:size-[15px]",
                    active
                      ? "bg-sg text-white"
                      : "bg-transparent text-platform-ink hover:bg-[#eef0fc] hover:text-sg",
                  )}
                >
                  <Icon name={icon} />
                  {name}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto max-[721px]:absolute max-[721px]:top-2.5 max-[721px]:right-[13px] max-[721px]:max-w-[120px]">
          <div className="flex items-center gap-2.5 border-t border-platform-line px-[9px] py-3.5 max-[721px]:hidden">
            <span className="grid size-[35px] flex-none place-items-center rounded-full bg-sg text-13 font-bold text-white">
              {(label || "S").charAt(0)}
            </span>
            <span>
              <b className="block text-12">{label}</b>
              <small className="text-11 text-platform-mid">{roleName(role)}</small>
            </span>
          </div>
          <button
            type="button"
            onClick={exit}
            className={cn(
              buttonBase,
              "w-full rounded-lg border border-platform-line bg-white p-[9px] font-semibold text-platform-ink hover:border-sg focus-visible:rounded-lg! max-[721px]:p-[7px] max-[721px]:text-11",
            )}
          >
            Esci
          </button>
        </div>
      </aside>
      <main className="min-w-0">
        <header className="flex h-[79px] items-center justify-between gap-2.5 border-b border-platform-line px-[clamp(19px,3vw,45px)] max-[721px]:h-[52px] max-[721px]:px-[18px]">
          <div>
            <h2 className="m-0 text-15 font-bold">{roleName(role)}</h2>
            <small className="[font-size:smaller] text-platform-mid">Studio Galilei Platform</small>
          </div>
          <div className="text-12 font-bold text-sg">{label}</div>
        </header>
        <div className="mx-auto max-w-[1180px] px-[clamp(18px,3.1vw,45px)] pt-[33px] pb-[100px] max-[721px]:px-[17px] max-[721px]:pt-[23px] max-[721px]:pb-20">
          {children}
        </div>
      </main>
    </div>
  );
}
