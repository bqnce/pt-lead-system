export type CoachTemplate =
  | "minimal"
  | "premium"
  | "dark"
  | "energetic"
  | "classic";

export type CoachConfig = {
  slug: string;
  template: CoachTemplate;

  brand: {
    name: string;
    city?: string;
    avatarUrl?: string; // /public vagy remote
  };

  coach: {
    title?: string; // pl. "Személyi edző"
    bio: string; // 2-4 mondat
    badges: { label: string; value: string }[]; // 3 db (max 4)
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
    pricing?: {
      title?: string;
      subtitle?: string;
      currency?: string; // "Ft"
      plans: {
        id: string;
        name: string;
        priceText: string; // pl. "29 990 Ft/hó" vagy "Konzultáción"
        note?: string; // pl. "Legnépszerűbb"
        highlighted?: boolean; // kiemelt csomag
        features: string[];
        ctaText?: string; // pl. "Jelentkezem erre"
      }[];
      disclaimer?: string; // pl. "Árak tájékoztató jellegűek..."
    };
  };
};
