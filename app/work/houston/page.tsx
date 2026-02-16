"use client";

import Image from "next/image";
import { CaseStudyTemplate } from "@/components/case-study/case-study-template";

const tags = ["Front-end", "Back-end", "Product", "Architecture", "Engineering"];

const implementationSteps = [
  "Took ownership of the web platform's development and later coordinated a small team of three engineers",
  "Established workflows, code standards, and review practices as the system grew in complexity",
  "Implemented and refactored core business rules directly at the database level using PostgreSQL",
  "Managed the full lifecycle of database migrations, ensuring data consistency across environments",
  "Implemented a complete CI/CD pipeline to ensure reliability and fast iteration",
  "Designed frontend flows tightly coupled to backend validation rules, reducing errors and manual intervention",
  "Structured the system to support multi-tenant usage with role-based access control across teams",
];

export default function HoustonPage() {
  return (
    <CaseStudyTemplate
      projectName="Houston"
      heroSubtitle="A production-grade operational platform designed to manage medical shift operations at scale."
      tags={tags}
      heroImage={{
        src: "/img/houston/hero-laptop.png",
        alt: "Houston app screen",
        width: 915,
        height: 556,
        className: "relative z-10",
        style: {
          maxWidth: "clamp(500px, 80vw, 900px)",
          height: "auto",
        },
        priority: true,
      }}
      overviewIntro={[
        "I led the evolution of an internal support tool into a production-grade operational platform used to manage medical shift operations at scale.",
        "Houston is a web application used by hospitals and staffing teams to plan schedules, manage candidates, control attendance, and handle payments in one place.",
      ]}
      overviewContext="The platform supports complex workflows while remaining efficient, reliable, and easy to operate on a daily basis."
      challengeText={[
        "Houston started as a simple support tool for managing job postings and applications coming from the mobile app. As operations grew, this approach no longer scaled.",
        "Hiring teams needed visibility, control, and automation across the entire lifecycle of medical shifts. The challenge was to transform an early tool into a robust, multi-tenant platform capable of handling real-world operational complexity without slowing teams down.",
      ]}
      challengeImage={{
        src: "/img/houston/first-version.png",
        alt: "Houston first version",
        width: 1210,
        height: 730,
        style: { maxWidth: "100%", height: "auto" },
        caption: "Previous version of Houston",
      }}
      solutionImage={{
        src: "/img/houston/solution.png",
        alt: "Houston solution",
        width: 2880,
        height: 1520,
      }}
      solutionText="A platform designed around operational clarity and scalability. Centralizing scheduling, applications, attendance validation, payments, and reporting into a single system."
      features={
        <>
          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--purple">01</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Operational Dashboard
              </h3>
            </div>
            <p
              className="text-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                opacity: 0.7,
                maxWidth: "700px",
              }}
            >
              A real-time overview of open and filled shifts, pending applications, operational risk, and payroll totals, with global month-based filtering.
            </p>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/img/houston/dasboard.png"
                alt="Operational Dashboard"
                width={954}
                height={603}
                className="w-full"
              />
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--cyan">02</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Schedule Builder
              </h3>
            </div>
            <p
              className="text-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                opacity: 0.7,
                maxWidth: "700px",
              }}
            >
              An interactive grid-based interface for creating and managing medical schedules. Supports drag and drop creation, resizing, duplication, conflict detection, and batch publishing of shifts.
            </p>
            <div className="relative">
              <Image
                src="/img/houston/schedule.png"
                alt="Schedule Builder"
                width={954}
                height={603}
                className="w-full rounded-lg"
              />
              <Image
                src="/img/houston/schedule.gif"
                alt="Schedule Builder animation"
                width={757}
                height={321}
                className="absolute w-[60%] h-auto"
                style={{
                  borderRadius: "clamp(4px, 1vw, 10px)",
                  borderWidth: "clamp(0.5px, 0.2vw, 2px)",
                  borderStyle: "solid",
                  borderColor: "#A369ED",
                  right: "0",
                  bottom: "clamp(40px, 60%, 80px)",
                }}
                unoptimized
              />
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--primary">03</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Job &amp; Application Management
              </h3>
            </div>
            <p
              className="text-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                opacity: 0.7,
                maxWidth: "700px",
              }}
            >
              Centralized management of job postings and applications with bulk actions, recurrence handling, and conflict validation.
            </p>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/img/houston/application.png"
                alt="Job & Application Management"
                width={1826}
                height={1360}
                className="w-full"
              />
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--purple">04</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Shift Calendar
              </h3>
            </div>
            <p
              className="text-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                opacity: 0.7,
                maxWidth: "700px",
              }}
            >
              Custom calendar views for weekly, monthly, and daily management, with quick actions, candidate assignment, and status tracking.
            </p>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/img/houston/calendar.png"
                alt="Shift Calendar"
                width={1466}
                height={1020}
                className="w-full"
              />
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--cyan">05</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Attendance &amp; Payments
              </h3>
            </div>
            <p
              className="text-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                opacity: 0.7,
                maxWidth: "700px",
              }}
            >
              Integrated check-in and check-out control with approval flows, payment authorization, and batch operations for large volumes of shifts.
            </p>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/img/houston/payments.png"
                alt="Attendance & Payments"
                width={954}
                height={603}
                className="w-full"
              />
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "1.2fr 1fr",
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--primary">06</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Doctors &amp; Teams
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  Management of medical staff, teams, favorites, and pre-registered doctors, enabling faster assignments and better organization.
                </p>
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 40%, transparent), transparent)",
                    maxWidth: "200px",
                  }}
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/img/houston/teams.png"
                  alt="Doctors & Teams"
                  width={653}
                  height={493}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "1fr 1.2fr",
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--purple">07</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Reports &amp; Insights
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  Operational and financial reports covering payroll, productivity, schedules, and exports, with unified filtering across the platform.
                </p>
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-purple) 40%, transparent), transparent)",
                    maxWidth: "200px",
                  }}
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/img/houston/reports.png"
                  alt="Reports & Insights"
                  width={1929}
                  height={1873}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "1.2fr 1fr",
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--cyan">08</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Access Control &amp; Permissions
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  As Houston evolved into a multi-tenant platform, access control became a core requirement. I led the implementation of role-based access control (RBAC) to manage permissions across schedules, applications, attendance, and payments.
                </p>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(14px, 1.3vw, 16px)", opacity: 0.6 }}
                >
                  Permissions are enforced consistently across frontend flows and backend validation, supporting multiple organizations and roles while keeping daily operations simple.
                </p>
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-cyan) 40%, transparent), transparent)",
                    maxWidth: "200px",
                  }}
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/img/houston/access-control.png"
                  alt="Access Control & Permissions"
                  width={480}
                  height={638}
                  className="w-full"
                />
              </div>
            </div>
          </section>
        </>
      }
      implementationSteps={implementationSteps}
      implementationMedia={
        <div className="mt-12 flex flex-col gap-8">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/github.png"
              alt="GitHub code"
              width={1080}
              height={742}
              className="w-full"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/database.png"
              alt="Database migrations"
              width={1080}
              height={796}
              className="w-full"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/houston/ci-cd.png"
              alt="CI/CD pipeline"
              width={1080}
              height={595}
              className="w-full"
            />
          </div>
        </div>
      }
      outcomePrimary="Houston evolved into a production-grade operational platform used to manage the full lifecycle of medical shifts. The system reduced manual work, improved visibility for hiring teams, and supported the company's growth with a scalable and maintainable foundation."
      postOutcome={
        <section
          className="animate-section w-full"
          style={{ padding: "0 clamp(8px, 1vw, 15px)", opacity: 0 }}
        >
          <div className="rounded-lg overflow-hidden">
            <Image
              className="w-full"
              src="/img/houston/outcome.png"
              alt="Houston outcome"
              width={1441}
              height={960}
            />
          </div>
        </section>
      }
      nextProject={{ href: "/work/revoluna", label: "Revoluna" }}
    />
  );
}
