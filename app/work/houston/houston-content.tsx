"use client";

import Image from "next/image";
import {
  CaseContact,
  CaseDesignLanguage,
  CaseEm,
  CaseEvidence,
  CaseFeature,
  CaseFeatures,
  CaseHero,
  CaseLayout,
  CaseResults,
  CaseShowcase,
  CaseStory,
} from "@/components/case-study/case-layout";
import { HoustonApp, HoustonScreen } from "@/components/houston-demo/houston-frame";
import { geologica } from "@/components/houston-demo/geologica";

const ACCENT = "#1555AD";
const ACCENT_INK = "#1a365d";
const ACCENT_TINT = "#EDF4FF";

const results = [
  {
    value: "0 → 1",
    label: "Internal tool rebuilt into a production-grade platform",
  },
  {
    value: "2,000+",
    label: "Doctors registered and managed through the platform",
  },
  {
    value: "8",
    label: "Core modules covering the full lifecycle of a medical shift",
  },
  {
    value: "36",
    label: "Granular permissions across 4 roles in the multi-tenant access model",
  },
];

const approach = [
  {
    number: "01",
    title: "Operational clarity first",
    text: "One vocabulary across scheduling, applications, attendance and payments — operators never relearn the interface.",
  },
  {
    number: "02",
    title: "Rules live in the database",
    text: "Core business rules enforced at the PostgreSQL level, with a managed migration lifecycle.",
  },
  {
    number: "03",
    title: "Multi-tenant by structure",
    text: "Permissions enforced in the frontend and revalidated on the backend — never one without the other.",
  },
  {
    number: "04",
    title: "A team, not a hero",
    text: "Standards, reviews and CI/CD let a team of three ship fast as complexity grew.",
  },
];

const RECREATION_CAPTION = "Interactive recreation — fictional data";

const features: CaseFeature[] = [
  {
    number: "01",
    title: "Operational Dashboard",
    text: "A real-time overview of open and filled shifts, pending applications, operational risk, and payroll totals, with global month-based filtering.",
    media: <HoustonScreen screen="painel" />,
    caption: RECREATION_CAPTION,
  },
  {
    number: "02",
    title: "Schedule Builder",
    text: "An interactive grid-based interface for creating and managing medical schedules. Supports drag and drop creation, resizing, duplication, conflict detection, and batch publishing of shifts.",
    media: (
      <div className="relative">
        <Image
          quality={90}
          src="/img/houston/schedule.png"
          alt="Schedule Builder"
          width={1920}
          height={1215}
          className="w-full rounded-lg"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          width={757}
          height={321}
          aria-label="Schedule Builder animation showing drag and drop shift creation"
          className="absolute w-[60%] h-auto motion-reduce:hidden"
          style={{
            borderRadius: "clamp(4px, 1vw, 10px)",
            borderWidth: "clamp(0.5px, 0.2vw, 2px)",
            borderStyle: "solid",
            borderColor: "rgba(163, 105, 237, 1)",
            right: "0",
            bottom: "clamp(40px, 60%, 80px)",
          }}
        >
          <source src="/img/houston/schedule.webm" type="video/webm" />
          <source src="/img/houston/schedule.mp4" type="video/mp4" />
        </video>
      </div>
    ),
  },
  {
    number: "03",
    title: "Shift Calendar",
    text: "Custom calendar views for weekly, monthly, and daily management, with quick actions, candidate assignment, and status tracking.",
    media: <HoustonScreen screen="escala" />,
    caption: RECREATION_CAPTION,
  },
  {
    number: "04",
    title: "Job & Application Management",
    text: "Centralized management of job postings and applications with bulk actions, recurrence handling, and conflict validation.",
    media: <HoustonScreen screen="vagas" />,
    caption: RECREATION_CAPTION,
  },
  {
    number: "05",
    title: "Attendance & Payments",
    text: "Integrated check-in and check-out control with approval flows, payment authorization, and batch operations for large volumes of shifts.",
    media: <HoustonScreen screen="pagamentos" />,
    caption: RECREATION_CAPTION,
  },
  {
    number: "06",
    title: "Reports & Insights",
    text: "Operational and financial reports covering payroll, productivity, schedules, and exports, with unified filtering across the platform.",
    media: <HoustonScreen screen="relatorios" />,
    caption: RECREATION_CAPTION,
  },
  {
    number: "07",
    title: "Doctors & Teams",
    text: "Management of medical staff, teams, favorites, and pre-registered doctors, enabling faster assignments and better organization.",
    layout: "split",
    media: (
      <div className="rounded-lg overflow-hidden">
        <Image
          quality={90}
          src="/img/houston/teams.png"
          alt="Doctors & Teams"
          width={653}
          height={493}
          className="w-full"
        />
      </div>
    ),
  },
  {
    number: "08",
    title: "Access Control & Permissions",
    text: "Role-based access control governs permissions across schedules, applications, attendance, and payments — a requirement that became core as Houston turned multi-tenant.",
    secondaryText:
      "Permissions are enforced consistently across frontend flows and backend validation, supporting multiple organizations and roles while keeping daily operations simple.",
    layout: "split",
    media: (
      <div className="rounded-lg overflow-hidden">
        <Image
          quality={90}
          src="/img/houston/access-control.png"
          alt="Access Control & Permissions"
          width={480}
          height={638}
          className="w-full"
        />
      </div>
    ),
  },
];

export function HoustonContent() {
  return (
    <CaseLayout
      accent={ACCENT}
      accentInk={ACCENT_INK}
      accentTint={ACCENT_TINT}
      nextProject={{ href: "/work/revoluna", label: "Revoluna" }}
    >
      <CaseHero
        chips={["2024 — ongoing", "Health operations", "SaaS platform"]}
        headline={
          <>
            Houston: from internal tool to the{" "}
            <CaseEm>platform running medical shifts</CaseEm> at scale.
          </>
        }
        subtitle="The web platform hospitals and staffing teams use to plan schedules, approve candidates, control attendance and handle payments — in one place."
        roleTags={["Front-end", "Back-end", "Product", "Architecture", "Engineering"]}
      >
        <CaseShowcase
          label="Live recreation — explore it"
          note="Rebuilt in React for this case study · Brazilian product, UI in Portuguese · fictional data"
          caption="Use the sidebar to move between modules — dashboard, schedule, jobs, payments and reports are fully navigable."
        >
          <HoustonApp initialScreen="painel" />
        </CaseShowcase>
      </CaseHero>

      <CaseResults
        items={results}
        statement="All of it built from zero — no admin template, no off-the-shelf UI kit. Today Houston runs the entire lifecycle of a medical shift as the operation’s single source of truth, with an experience that outclasses the incumbent tools in its market. Judge that claim yourself in the recreation above."
        footnote="Scope and operational figures above come from the real platform. Data shown inside the recreation is fictional."
      />

      <CaseStory
        eyebrow="From tool to platform"
        headline="A platform designed around operational clarity and scalability."
        text="Houston began as a simple support tool for job postings coming from the mobile app. As the operation grew, hiring teams needed visibility, control and automation across the entire lifecycle of medical shifts — so it was rebuilt into the platform above."
        image={{
          src: "/img/houston/first-version.png",
          alt: "Screenshot of the first version of Houston, a simple support tool",
          width: 1210,
          height: 730,
        }}
        imageCaption="Where it started — the previous version of Houston"
        cards={approach}
      />

      <CaseDesignLanguage
        fontClassName={geologica.variable}
        fontFamily="var(--font-geologica), sans-serif"
        typefaceName="Geologica"
        weights={[
          { label: "Thin", weight: 100 },
          { label: "Regular", weight: 400 },
          { label: "Medium", weight: 500 },
        ]}
        description="A single variable typeface carries the whole platform. Thin weights keep dense operational screens light; regular anchors headings and metrics. There is no bold anywhere — hierarchy comes from size and color."
        palette={[
          {
            category: "Primary",
            name: "Purple",
            hex: "#A369ED",
            rgb: "(163, 105, 237)",
            bg: "#A369ED",
            fg: "#FFFFFF",
          },
          {
            category: "Neutral",
            name: "App Background",
            hex: "#F3F3F3",
            rgb: "(243, 243, 243)",
            bg: "#F3F3F3",
            fg: "#18181B",
            border: "rgba(22, 22, 22, 0.08)",
          },
          {
            category: "Neutral",
            name: "Ink",
            hex: "#18181B",
            rgb: "(24, 24, 27)",
            bg: "#18181B",
            fg: "#FFFFFF",
          },
        ]}
        supportPalette={{
          label: "Support palette — grade identity",
          text: "32 colors available when creating a grade. Each schedule keeps its color across the calendar, shift views and reports — diverse hues tuned to sit comfortably next to the primary purple.",
          colors: [
            "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CFF", "#EC4899", "#14B8A6", "#F97316",
            "#6366F1", "#EF4675", "#06B6D4", "#84CC16", "#A855F7", "#F43F5E", "#22D3EE", "#FBB040",
            "#8B5CF6", "#F87171", "#34D399", "#FBBF24", "#C084FC", "#FB7185", "#67E8F9", "#FCD34D",
            "#6D28D9", "#DC2626", "#059669", "#D97706", "#7C3AED", "#BE185D", "#0891B2", "#CA8A04",
          ],
        }}
        statusPills={{
          label: "Status language — the palette at work",
          pills: [
            { label: "ABERTA", cls: "bg-gray-50 text-gray-700 border-gray-200" },
            { label: "FECHADA", cls: "bg-orange-50 text-orange-700 border-orange-200" },
            { label: "URGENTE", cls: "bg-red-50 text-red-700 border-red-200" },
            { label: "PENDENTE", cls: "bg-yellow-50 text-yellow-700 border-yellow-200" },
            { label: "AUTORIZADO", cls: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "PAGO", cls: "bg-green-50 text-green-700 border-green-200" },
          ],
        }}
      />

      <CaseFeatures
        eyebrow="Inside the platform"
        intro="Each module below is the real screen, recreated in React with fictional data — sort tables, flip months, expand reports."
        features={features}
      />

      <CaseEvidence
        eyebrow="Behind the product"
        text="The work you can’t click: pull-request driven reviews, business rules and migrations managed at the PostgreSQL level, and a CI/CD pipeline behind every release."
        items={[
          {
            image: {
              src: "/img/houston/github.png",
              alt: "Houston codebase and pull requests on GitHub",
              width: 1080,
              height: 742,
            },
            caption: "Code review culture on GitHub",
          },
          {
            image: {
              src: "/img/houston/database.png",
              alt: "PostgreSQL database migration files for Houston",
              width: 1080,
              height: 796,
            },
            caption: "Versioned PostgreSQL migrations",
          },
          {
            image: {
              src: "/img/houston/ci-cd.png",
              alt: "Houston CI/CD pipeline runs",
              width: 1080,
              height: 595,
            },
            caption: "CI/CD on every release",
          },
        ]}
        stack={[
          "React",
          "TypeScript",
          "Next.js",
          "Tailwind CSS",
          "shadcn/ui",
          "Supabase",
          "PostgreSQL",
          "CI/CD",
        ]}
      />

      <CaseContact
        heading="Want the full story behind Houston?"
        text="Architecture decisions, trade-offs and what shipped when — happy to walk through any of it."
        email="kenjimattos@gmail.com"
      />
    </CaseLayout>
  );
}
