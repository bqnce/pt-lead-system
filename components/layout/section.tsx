import React from "react";
import { Container } from "@/components/ui/container";

export function Section({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14">
      <Container>{children}</Container>
    </section>
  );
}
