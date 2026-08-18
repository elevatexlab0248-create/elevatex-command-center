import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, EmptyState } from "@/components/app/primitives";

export const Route = createFileRoute("/_authenticated/content/")({
  head: () => ({
    meta: [
      { title: "Content — ElevateX Founder OS" },
      { name: "description", content: "Content pipeline for social posts, scripts and campaigns." },
      { property: "og:title", content: "Content — ElevateX Founder OS" },
      { property: "og:description", content: "Content pipeline for social posts, scripts and campaigns." },
    ],
  }),
  component: ContentPage,
});

function ContentPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Content" subtitle="Draft, submit and schedule content." />
      <SectionCard title="Content pipeline">
        <EmptyState title="Not built yet" description="The content pipeline is scheduled for the next phase of the build." />
      </SectionCard>
    </div>
  );
}
