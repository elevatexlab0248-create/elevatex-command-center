import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/team")({
  head: () => ({
    meta: [
      { title: "Team — ElevateX Founder OS" },
      { name: "description", content: "Team workspace inside ElevateX Founder OS." },
      { property: "og:title", content: "Team — ElevateX Founder OS" },
      { property: "og:description", content: "Team workspace inside ElevateX Founder OS." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Team" subtitle="Coming up next in the build." />
      <SectionCard title="Team">
        <EmptyState title="Not built yet" description="This module is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
