// app/data/site.ts

export type SocialKind = "instagram" | "facebook" | "tiktok" | "youtube";

export const CONTACT = {
  phoneDisplay: "+381 64 123 4567",
  phoneHref: "tel:+381641234567",
  email: "info@iluzionarijum.rs",
};

export const SOCIAL_LINKS: Array<{ kind: SocialKind; href: string }> = [
  { kind: "instagram", href: "https://instagram.com/" },
  { kind: "facebook",  href: "https://facebook.com/" },
  { kind: "tiktok",    href: "https://tiktok.com/" },
  { kind: "youtube",   href: "https://youtube.com/" },
];

export const HOURS = {
  weekdays: { open: "10:00", close: "20:00" }, // Poned–Petak / Mon–Fri
  weekends: { open: "10:00", close: "21:00" }, // Sub–Ned / Sat–Sun
  lastEntryMinutesBeforeClose: 45,
};

export const LOCATION = {
  name: "Iluzionarijum Zlatibor",
  addressLines: ["Miladina Pećinara bb", "31315 Zlatibor, Srbija"],
  // Google Maps “search” url (možeš da zameniš koordinatama ako želiš)
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Iluzionarijum+Zlatibor,+Miladina+Pećinara+bb,+31315+Zlatibor,+Srbija",
};
