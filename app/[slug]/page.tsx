import { getCoachBySlug } from "@/content/coaches";
import { TemplateMinimal } from "@/components/templates/template-minimal";

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
    <main>
      <TemplateMinimal coach={coach} />
    </main>
  );
}
