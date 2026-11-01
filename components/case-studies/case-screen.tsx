import { useTranslations } from "next-intl";
import { ScreenFrame } from "./screen-frame";
import { screens } from "./screens";

export type ScreenName = keyof typeof screens;

/** A scaled mock-up of one screen of the tour operator app, with its accessible description. */
export function CaseScreen({ screen }: { screen: ScreenName }) {
  const t = useTranslations("CaseStudies.screens.label");
  const Screen = screens[screen];
  return (
    <ScreenFrame label={t(screen)}>
      <Screen />
    </ScreenFrame>
  );
}
