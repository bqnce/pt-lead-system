import { getCoachBySlug } from "@/content/coaches";
import { TemplateMinimal } from "@/components/templates/template-minimal";

// 1. JAVÍTÁS: A params itt is Promise<{ slug: string }> típusú
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // 2. JAVÍTÁS: Meg kell várni (await) a params feloldását
  const { slug } = await params;
  
  const coach = getCoachBySlug(slug);
  if (!coach) return {};

  return {
    title: `${coach.brand.name} - ${coach.coach.title}`,
    description: coach.hero.subheadline,
    openGraph: {
      title: coach.brand.name,
      description: coach.hero.subheadline,
      // images: [coach.hero.heroImageUrl], // Ha van publikus URL
    },
  };
}

export default async function CoachPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const coach = getCoachBySlug(slug);

  if (!coach) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold">Nincs ilyen oldal</h1>
        <p className="mt-2 opacity-80">Slug: {slug}</p>
      </main>
    );
  }

  return (
    <main className="overflow-hidden">
      <TemplateMinimal coach={coach} />
    </main>
  );
}