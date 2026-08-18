import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/notes")({
  head: () => ({
    meta: [
      { title: "Notes — ElevateX Founder OS" },
      { name: "description", content: "Notes workspace inside ElevateX Founder OS." },
      { property: "og:title", content: "Notes — ElevateX Founder OS" },
      { property: "og:description", content: "Notes workspace inside ElevateX Founder OS." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Notes" subtitle="Coming up next in the build." />
      <SectionCard title="Notes">
        <EmptyState title="Not built yet" description="This module is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
