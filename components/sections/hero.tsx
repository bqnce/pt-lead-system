import Image from "next/image";
import { Section } from "@/components/layout/section";
import { CoachConfig } from "@/types/coach";

export function Hero({ coach }: { coach: CoachConfig }) {
  return (
    <Section id="top">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm opacity-70">
            {coach.brand.name}{coach.brand.city ? ` • ${coach.brand.city}` : ""}
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
            {coach.hero.headline}
          </h1>

          <p className="mt-4 text-base opacity-80">
            {coach.hero.subheadline}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white"
            >
              {coach.hero.primaryCtaText}
            </a>

            {coach.contact.instagramUrl ? (
              <a
                href={coach.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border px-5 py-3"
              >
                Instagram
              </a>
            ) : null}
          </div>

          {coach.hero.badges?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {coach.hero.badges.map((b) => (
                <span key={b} className="rounded-full border px-3 py-1 text-sm">
                  {b}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border">
          <Image
            src={coach.hero.heroImageUrl ?? "/next.svg"}
            alt={`${coach.brand.name} hero`}
            fill
            className="object-contain p-8"
            priority
          />
        </div>
      </div>
    </Section>
  );
}
