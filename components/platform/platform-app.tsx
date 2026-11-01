"use client";

import { Landing } from "./landing";
import { Modal } from "./modals";
import { PlatformProvider, usePlatform } from "./platform-context";
import { Shell } from "./shell";
import {
  Documents,
  Home,
  MemberProfile,
  MembersView,
  PartnersView,
  ProjectDetail,
  ProjectList,
} from "./views";

const pages = {
  home: Home,
  projects: ProjectList,
  detail: ProjectDetail,
  documents: Documents,
  profile: MemberProfile,
  partners: PartnersView,
  members: MembersView,
};

function Screen() {
  const { ui, toast } = usePlatform();
  const Page = pages[ui.page] ?? ProjectList;
  return (
    <>
      {ui.role ? (
        <Shell>
          <Page />
        </Shell>
      ) : (
        <Landing />
      )}
      {ui.role && <Modal />}
      <div aria-live="polite">
        {toast && (
          <div className="fixed right-6 bottom-6 z-[2000] max-w-[min(400px,calc(100vw-30px))] rounded-lg bg-sg px-[18px] py-3 text-white shadow-[0_9px_30px_#0002]">
            {toast}
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Studio Galilei Platform (prototype): partner, member and consultant areas with projects,
 * roadmaps and reports. There is no backend yet — all data stays in this browser.
 */
export function PlatformApp() {
  return (
    // The prototype used Arial at 14px on browser defaults, not the site's Poppins typography.
    <div className="[font-family:Arial,'Helvetica_Neue',Helvetica,sans-serif] text-14 leading-normal text-platform-ink subpixel-antialiased [text-rendering:auto]">
      <PlatformProvider>
        <Screen />
      </PlatformProvider>
    </div>
  );
}
