// The three service lines. Texts live in messages/<locale>/Service.json under the slug.
export const services = [
  { slug: "marketing", color: "#D21205", accent: "#FF7A6E" },
  { slug: "intelligenza-artificiale", color: "#0689FF", accent: "#5CB4FF" },
  { slug: "sviluppo-software", color: "#2F6B33", accent: "#7FC08A" },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export const isServiceSlug = (slug: string): slug is ServiceSlug =>
  services.some((s) => s.slug === slug);
