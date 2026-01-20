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
              {["Design", "Prototype", "Front-end", "Back-end", "Mobile"].map(
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
              A mobile-first product designed to bring clarity and structure
              to how medical shifts are discovered and managed in Brazil.
            </p>
            <p
              className="text-left"
              style={{
                fontSize: "var(--font-medium)",
              }}
            >
              I joined the project as a Product Designer with the goal of redesigning the experience
              and helping the team validate the product in the real world. Beyond design, I took ownership 
              of shipping a functional MVP to the App Store and Google Play,
              enabling real usage, early traction, and product validation.
              <br />
              <br />              
              Medical shifts in Brazil are usually shared through unstructured channels
              like WhatsApp groups. Information is scattered, incomplete, and difficult to track.
              <br />
              <br />
              Doctors struggle to manage applications, schedules, and payments,
              while hiring teams rely on manual workflows that are inefficient and error-prone.
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
            Doctors struggle to manage applications, schedules, and payments, 
            while hiring teams rely on manual workflows that are inefficient and error-prone.
            The challenge was to redesign the experience and expand the product beyond a 
            simple listing, introducing features that could support real operational workflows and daily usage.
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
          A redesigned mobile experience focused on organization, visibility, and control.
          The MVP introduced structured shift discovery, clearer scheduling, and automation 
          of key operational steps that were previously manual, enabling doctors to confidently 
          manage their work routine through a single app.
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
              A consolidated view of upcoming shifts, including visibility into when colleagues from the same hospital are also on duty.
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
              Built with Firebase Cloud Messaging to support application updates, schedule alerts, and check-in and check-out reminders.
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
              Reminders guide doctors through check-in and check-out within defined time windows. Validation is completed only within a 100-meter radius of the hospital, ensuring payroll accuracy while minimizing battery usage.
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
        className="section w-full content-gap flex overflow-hidden justify-between items-center"
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
              Implemented deep links that route users directly to specific shift details inside the app. Links can be generated from both the web admin platform and the mobile app, enabling seamless sharing and improving discovery and conversion.
            </p>
          </div>
                    {/* Feature Image */}
          <Image
            className="translate-y-20"
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
            <span>1.</span> Led the product redesign from concept to high-fidelity prototypes in Figma
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
            <span>2.</span> Translated designs into a functional mobile MVP using FlutterFlow
            <br /><br />
            <span>3.</span> Implemented custom logic where no-code solutions were not sufficient, including check-in/check-out flows and deep linking
          </p>


        {/* UI States Section */}
          <p className="numbered">
            <span>4.</span> Integrated REST APIs for user verification, shift discovery, applications, schedules, and payments
            <br /><br />
            <span>5.</span> Collaborated closely with product stakeholders to align business rules with user-facing flows
            <br /><br />
            <span>6.</span> Took ownership of publishing and maintaining the app on the App Store and Google Play
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
          The mobile MVP replaced informal workflows with a structured, production-ready experience, allowing doctors to better manage shifts and payments while enabling the team to validate the product with real users.
          <br /><br />
          The success of the MVP laid the foundation for the next phase of the product: the development of a dedicated web platform focused on scalability and operational management.
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
