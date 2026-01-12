import React from "react";
import { Container } from "@/components/ui/container";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 ${className ? className : ""}`}>
      <Container>{children}</Container>
    </section>
  );
}
