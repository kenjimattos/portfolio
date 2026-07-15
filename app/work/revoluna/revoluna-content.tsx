"use client";

import Image from "next/image";
import { CaseStudyTemplate } from "@/components/case-study/case-study-template";

const tags = ["Design", "Prototype", "Front-end", "Back-end", "Mobile"];

const implementationSteps = [
  "Led the product redesign from concept to high-fidelity prototypes in Figma",
  "Translated designs into a functional mobile MVP using FlutterFlow",
  "Implemented custom logic where no-code solutions were not sufficient, including check-in/check-out flows and deep linking",
  "Integrated REST APIs for user verification, shift discovery, applications, schedules, and payments",
  "Collaborated closely with product stakeholders to align business rules with user-facing flows",
  "Took ownership of publishing and maintaining the app on the App Store and Google Play",
];

export function RevolunaContent() {
  return (
    <CaseStudyTemplate
      projectName="Revoluna"
      accentColor="#4a1d6e"
      accentTint="#F5EDFF"
      heroSubtitle="A mobile-first product designed to bring clarity and structure to medical shift management in Brazil."
      tags={tags}
      heroImage={{
        src: "/img/revoluna/hero-phones.png",
        alt: "Revoluna mobile app screens on two phones",
        width: 800,
        height: 900,
        className: "relative z-10",
        style: {
          maxHeight: "clamp(500px, 85vh, 800px)",
          width: "auto",
        },
        priority: true,
      }}
      overviewIntro={[
        "I joined the project as a Product Designer with the goal of redesigning the experience and helping the team validate the product in the real world.",
        "Beyond design, I took ownership of shipping a functional MVP to the App Store and Google Play, enabling real usage, early traction, and product validation.",
      ]}
      overviewContext="Medical shifts in Brazil are usually shared through unstructured channels like WhatsApp groups. Information is scattered, incomplete, and difficult to track. Doctors struggle to manage applications, schedules, and payments, while hiring teams rely on manual workflows that are inefficient and error-prone."
      challengeText={[
        "The challenge was to redesign the experience and expand the product beyond a simple listing, introducing features that could support real operational workflows and daily usage.",
      ]}
      challengeImage={{
        src: "/img/revoluna/first-version.png",
        alt: "Screenshot of the first version of the Revoluna app",
        width: 269,
        height: 545,
        style: { maxWidth: "clamp(180px, 20vw, 269px)", height: "auto" },
        caption: "First version of the app",
      }}
      solutionImage={{
        src: "/img/revoluna/solution.png",
        alt: "Composition of redesigned Revoluna app screens",
        width: 2880,
        height: 1560,
      }}
      solutionText="A redesigned mobile experience focused on organization, visibility, and control. The MVP introduced structured shift discovery, clearer scheduling, and automation of key operational steps that were previously manual."
      features={
        <>
          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="feature-badge feature-badge--purple">01</div>
              <h3
                className="text-foreground font-semibold"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
              >
                Explore
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
              Doctors can browse available shifts with clear details such as location, schedule, and payment, making it easier to find relevant opportunities quickly.
            </p>
            <div className="rounded-lg overflow-hidden">
              <Image
                quality={90}
                src="/img/revoluna/explore.png"
                alt="Revoluna Explore screen listing available medical shifts"
                width={1055}
                height={621}
                className="w-full"
              />
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "1fr 1.2fr",
              }}
            >
              <Image
                quality={90}
                src="/img/revoluna/schedule.png"
                alt="Revoluna My Schedule screen with upcoming shifts"
                width={439}
                height={598}
                className="rounded-lg"
                style={{
                  maxWidth: "clamp(280px, 40vw, 500px)",
                  height: "auto",
                }}
              />
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--cyan">02</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    My Schedule
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  A consolidated view of upcoming shifts, including visibility into when colleagues from the same hospital are also on duty.
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
                  <div className="feature-badge feature-badge--primary">03</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Notifications
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  Built with Firebase Cloud Messaging to support application updates, schedule alerts, and check-in and check-out reminders.
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
              <Image
                quality={90}
                src="/img/revoluna/notifications.png"
                alt="Revoluna push notifications on a phone lock screen"
                width={845}
                height={1110}
                className="rounded-lg justify-self-end"
                style={{
                  maxWidth: "clamp(280px, 40vw, 500px)",
                  height: "auto",
                }}
              />
            </div>
          </section>

          <section className="feature-card w-full mb-24" style={{ opacity: 0 }}>
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "minmax(200px, 400px) 1fr",
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--purple">04</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Shift Transfer
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  Doctors can make a scheduled shift available so colleagues from the same group can take over when needed.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <Image
                  quality={90}
                  src="/img/revoluna/transfer.png"
                  alt="Revoluna shift transfer flow screens"
                  width={1081}
                  height={1008}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          <section
            className="feature-card w-full mb-24"
            style={{
              opacity: 0,
              marginRight: "calc(-1 * clamp(40px, 8vw, 180px))",
            }}
          >
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "1fr minmax(300px, 50%)",
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--cyan">05</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Check In-Out
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  Reminders guide doctors through check-in and check-out within defined time windows. Validation is completed only within a 100-meter radius of the hospital, ensuring payroll accuracy while minimizing battery usage.
                </p>
              </div>
              <div
                className="rounded-l-lg overflow-hidden flex justify-end"
                style={{
                  maxHeight: "clamp(400px, 50vw, 700px)",
                }}
              >
                <Image
                  quality={90}
                  src="/img/revoluna/checkin-checkout.png"
                  alt="Revoluna check-in and check-out screens with location validation"
                  width={800}
                  height={600}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginTop: "-30%",
                  }}
                />
              </div>
            </div>
          </section>

          <section
            className="feature-card w-full mb-24"
            style={{
              opacity: 0,
              marginRight: "calc(-1 * clamp(40px, 8vw, 180px))",
            }}
          >
            <div
              className="grid gap-8 items-center"
              style={{
                gridTemplateColumns: "1fr minmax(300px, 50%)",
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-badge feature-badge--primary">06</div>
                  <h3
                    className="text-foreground font-semibold"
                    style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                  >
                    Deep Linking
                  </h3>
                </div>
                <p
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", opacity: 0.7 }}
                >
                  Implemented deep links that route users directly to specific shift details inside the app. Links can be generated from both the web admin platform and the mobile app, enabling seamless sharing and improving discovery and conversion.
                </p>
              </div>
              <div
                className="rounded-l-lg overflow-hidden flex justify-end"
                style={{
                  maxHeight: "clamp(400px, 50vw, 700px)",
                }}
              >
                <Image
                  quality={90}
                  src="/img/revoluna/deeplink.png"
                  alt="Revoluna deep linking flow from a shared link into the app"
                  width={800}
                  height={600}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </section>
        </>
      }
      preImplementation={
        <section
          className="animate-section w-full"
          style={{ opacity: 0, padding: "0 clamp(8px, 1vw, 15px)" }}
        >
          <div className="rounded-lg overflow-hidden">
            <Image
              quality={90}
              className="w-full"
              src="/img/revoluna/login-subscription.png"
              alt="Revoluna login and subscription screens"
              width={1440}
              height={960}
            />
          </div>
        </section>
      }
      implementationSteps={implementationSteps}
      implementationMedia={
        <>
          <div
            className="mt-12 grid gap-4"
            style={{
              gridTemplateColumns: "1fr 2fr",
            }}
          >
            <div className="rounded-lg overflow-hidden">
              <Image
                quality={90}
                src="/img/revoluna/figma-components.png"
                alt="Revoluna component library in Figma"
                width={667}
                height={959}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                quality={90}
                src="/img/revoluna/figma-design.png"
                alt="Revoluna high-fidelity designs in Figma"
                width={1361}
                height={959}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-8 rounded-lg overflow-hidden">
            <Image
              quality={90}
              src="/img/revoluna/github.png"
              alt="Revoluna custom code on GitHub"
              width={2160}
              height={1484}
              className="w-full"
            />
          </div>
        </>
      }
      outcomePrimary="The mobile MVP replaced informal workflows with a structured, production-ready experience, allowing doctors to better manage shifts and payments while enabling the team to validate the product with real users."
      outcomeSecondary="The success of the MVP laid the foundation for the next phase of the product: the development of a dedicated web platform focused on scalability and operational management."
      postOutcome={
        <section
          className="animate-section w-full grid gap-2"
          style={{
            margin: 0,
            gridTemplateColumns: "1fr 1fr",
            backgroundColor: "#F5EDFF",
            opacity: 0,
          }}
        >
          <div className="rounded-lg overflow-hidden">
            <Image
              quality={90}
              src="/img/revoluna/icon.png"
              alt="Revoluna app icon"
              width={740}
              height={740}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              quality={90}
              src="/img/revoluna/store.png"
              alt="Revoluna listing on the App Store and Google Play"
              width={700}
              height={740}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      }
      nextProject={{ href: "/work/sebrae-opp", label: "Sebrae OPP" }}
    />
  );
}
