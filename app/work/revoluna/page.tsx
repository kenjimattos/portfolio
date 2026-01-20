"use client";

import Image from "next/image";
import { Nav } from "@/components/nav";

export default function RevolunaPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section
        id="top"
        className="work-hero bg-[#F5EDFF] w-full"
      >
        {/* Title - positioned at bottom left */}
        <h1>
          Revoluna
        </h1>

        {/* Background image with phones */}
        <Image
          src="/img/revoluna/hero-phones.png"
          alt="Revoluna app screens"
          width={576}
          height={796}
          className="absolute"
          style={{
            height: "clamp(280px, 56vw, 760px)",
            width: "auto",
            right: "clamp(-80px, 4vw, 120px)",
            top: "clamp(80px, 8vw, 110px)",
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
              {["UX/UI", "Product", "Front-end", "Back-end", "Mobile"].map(
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
              A mobile-first product focused on clarity and control. Shift
              opportunities are organized, easy to find, and simple to manage.
            </p>
            <p
              className="text-left"
              style={{
                fontSize: "var(--font-medium)",
              }}
            >
              Medical shifts in Brazil are shared through unstructured channels.
              Information is scattered, incomplete, and hard to track.
              <br />
              <br />
              Doctors struggle to manage applications, schedules, and payments.
              Hiring processes rely on manual steps and are prone to errors.
              <br />
              <br />
              Revoluna is a mobile app that helps doctors find and manage
              medical shifts in a structured way.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section
        className="section-pb content-gap bg-[#F5EDFF] overflow-hidden flex flex-col sm:flex-row items-center"
        style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",
          marginBottom: "clamp(5px, 0.3vw, 10px)",
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
            An early version of the app already existed. It focused mainly on
            listing available shifts and validating the core idea.
            The mission was to redesign the experience and expand the product
            beyond a simple listing.
          </p>
        </div>
        {/* Old app screenshot */}
        <div className="text-gap flex flex-col items-center">
          <Image
            src="/img/revoluna/first-version.png"
            alt="Revoluna first version"
            width={269}
            height={545}
            className="h-auto"
            style={{ maxWidth: "clamp(180px, 15vw, 269px)" }}
          />
          <p
            style={{
              fontSize: "var(--font-xsmall)",
            }}
          >
            Revoluna app&apos;s first version
          </p>
        </div>
      </section>
      
      {/* The Solution Image */}
      <section className="w-full flex justify-center overflow-hidden"
          style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",
        }}
        >
        <Image
          className="w-full object-fill"
          src="/img/revoluna/solution.png"
          alt="Revoluna solution"
          width={2880}
          height={1560}
        />
      </section>

      {/* The Solution Text */}
      <section className="section w-full flex flex-col justify-center">
        <h3>
          The solution
        </h3>
        <p
          className="sm:text-justify"
          style={{
            fontSize: "var(--font-large)",
          }}
        >
          Organizing shift opportunities, give doctors visibility into their
          schedules and earnings, and automating critical operational steps that
          were previously manual.
        </p>
      </section>

      {/* Explore Section */}
      <section className="section w-full flex flex-col items-center justify-center"
          style={{
          gap: "clamp(15px, 2vw, 30px)",
        }}
      >
        <h2 className="w-full">
          Explore
        </h2>
        <p
          className="text-justify"
          style={{
            fontSize: "var(--font-small)",
          }}
        >
          Doctors can browse available shifts with clear details such as location, schedule, and payment, making it easier to find relevant opportunities quickly.
        </p>
        <Image
          src="/img/revoluna/explore.png"
          alt="Explore feature"
          width={1055}
          height={621}
        />
      </section>

      {/* Schedule and Notifications Section */}
      <section
        className="section w-full relative overflow-hidden"
      >
        {/* Top row - Schedule image left, My Schedule text right */}
        <div className="flex flex-row items-center">
          {/* Schedule Phone Image */}
            <Image
              src="/img/revoluna/schedule.png"
              alt="Schedule screen"
              width={439}
              height={598}
              className="h-auto relative z-10"
              style={{ maxWidth: "clamp(200px, 44vw, 439px)" }}
            />

          {/* My Schedule Text with line */}
          <div
            className="flex flex-col"
            style={{
              paddingLeft: "clamp(10px, 3vw, 40px)",
              gap: "clamp(0px, 0.5vw, 30px)",
            }}
          >
            {/* Title with line */}
            <div className="flex w-full items-center"
              style={{ gap: "clamp(10px, 1vw, 15px)" }}>
              {/* Connecting line */}
              <div className="block flex-1 h-px bg-[#161616] z-0"
              style={{marginLeft: "-150px"}}/>
              <h2>
                My Schedule
              </h2>
            </div>
            {/* Description */}
            <p
              className="text-right"
              style={{
                fontSize: "var(--font-small)",
                minWidth: "clamp(50px, 30vw, 554px)",
              }}
            >
              A clear view of upcoming shifts, including visibility into when
              other colleagues from the same hospital will also be on duty.
            </p>
          </div>
        </div>

        {/* Bottom row - Notifications text left, Notifications image right */}
        <div className="flex flex-row items-center">
          {/* Notifications Text with line */}
          <div
            className="flex-1 flex flex-col items-start justify-end"
            style={{
              gap: "clamp(0px, 0.5vw, 30px)",
            }}
          >
            {/* Title with line */}
            <div className="flex items-center w-full" style={{ gap: "clamp(16px, 2vw, 30px)" }}>
              <h2>
                Notifications
              </h2>
              {/* Connecting line */}
              <div className="block flex-1 h-px bg-foreground"
              style={{marginRight: "-120px"}}/>
            </div>
            {/* Description */}
            <p
              style={{
                fontSize: "var(--font-small)",
                minWidth: "clamp(50px, 30vw, 554px)",
              }}
            >
              Built with Firebase Cloud Messaging, it supports
              communication for application updates, schedules, and check-in and check-out reminders.
            </p>
          </div>
           {/* Notifications Phone Image */}
            <Image
              src="/img/revoluna/notifications.png"
              alt="Notifications screen"
              width={845}
              height={1110}
              className="relative z-10"
              style={{ maxWidth: "clamp(230px, 44vw, 439px)" }}
            />
        </div>
      </section>

      {/* Shift Transfer Section */}
      <section className="section w-full relative">
        {/* Image left, text right */}
        <div className="flex flex-row items-center">
          {/* Feature Image */}
           
          <div>
          <Image
            src="/img/revoluna/transfer.png"
            alt="Schedule screen"
            width={1081}
            height={1008}
            className="relative z-10"
          />
          </div>

          {/*Text with line */}
          <div
            className="flex flex-col"
            style={{
              paddingLeft: "clamp(10px, 3vw, 40px)",
              gap: "clamp(0px, 0.5vw, 30px)",
            }}
          >
            {/* Title with line */}
            <div className="flex w-full items-center"
              style={{ gap: "clamp(10px, 1vw, 15px)" }}>
              {/* Connecting line */}
              <div className="block flex-1 h-px bg-foreground z-0"
              style={{marginLeft: "-90px"}}/>
              <h2>
                Shift Transfer
              </h2>
            </div>
            {/* Description */}
            <p
              className="text-right"
              style={{
                fontSize: "var(--font-small)",
                minWidth: "clamp(50px, 30vw, 554px)",
              }}
            >
              Doctors can make a scheduled shift available so colleagues from the same group can take over when needed.
            </p>
          </div>
        </div>
      </section>

      {/* Check-in / Check-out Section */}
      <section
        className="section w-full content-gap flex overflow-hidden justify-between items-center object-contain"
        style={{
          height: "clamp(250px, 50vw, 720px)",
        }}
      >
          {/*Text*/}
          <div
            className="flex flex-col shrink-0"
            style={{
              gap: "clamp(10px, 1.5vw, 30px)",
              width: "clamp(150px, 30vw, 500px)",
            }}
          >
            {/* Title */}
            <h2>
            Check In-Out
            with location validation
            </h2>
            {/* Description */}
            <p
              className="text-left"
              style={{
                fontSize: "var(--font-small)",
              }}
            >
              Doctors receive reminders to check in
              and out within defined time windows. Validation
              is completed only within a 100m radius of the hospital
              to ensure payroll accuracy, with location checked only at submission time.
            </p>
          </div>

          {/* Feature Image */}
          <Image
            style={{
              width: "clamp(200px, 55vw, 800px)",
              height: "auto",
              objectFit: "contain",
              objectPosition: "right center",
            }}
            src="/img/revoluna/checkin-checkout.png"
            alt="Check-in and Check-out screens"
            width={800}
            height={600}
          />
      </section>

      {/* Deep Linking Section */}
      <section
        className="section w-full content-gap flex overflow-hidden items-center"
        style={{
          height: "clamp(300px, 50vw, 720px)",
        }}
      >
          {/*Text*/}
          <div
            className="flex flex-col text-gap shrink-0"
            style={{
              width: "clamp(180px, 30vw, 500px)",
            }}
          >
            {/* Title */}
            <h2>
            Deep Linking & Contextual Navigation
            </h2>
            {/* Description */}
            <p
              style={{
                fontSize: "var(--font-small)",
              }}
            >
              Implemented deep linking to route users directly to specific shift details inside the mobile app. Links can be generated from both the web admin platform and the mobile application, supporting seamless sharing and improving discovery and conversion flows.
            </p>
          </div>
                    {/* Feature Image */}
          <Image
            className="translate-y-10"
            style={{
              width: "clamp(200px, 55vw, 800px)",
            }}
            src="/img/revoluna/deeplink.png"
            alt="Deep linking screens"
            width={800}
            height={600}
          />
      </section>

      {/* Login and Subscription Section */}
      <section className="w-full flex justify-center rounded-sm overflow-hidden"
          style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",
        }}
        >
        <Image
          className="w-full object-fill"
          src="/img/revoluna/login-subscription.png"
          alt="Login and Subscription"
          width={1440}
          height={960}
        />
      </section>

      {/* Implementation Section */}
      <section className="section content-gap w-full flex flex-col justify-center">
        {/* Title */}
        <h3>
          Implementation
        </h3>

        {/* Figma Section */}

          <p className="numbered">
            <span>1.</span> Built the mobile experience by translating Figma designs into
            reusable, production-ready UI components.
          </p>
          <div
            className="flex w-full"
            style={{ gap: "clamp(10px, 2vw, 64px)" }}
          >
            <Image
              className="rounded-sm w-1/3"
              src="/img/revoluna/figma-components.png"
              alt="Figma components"
              width={667}
              height={959}
            />
            <Image
              className="rounded-sm w-2/3"
              src="/img/revoluna/figma-design.png"
              alt="Figma design"
              width={1361}
              height={959}
            />
          </div>


          <p className="numbered">
            <span>2.</span> Integrated REST APIs to support user verification, shift discovery,
            applications, schedules, and payment-related workflows, including
            infinite scrolling and real-time updates.
            <br /><br />
            <span>3.</span> Implemented core backend business rules using PostgreSQL to ensure
            data consistency across scheduling and attendance flows.
          </p>


        {/* UI States Section */}
          <p className="numbered">
            <span>4.</span> Designed UI states based on real API responses, handling loading,
            empty, and validation scenarios.
            <br /><br />
            <span>5.</span> Collaborated closely with backend logic to align product rules with
            user-facing experiences.
          </p>
          <Image
            className="w-full rounded-sm"
            src="/img/revoluna/github.png"
            alt="GitHub code"
            width={2160}
            height={1484}
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
          The mobile app replaced informal workflows with a structured,
          production-ready experience, giving doctors better visibility and
          control over their schedules and payments.
        </p>
      </section>


      {/* Icon and Store Section */}
      <section className="w-full flex justify-center overflow-hidden gap"
          style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",
        }}
        >
        <Image
          className="w-1/2 rounded-sm"
          src="/img/revoluna/icon.png"
          alt="Icon"
          width={740}
          height={740}
        />
        <Image
          className="w-1/2 rounded-sm"
          src="/img/revoluna/store.png"
          alt="Store"
          width={700}
          height={740}
        />
      </section>

      <Nav nextHref="" />
    </main>
  );
}
