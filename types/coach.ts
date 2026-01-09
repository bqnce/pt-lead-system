export type CoachTemplate = "minimal" | "premium" | "dark" | "energetic" | "classic";

export type CoachConfig = {
  slug: string;
  template: CoachTemplate;

  brand: {
    name: string;
    city?: string;
    avatarUrl?: string; // /public vagy remote
  };

  hero: {
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    heroImageUrl?: string;
    badges?: string[];
  };

  contact: {
    emailTo: string; // ide menjen a lead email
    phone?: string;
    instagramUrl?: string;
  };

  sections: {
    forWho?: { items: string[]; notFor?: string[] };
    process?: { steps: { title: string; desc: string }[] };
    faq?: { q: string; a: string }[];
  };
};
