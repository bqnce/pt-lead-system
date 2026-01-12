export type CoachTemplate =
  | "minimal"
  | "premium"
  | "dark"
  | "energetic"
  | "classic";

export type CoachNavItem = {
  id: string; // pl. "process" (anchor id)
  label: string; // pl. "Folyamat"
  show?: boolean; // opcionális: gyors ki/be
};

export type Testimonial = {
  name: string;
  meta?: string;
  text: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

export type CoachSocials = {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  email?: string;
};

export type CoachFooter = {
  brandLine?: string;

  socials?: CoachSocials;

  legal?: {
    imprintUrl?: string;
    privacyUrl?: string;
    termsUrl?: string;
  };
};


export type CoachConfig = {
  slug: string;
  template: CoachTemplate;

  brand: {
    name: string;
    city?: string;
    avatarUrl?: string; // /public vagy remote
  };

  nav?: {
    items: CoachNavItem[];
    cta?: {
      label: string; // pl. "Jelentkezem"
      href: string; // pl. "#apply"
    };
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
    testimonials?: {
      title?: string;
      subtitle?: string;
      items: Testimonial[];
    };
  };
  footer?: CoachFooter;
};
