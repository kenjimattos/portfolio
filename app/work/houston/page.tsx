"use client";

import Image from "next/image";
import { Nav } from "@/components/nav";

export default function HoustonPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section
        id="top"
        className="work-hero bg-[#F5EDFF] w-full"
      >
        {/* Title - positioned at bottom left */}
        <h1>
          Houston
        </h1>

        {/* Hero image */}
        <Image
          src="/img/houston/hero-laptop.png"
          alt="Houston app screen"
          width={915}
          height={556}
          className="absolute"
          style={{
            height: "clamp(244px, 38vw, 556px)",
            width: "auto",
            right: "clamp(-100px, -5vw, -112px)",
            top: "clamp(78px, 8vw, 115px)",
          }}
        />
      </section>

      {/* Overview Section */}
      <section className="section-pb w-full">
        <div className="content-gap flex flex-col sm:flex-row">
          {/* Left - Tags */}
          <div className="text-gap flex flex-col items-start sm:items-center">
            <h3>
              My role
            </h3>
            <div className="tags">
              {["Front-end", "Back-end", "Product", "Architecture", "Engineering"].map(
                (tag) => (
                  <div key={tag} className="tag">
                    {tag}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px sm:w-px sm:h-auto bg-foreground sm:self-stretch" />

          {/* Right - Content */}
          <div className="text-gap flex flex-col">
            <h3>
              Overview
            </h3>
            <p
              className="text-left"
              style={{
                fontSize: "var(--font-large)",
              }}
            >
              I led the evolution of an internal support tool into a production-grade operational platform used to manage medical shift operations at scale.
            </p>
            <p
              className="text-left"
              style={{
                fontSize: "var(--font-medium)",
              }}
            >
              Houston is a web application used by hospitals and staffing teams to plan schedules, manage candidates, control attendance, and handle payments in one place.
              <br />
              <br />
              The platform supports complex workflows while remaining efficient, reliable, and easy to operate on a daily basis.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section
        className="section content-gap bg-[#F5EDFF] overflow-hidden flex flex-col items-center"
        style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",
          maxHeight: "clamp(620px, 120vw, 1200px)",
        }}
      >
        <div className="text-gap flex flex-col justify-center">
          <h3>
            The challenge
          </h3>
          <p
            className="text-justify"
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            Houston started as a simple support tool for managing job postings and applications coming from the mobile app. As operations grew, this approach no longer scaled.
          </p>
          <p
            className="text-justify"
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            Hiring teams needed visibility, control, and automation across the entire lifecycle of medical shifts.
          </p>
          <p
            className="text-justify"
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            The challenge was to transform an early tool into a robust, multi-tenant platform capable of handling real-world operational complexity without slowing teams down.
          </p>
          <p
            className="text-justify"
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            As operations grew, this approach no longer scaled and exposed architectural limitations typical of early-stage tools.
          </p>
        </div>
        {/* Old app screenshot */}
        <div className="text-gap flex flex-col items-center">
          <p
            className="self-start"
            style={{
              fontSize: "var(--font-xsmall)",
              paddingLeft: "clamp(10px, 7vw, 110px)",
            }}
          >
            Houston previous version
          </p>
          <Image
            src="/img/houston/first-version.png"
            alt="Houston first version"
            width={1210}
            height={730}
          />
        </div>
      </section>

      {/* The Solution Text */}
      <section className="section-pb w-full flex flex-col justify-center">
        <h3>
          The solution
        </h3>
        <p
          className="text-justify"
          style={{
            fontSize: "var(--font-large)",
          }}
        >
          A platform designed around operational clarity and 
          scalability. Centralizing scheduling, applications, 
          attendance validation, payments, and reporting into a single system.
        </p>
      </section>

      {/* The Solution Image */}
      <section
        className="w-full flex justify-center overflow-hidden"
        style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",
        }}
      >
        <Image
          className="w-full"
          src="/img/houston/solution.png"
          alt="Houston solution"
          width={2880}
          height={1520}
        />
      </section>

      {/* Operational Dashboard Section */}
      <section className="section-pb w-full flex flex-col justify-items-start">
        <div className="flex flex-col text-gap">
        <h2>
          Operational Dashboard
        </h2>
        <p
          className="text-justify"
          style={{
            fontSize: "var(--font-medium)",
          }}
        >
          A real-time overview of open and filled shifts, pending applications, operational risk, and payroll totals, with global month-based filtering.
        </p>
        </div>
        <Image
          className="w-full rounded-sm"
          src="/img/houston/dasboard.png"
          alt="Operational Dashboard"
          width={954}
          height={603}
        />
      </section>

      {/* Schedule Builder Section */}
      <section className="section-pb content-gap flex flex-col">
        <div className="flex flex-col text-gap">
          <h2>
            Schedule Builder
          </h2>
          <p
            style={{
              fontSize: "var(--font-small)",
            }}
          >
            An interactive grid-based interface for creating
            and managing medical schedules. Supports drag and drop
            creation, resizing, duplication, conflict detection,
            and batch publishing of shifts.
          </p>
        </div>
        <div className="relative">
          <Image
            src="/img/houston/schedule.png"
            alt="Schedule Builder"
            width={954}
            height={603}
            style={{width: "95%"}}
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
              bottom: "clamp(60px, 80%, 100px)",
            }}
            unoptimized
          />
        </div>
      </section>

      {/* Job & Application Management Section */}
      <section className="section-pb flex flex-col content-gap">

        <div className="flex flex-col text-gap">
          <h2>
            Job & Application Management
          </h2>
          <p
            style={{
              fontSize: "var(--font-small)",
            }}
          >
            Centralized management of job postings and applications with bulk actions, recurrence handling, and conflict validation.
          </p>
        </div>
          <Image
            src="/img/houston/application.png"
            alt="Job & Application Management"
            width={1826}
            height={1360}
          />
      </section>

      {/* Shift Calendar Section */}
      <section className="section-pb flex flex-col content-gap">
        <div className="flex flex-col text-gap">
          <h2>
            Shift Calendar
          </h2>
          <p
            style={{
              fontSize: "var(--font-small)",
            }}
          >
            Custom calendar views for weekly, monthly, and daily management, with quick actions, candidate assignment, and status tracking.
          </p>
        </div>
          <Image
            src="/img/houston/calendar.png"
            alt="Shift Calendar"
            width={1466}
            height={1020}
          />
      </section>

      {/* Attendance & Payments Section */}
      <section className="section-pb content-gap w-full flex flex-col justify-items-start">
        <div className="flex flex-col text-gap">
        <h2>
          Attendance & Payments
        </h2>
        <p
          className="text-justify"
          style={{
            fontSize: "var(--font-small)",
          }}
        >
          Integrated check-in and check-out control with approval flows, payment authorization, and batch operations for large volumes of shifts.
        </p>
        </div>

        <Image
          className="w-full rounded-sm"
          src="/img/houston/payments.png"
          alt="Attendance & Payments"
          width={954}
          height={603}
        />
      </section>

      {/* Doctors & Teams Section */}
      <section className="section-pb w-full flex flex-col sm:flex-row-reverse items-center">
        <Image
          className="rounded-sm sm:w-1/2"
          src="/img/houston/teams.png"
          alt="Doctors & Teams"
          width={653}
          height={493}
        />
        <div
          className="text-gap flex flex-col"
          style={{
            paddingRight: "clamp(0px, 3vw, 40px)",
          }}
        >
          <h2>
            Doctors & Teams
          </h2>
          <p
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            Management of medical staff, teams, favorites, and pre-registered doctors, enabling faster assignments and better organization.
          </p>
        </div>
      </section>

      {/* Reports & Insights Section */}
      <section className="w-full section-pb content-gap bg-cover flex flex-col sm:flex-row items-center lg:h-dvh bg-hidden-mobile"
               style={{
                "--bg-image": "url(/img/houston/reports.png)",
                backgroundPosition: "clamp(0px, 30vw, 400px) 0px",
                backgroundRepeat: "no-repeat",
               } as React.CSSProperties}
      >
        <div
          className="text-gap flex flex-col self-end lg:max-w-160"
        >
          <h2>
            Reports & Insights
          </h2>
          <p
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            Operational and financial reports covering payroll, productivity, schedules, and exports, with unified filtering across the platform.
          </p>
        </div>
      <section className="block lg:hidden">
      <Image
          className="rounded-sm lg:shrink-0"
          src="/img/houston/reports.png"
          alt="Reports & Insights"
          width={1929}
          height={1873}
        /> 
      </section>
      </section>

      {/* Access Control & Permissions Section */}
      <section className="section-pb content-gap w-full flex flex-col sm:flex-row items-center">
        <div
          className="text-gap flex flex-col"
          style={{
            paddingRight: "clamp(0px, 3vw, 40px)",
          }}
        >
          <h2>
            Access Control & Permissions
          </h2>
          <p
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            As Houston evolved into a multi-tenant platform, access control became a core requirement.
          </p>
          <p
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            I led the implementation of role-based access control (RBAC) to manage permissions across schedules, applications, attendance, and payments, ensuring secure data isolation between hospitals, teams, and users.
          </p>
          <p
            style={{
              fontSize: "var(--font-medium)",
            }}
          >
            Permissions are enforced consistently across frontend flows and backend validation, supporting multiple organizations and roles while keeping daily operations simple and reliable.
          </p>
        </div>
        <Image
          className="rounded-sm w-1/2"
          src="/img/houston/access-control.png"
          alt="Access Control & Permissions"
          width={480}
          height={638}
        />
      </section>

      {/* Implementation Section */}
      <section className="section content-gap w-full flex flex-col">
        <h3>
          Implementation
        </h3>

        <p
          className="text-justify"
          style={{
            fontSize: "var(--font-medium)",
          }}
        >
          I took ownership of the web platform’s development and later coordinated a small team of three engineers, establishing workflows, code standards, and review practices as the system grew in complexity.
          <br /><br />
          Implemented and refactored core business rules directly at the database level using PostgreSQL, ensuring data integrity across scheduling, attendance, and payment flows.
        </p>

        <Image
          className="w-full rounded-sm"
          src="/img/houston/github.png"
          alt="GitHub code"
          width={1080}
          height={742}
        />

        <p
          className="text-justify"
          style={{
            fontSize: "var(--font-medium)",
          }}
        >
          I managed the full lifecycle of database migrations, ensuring data consistency across environments. Defined and executed PostgreSQL migration strategies across development, staging, and production.
        </p>

        <Image
          className="w-full rounded-sm"
          src="/img/houston/database.png"
          alt="Database migrations"
          width={1080}
          height={796}
        />

        <p
          className="text-justify"
          style={{
            fontSize: "var(--font-medium)",
          }}
        >
          We implemented a complete CI/CD pipeline to ensure reliability and fast iteration across environments.
          <br /><br />
          Designed frontend flows tightly coupled to backend validation rules, reducing errors and manual intervention.
          <br /><br />
          Structured the system to support multi-tenant usage with role-based access control across teams and organizations.
        </p>

        <Image
          className="w-full rounded-sm"
          src="/img/houston/ci-cd.png"
          alt="CI/CD pipeline"
          width={1080}
          height={595}
        />
      </section>

      {/* Outcome Section */}
      <section className="section-pb text-gap w-full flex flex-col">
        <h3>
          Outcome
        </h3>

        <p
          className="text-justify"
          style={{
            fontSize: "var(--font-large)",
          }}
        >
          Houston evolved into a production-grade operational platform used to manage the full lifecycle of medical shifts. The system reduced manual work, improved visibility for hiring teams, and supported the company&apos;s growth with a scalable and maintainable foundation.
        </p>
      </section>

      {/* Outcome Image */}
      <section
        className="w-full flex justify-center overflow-hidden"
        style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",
        }}
      >
        <Image
          className="w-full object-fill rounded-sm"
          src="/img/houston/outcome.png"
          alt="Houston outcome"
          width={1441}
          height={960}
        />
      </section>

      <Nav nextHref="/work/revoluna" />
    </main>
  );
}
