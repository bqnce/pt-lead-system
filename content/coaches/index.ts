import { demoCoach } from "./demo";
import { CoachConfig } from "@/types/coach";

const COACHES: CoachConfig[] = [demoCoach];

export function getCoachBySlug(slug: string): CoachConfig | undefined {
  return COACHES.find((c) => c.slug === slug);
}
