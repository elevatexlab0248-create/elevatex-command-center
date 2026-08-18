# Phase 2 + 3 — Functional Activation & Automation Engine

Goal: every Founder tab becomes a real, database-connected workspace, then a rule-based automation layer makes the system proactive. Existing V1 design (sidebar, tokens, cards, typography) stays exactly as it is — only new functional components get added inside it. Phase 4 (Gemini) comes after this, using your own `GEMINI_API_KEY`.

## Delivery order

The work ships in five batches, each ending in a working app.

**Batch 1 — Data plumbing and shared building blocks**
- Extend the data layer with the missing hooks: content schedule, lead activities, automation log, follow-up queries, aggregate "today" counters.
- Shared functional primitives reusing current styles: data table shell (search + filter + sort + pagination, collapsing to cards on mobile), record drawer/dialog form wrapper, delete confirmation dialog, loading skeletons, error state, stage progression bar.
- One central `activity` + `notification` writer so every mutation logs consistently and never duplicates.

**Batch 2 — Leads, Lead Workspace, Pipeline, Demos, Outreach, Follow-ups**
- Leads: full CRUD, search, filters (stage, priority, assignee, source), sort, tags, assignment, delete confirmation, toasts.
- Lead workspace at `/leads/$leadId`: stage progression header with next-stage action, tabs for Overview, Research, Demo, Outreach, Follow-ups, Notes, Activity — all editable, all writing activity logs.
- Pipeline: dnd-kit Kanban across all 12 stages; drop updates the lead, logs activity, refreshes counters, toasts. Mobile falls back to a stage picker on each card.
- Demos: tracker table with URLs (open/copy), checklist toggles, status updates.
- Outreach: CRM table with channel/status, message, contact timestamps, reply and meeting recording, outcome.
- Follow-ups: #1/#2/#3 scheduling, due-today queue with complete / reschedule / skip, notification on due.

**Batch 3 — Tasks, Timer, Content, Calendar, Notes, Team, Activity, Settings**
- Tasks: CRUD, subtasks, recurrence, lead linking, assignment to co-founder, views (All / Today / Upcoming / Overdue / Completed) and filters.
- Timer: start / pause / resume / stop persisted in `task_time_entries`, restored after refresh; today / week / total rollups.
- Content: approval center with dynamic counts, "Needs your review" queue, approve / reject / request changes / feedback / schedule, each writing feedback + activity + co-founder notification.
- Calendar: month / week / day views over tasks, follow-ups, meetings, content schedules; create events; clicking an event opens its record.
- Notes: CRUD, pin, tag, search, linking to lead/task/content.
- Team: founder + co-founder cards with live task/content/activity stats, drill-in summary, assign-task action.
- Activity: filterable audit feed (user, action, object, date range).
- Settings: profile, daily targets, notification preferences, plus the Phase 3 automation settings.
- Notifications and global search wired to real data with grouped results and navigation.

**Batch 4 — Analytics + Overview accuracy**
- Analytics from live queries: lead counts by period, funnel with conversion percentages, productivity rollups, time analysis (avg per lead/demo/outreach/task), 7/30-day trends, date filters, recharts visuals.
- Overview: every KPI and the Today's Mission progress computed from records vs. the day's targets — nothing hardcoded.

**Batch 5 — Phase 3 automation engine**
- Next-action resolver: given lead stage, demo/outreach state, due follow-ups, overdue work and daily targets, compute the single next best action with reasons and action buttons.
- Auto task generation on stage/demo transitions, guarded by an idempotency check so equivalent open tasks are never duplicated.
- Lead checklist derived from actual records (demo deployed ⇒ demo + deployment ticked).
- Follow-up scheduling on outreach sent, using configurable +3 / +7 / +14 intervals, skipped when replied or closed.
- Overdue detection, stagnation detection (configurable day threshold), bottleneck rules (stuck at stage, deployed-but-not-contacted).
- Command Center on Overview: Urgent / Due today / Next action / Waiting for approval / Completed — every row clickable.
- Morning brief, editable daily planner, end-of-day review with founder note, weekly review with week-over-week deltas and rule-based insights.
- Transparent productivity score with a visible breakdown of what added and subtracted.
- Automation log recording trigger, action, result; failures surface a retry instead of breaking the page.

## Technical notes

- Database additions in one migration: `automation_log`, `automation_settings` (per-user follow-up intervals, stagnation days, targets, notification toggles), `content_schedule` usage, plus indexes on the hot filter columns. Each new public table gets GRANTs, RLS, and founder/owner policies matching existing patterns.
- All reads stay in `src/lib/data.ts` as TanStack Query hooks; mutations invalidate the related keys so counters update without manual refresh. Realtime is left out for now — invalidation plus focus refetch is enough and keeps the dashboard fast.
- Automation runs client-side inside the existing mutation flow (event-driven, no polling loops), with a shared guard function that checks for an equivalent active record before creating anything.
- Adds `@dnd-kit/core` and `@dnd-kit/sortable` for the Kanban; everything else uses installed packages (recharts, date-fns, zod, existing shadcn set).
- Pagination and column-scoped queries on the large tables; no page loads the full dataset.
- No design-system changes: no new colors, fonts, or sidebar restructuring.

## Not in this plan

Gemini AI features, social-media APIs, automatic sending or publishing. Phase 4 follows once this is approved and shipped; I'll request `GEMINI_API_KEY` at the start of that phase.
