"use client";

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
import { geologica } from "@/components/houston-demo/geologica";
import { PhoneFrame } from "@/components/revoluna-demo/phone-frame";
import { CheckinScreen } from "@/components/revoluna-demo/screens/checkin";
import { EscalasScreen } from "@/components/revoluna-demo/screens/escalas";
import { ExploreScreen } from "@/components/revoluna-demo/screens/explore";
import { LockScreen } from "@/components/revoluna-demo/screens/lockscreen";
import { PlantoesScreen } from "@/components/revoluna-demo/screens/plantoes";
import { VagaScreen } from "@/components/revoluna-demo/screens/vaga";

const ACCENT = "#7E3CD0";
const ACCENT_INK = "#461A80";
const ACCENT_TINT = "#F5EDFF";

const RECREATION_CAPTION = "Recreated in React for this case study — fictional data";

function Phone({
  children,
  time,
  dark,
}: {
  children: React.ReactNode;
  time?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-95">
      <PhoneFrame time={time} darkStatusBar={dark}>
        {children}
      </PhoneFrame>
    </div>
  );
}

const results = [
  {
    value: "38",
    label: "Releases shipped to the App Store and Google Play — v2.3.2 today",
  },
  {
    value: "100 m",
    label: "Geofence radius validating every check-in against the hospital",
  },
  {
    value: "27",
    label: "Custom Dart actions where no-code ended: geofence, deep links, push, OTP",
  },
  {
    value: "1",
    label: "Designer-engineer from the Figma redesign to store publishing",
  },
];

const approach = [
  {
    number: "01",
    title: "Redesign, then validate",
    text: "A new design system in Figma, translated into a working MVP — decisions tested with doctors on real shifts, not with mockups.",
  },
  {
    number: "02",
    title: "No-code where it's fast, code where it counts",
    text: "FlutterFlow for screen velocity; 27 custom Dart actions and 5 custom widgets for what it can't do — geofencing, deep links, push, OTP, calendar.",
  },
  {
    number: "03",
    title: "Presence you can trust",
    text: "Check-in and check-out validated by a Haversine distance check within 100 m of the hospital — with geolocated records for payroll.",
  },
  {
    number: "04",
    title: "Own the shipping",
    text: "Store review cycles, versioned changelogs, 38 builds across both stores — the unglamorous half of mobile, done with discipline.",
  },
];

const features: CaseFeature[] = [
  {
    number: "01",
    title: "Structured discovery",
    text: "Doctors browse open shifts by specialty, sorted by publication, date, value, distance or upfront payment. Every card answers what a WhatsApp post never did: how much, which sector, how far, how fresh.",
    layout: "split",
    media: (
      <Phone>
        <ExploreScreen />
      </Phone>
    ),
  },
  {
    number: "02",
    title: "The whole shift, before applying",
    text: "One sheet with everything that matters: schedule, sector, requirements, directions, payment terms and who is hiring — plus quick actions to save, share, add to the calendar or transfer the shift to a colleague.",
    secondaryText:
      "Deep links generated from the web admin or the app itself open this exact sheet in-app. Sharing still happens on WhatsApp — but the destination is structured now.",
    layout: "split",
    media: (
      <Phone>
        <VagaScreen />
      </Phone>
    ),
  },
  {
    number: "03",
    title: "A month at a glance",
    text: "A calendar of confirmed, pending and canceled shifts — and, for each day, the full team on duty. Doctors see which colleagues share the same shift before they even leave home.",
    layout: "split",
    media: (
      <Phone time="17:45">
        <EscalasScreen />
      </Phone>
    ),
  },
  {
    number: "04",
    title: "Check-in with proof",
    text: "Reminders guide doctors through check-in and check-out within defined time windows. Validation only completes within 100 meters of the hospital, giving payroll a geolocated record of every shift actually worked.",
    secondaryText: (
      <>
        <span
          className="font-mono uppercase tracking-widest block mb-2"
          style={{ fontSize: "clamp(10px, 0.9vw, 12px)", color: ACCENT_INK }}
        >
          Trade-off
        </span>
        Presence is a single cached location fix and a Haversine check on the
        device — no continuous tracking. Doctors&apos; batteries and privacy
        outweighed a richer audit trail; and outside the time window the app
        asks for a written justification instead of hard-blocking the check-in.
      </>
    ),
    layout: "split",
    media: (
      <Phone time="19:44">
        <CheckinScreen />
      </Phone>
    ),
  },
  {
    number: "05",
    title: "The app that comes to you",
    text: "Push notifications built on Firebase Cloud Messaging cover the whole lifecycle: application updates, schedule alerts, check-in and check-out reminders, and payment notices when a shift closes.",
    layout: "split",
    media: (
      <Phone time="19:00" dark>
        <LockScreen />
      </Phone>
    ),
  },
  {
    number: "06",
    title: "An application pipeline",
    text: "Saved, under review, confirmed — every application has a visible status, filterable by hospital and date. The answer to “did they pick me?” stopped living in someone else's chat.",
    layout: "split",
    media: (
      <Phone time="17:45">
        <PlantoesScreen />
      </Phone>
    ),
  },
];

export function RevolunaContent() {
  return (
    <CaseLayout
      accent={ACCENT}
      accentInk={ACCENT_INK}
      accentTint={ACCENT_TINT}
      nextProject={{ href: "/work/sebrae-opp", label: "Sebrae OPP" }}
    >
      <CaseHero
        chips={["Health-tech · Mobile", "Solo design → both stores", "v2.3.2 · 38 builds"]}
        headline={
          <>
            Revoluna: medical shifts out of WhatsApp chaos,{" "}
            <CaseEm>into an app doctors run their month on</CaseEm>.
          </>
        }
        subtitle="A marketplace and management app for medical shifts in Brazil. I redesigned the product and shipped the MVP myself — no-code where it's fast, custom Dart where it counts — through 38 releases on the App Store and Google Play."
        roleTags={["Product Design", "UI/UX Design", "Prototype", "Mobile", "Front-end", "Back-end"]}
      >
        <CaseShowcase
          label="Live recreation — the real screens"
          note="Rebuilt in React for this case study · fictional data"
          caption="Discovery, shift detail and schedule — the three screens a doctor lives in, recreated from the shipped app."
        >
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
          >
            <Phone>
              <ExploreScreen />
            </Phone>
            <Phone>
              <VagaScreen />
            </Phone>
            <Phone time="17:45">
              <EscalasScreen />
            </Phone>
          </div>
        </CaseShowcase>
      </CaseHero>

      <CaseResults
        items={results}
        statement="The MVP replaced informal WhatsApp workflows with a structured, production-ready experience — doctors manage shifts, schedules and payments in one place, and every check-in carries geolocated proof of presence. Real usage validated the product and funded its next phase: a dedicated web platform for operations."
        footnote="Figures from the real codebase and changelog. All screens on this page are React recreations with fictional data."
      />

      <CaseStory
        eyebrow="From WhatsApp groups to one app"
        headline="Shifts lived in group chats — scattered, incomplete, impossible to track."
        text="Medical shifts in Brazil are shared through unstructured channels: information scattered across group chats, applications lost in threads, payments tracked from memory. Doctors juggled all of it by hand while hiring teams ran manual, error-prone workflows. I joined as a Product Designer to redesign the experience — and took ownership of shipping it, so the team could validate the product with real users instead of prototypes."
        image={{
          src: "/img/revoluna/first-version.png",
          alt: "Screenshot of the first version of the Revoluna app",
          width: 269,
          height: 545,
        }}
        imageCaption="The product I inherited — the app's first version"
        personas={[
          {
            label: "Primary user",
            title: "The doctor on shift",
            text: "Finds opportunities, applies, proves presence and gets paid — often across several hospitals in the same week. The app turns that scatter into one structured routine, from discovery to check-out.",
          },
          {
            label: "Also served",
            title: "The hiring team",
            text: "Publishes shifts, reviews candidates and closes payroll. Geolocated check-in records replaced phone calls and spreadsheets as the source of truth for who actually worked.",
          },
        ]}
        cards={approach}
      />

      <CaseDesignLanguage
        intro="The redesign replaced the inherited visual noise with a calm system: one typeface, one purple, generous white. All of it is mine — from the Figma component library to the shipped screens."
        fontClassName={geologica.variable}
        fontFamily="var(--font-geologica), sans-serif"
        typefaceName="Geologica"
        weights={[
          { label: "Regular", weight: 400 },
          { label: "Medium", weight: 500 },
          { label: "SemiBold", weight: 600 },
        ]}
        description="One variable typeface does every job — a deliberate choice for a small product: fewer moving parts, one consistent rhythm, and Geologica's rounded warmth softens a clinical domain."
        charsetCaption="Geologica — the app's only typeface"
        palette={[
          {
            category: "Accent",
            name: "Revoluna Purple",
            hex: "#A369ED",
            rgb: "(163, 105, 237)",
            bg: "#A369ED",
            fg: "#FFFFFF",
          },
          {
            category: "Accent",
            name: "Deep Purple",
            hex: "#461A80",
            rgb: "(70, 26, 128)",
            bg: "#461A80",
            fg: "#FFFFFF",
          },
          {
            category: "Support",
            name: "Sky Cyan",
            hex: "#0FADEB",
            rgb: "(15, 173, 235)",
            bg: "#0FADEB",
            fg: "#FFFFFF",
          },
          {
            category: "Surface",
            name: "Lavender Tint",
            hex: "#F5EDFF",
            rgb: "(245, 237, 255)",
            bg: "#F5EDFF",
            fg: "#461A80",
          },
        ]}
        statusPills={{
          label: "System feedback — no clinical red/green",
          pills: [
            { label: "SUCESSO", cls: "bg-[#F5EDFF] text-[#0FADEB] border-[#0FADEB]/50" },
            { label: "ATENÇÃO", cls: "bg-[#F5EDFF] text-[#D66E97] border-[#EBA5C1]" },
            { label: "ERRO", cls: "bg-[#F5EDFF] text-[#EB0F67] border-[#EB0F67]/50" },
          ],
        }}
      />

      <CaseFeatures
        eyebrow="Inside the app"
        intro="The screens below are recreated in React from the shipped app — same layout, same type, same purple — with fictional shifts and people."
        features={features}
      />

      <CaseEvidence
        eyebrow="Design ownership"
        text="The system existed in Figma before a line of the app was touched — components, tokens and every high-fidelity flow — and it kept both artifacts in sync until the stores had the real thing."
        items={[
          {
            image: {
              src: "/img/revoluna/figma-components.png",
              alt: "Revoluna component library in Figma",
              width: 667,
              height: 959,
            },
            caption: "Component library in Figma",
          },
          {
            image: {
              src: "/img/revoluna/figma-design.png",
              alt: "Revoluna high-fidelity designs in Figma",
              width: 1361,
              height: 959,
            },
            caption: "High-fidelity flows",
          },
          {
            image: {
              src: "/img/revoluna/store.png",
              alt: "Revoluna listing on the App Store and Google Play",
              width: 700,
              height: 740,
            },
            caption: "Live on the App Store and Google Play",
          },
        ]}
        stack={[
          "Figma",
          "FlutterFlow",
          "Flutter · Dart",
          "Supabase",
          "Firebase Cloud Messaging",
          "Google Maps",
          "App Store Connect",
          "Google Play Console",
        ]}
      />

      <CaseContact
        heading="Want the full story behind Revoluna?"
        text="The geofence trade-offs, the no-code boundary, the store-publishing war stories — happy to walk through any of it."
        email="kenjimattos@gmail.com"
      />
    </CaseLayout>
  );
}
