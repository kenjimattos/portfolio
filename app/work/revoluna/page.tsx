import Image from "next/image";

export default function RevolunaPage() {
  return (
    <main className="bg-[#FFFFF9] flex flex-col items-center"
      style={{ gap: "clamp(5px, 0.3vw, 10px)" }}  
    >
      {/* Hero Section */}
      <section
        className="bg-[#F5EDFF] w-full overflow-hidden relative rounded-[5px] flex items-end"
        style={{
          height: "clamp(400px, 46vw, 660px)",
          padding: "clamp(20px, 4vw, 60px) clamp(20px, 8vw, 120px)",
        }}
      >
        {/* Title - positioned at bottom left */}
        <h1
          className="z-10 leading-[1em] font-normal text-[#161616]"
          style={{
            fontSize: "clamp(36px, 8vw, 118px)",
          }}
        >
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
      <section
        className="w-full"
        style={{
          padding: "clamp(20px, 6vw, 60px) clamp(40px, 8vw, 180px)",
        }}
      >
        <div
          className="flex flex-col sm:flex-row"
          style={{ gap: "clamp(30px, 4vw, 60px)" }}
        >
          {/* Left - Tags */}
          <div
            className="flex flex-col items-start sm:items-center"
            style={{ gap: "clamp(16px, 1.5vw, 20px)" }}
            >
              <p
              className="text-[#777777] top-0"
              style={{
                fontSize: "clamp(20px, 2vw, 30px)",
              }}
            >
              My role
            </p>
          <div
            className="flex sm:flex-col justify-center"
            style={{ gap: "clamp(10px, 1.5vw, 44px)" }}
          >
            <div
              className="flex sm:flex-col"
              style={{ gap: "clamp(6px, 1.5vw, 44px)" }}
            >
              {["UX/UI", "Product", "Front-end", "Back-end", "Mobile"].map(
                (tag) => (
                  <div
                    key={tag}
                    className="bg-foreground rounded-xs justify-center items-center inline-flex"
                    style={{
                      width: "clamp(20px, 15vw, 120px)",
                      paddingTop: "clamp(6px, 1.2vw, 12px)",
                      paddingBottom: "clamp(6px, 1.2vw, 12px)",
                    }}
                  >
                    <span
                      className="leading-[1em] text-[#FFFFF9]"
                      style={{
                        fontSize: "clamp(12px, 1.6vw, 18px)",
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px sm:w-px sm:h-auto bg-foreground sm:self-stretch" />

          {/* Right - Content */}
          <div
            className="flex flex-col"
            style={{ gap: "clamp(16px, 1.5vw, 20px)" }}
          >
            <p
              className="text-[#777777]"
              style={{
                fontSize: "clamp(20px, 2vw, 30px)",
              }}
            >
              Overview
            </p>
            <p
              className="leading-[1.2em] text-black"
              style={{
                fontSize: "clamp(28px, 3.5vw, 50px)",
              }}
            >
              A mobile-first product focused on clarity and control. Shift
              opportunities are organized, easy to find, and simple to manage.
            </p>
            <p
              className="leading-[1.4em] text-[#161616] text-justify"
              style={{
                fontSize: "clamp(18px, 2vw, 30px)",
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
        className="bg-[#F5EDFF] rounded-sm overflow-hidden flex flex-col sm:flex-row items-center"
        style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",
          padding: "clamp(40px, 4vw, 60px) clamp(40px, 8vw, 240px)",
          gap: "clamp(30px, 4vw, 60px)",
        }}
      >
        <div className="flex flex-col justify-center">
          <p
            className="leading-[1.4em] text-[#777777]"
            style={{
              fontSize: "clamp(20px, 2vw, 30px)",
              margin: "0 0 clamp(0px, 1vw, 30px) 0",
            }}
          >
            The challenge
          </p>
          <p
            className="leading-[1.4em] text-[#161616] text-justify"
            style={{
              fontSize: "clamp(18px, 2vw, 30px)",
            }}
          >
            An early version of the app already existed. It focused mainly on
            listing available shifts and validating the core idea.
            The mission was to redesign the experience and expand the product
            beyond a simple listing.
          </p>
        </div>
        {/* Old app screenshot */}
        <div
          className="flex flex-col items-center"
          style={{ gap: "clamp(12px, 1.5vw, 20px)" }}
        >
          <Image
            src="/img/revoluna/first-version.png"
            alt="Revoluna first version"
            width={269}
            height={545}
            className="h-auto"
            style={{ maxWidth: "clamp(180px, 20vw, 269px)" }}
          />
          <p
            className="leading-[1.4em] text-[#161616]"
            style={{
              fontSize: "clamp(12px, 1vw, 14px)",
            }}
          >
            Revoluna app&apos;s first version
          </p>
        </div>
      </section>
      
      {/* The Solution Image */}
      <section className="w-full flex rounded-sm justify-center overflow-hidden"
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
      <section
        className="w-full flex flex-col justify-center"
        style={{
          paddingTop: "clamp(20px, 3vw, 60px)",
          paddingLeft: "clamp(40px, 8vw, 180px)",
          paddingRight: "clamp(40px, 8vw, 180px)",
        }}
      >
        <p
          className="leading-[1.4em] text-[#777777]"
          style={{
            fontSize: "clamp(20px, 2vw, 30px)",
          }}
        >
          The solution
        </p>
        <p
          className="leading-[1.4em] text-black text-left sm:text-justify"
          style={{
            fontSize: "clamp(28px, 3.5vw, 50px)",
          }}
        >
          Organizing shift opportunities, give doctors visibility into their
          schedules and earnings, and automating critical operational steps that
          were previously manual.
        </p>
      </section>

      {/* Explore Section */}
      <section className="w-full flex flex-col items-center justify-center"
          style={{
          paddingTop: "clamp(20px, 3vw, 60px)",
          paddingLeft: "clamp(40px, 8vw, 180px)",
          paddingRight: "clamp(40px, 8vw, 180px)",
          gap: "clamp(15px, 2vw, 30px)",
        }}
      >
        <p
          className="w-full"          
          style={{
            fontSize: "clamp(28px, 3.5vw, 50px)",
          }}
        >
          Explore
        </p>
        <p
          className="leading-[1.4em] text-black text-justify"
          style={{
            fontSize: "clamp(18px, 2vw, 30px)",
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
        className="w-full relative overflow-hidden"
        style={{
          paddingTop: "clamp(30px, 8vw, 80px)",
          paddingLeft: "clamp(40px, 8vw, 180px)",
          paddingRight: "clamp(40px, 8vw, 180px)",
        }}
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
            }}
          >
            {/* Title with line */}
            <div className="flex w-full items-center"
              style={{ gap: "clamp(10px, 1vw, 15px)" }}>
              {/* Connecting line */}
              <div className="block flex-1 h-px bg-[#161616] z-0"
              style={{marginLeft: "-120px"}}/>
              <h3
                className="text-[#161616] shrink-0"
                style={{
                  fontSize: "clamp(18px, 3vw, 48px)",
                  lineHeight: "1.4em",
                }}
              >
                My Schedule
              </h3>
            </div>
            {/* Description */}
            <p
              className="text-[#161616] leading-[1.4em] text-right"
              style={{
                fontSize: "clamp(14px, 2vw, 30px)",
                marginTop: "clamp(16px, 2vw, 30px)",
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
          >
            {/* Title with line */}
            <div className="flex items-center w-full" style={{ gap: "clamp(16px, 2vw, 30px)" }}>
              <h3
                className="text-[#161616] shrink-0"
                style={{
                  fontSize: "clamp(18px, 3vw, 48px)",
                  lineHeight: "1.4em",
                }}
              >
                Notifications
              </h3>
              {/* Connecting line */}
              <div className="block flex-1 h-px bg-[#161616]"
              style={{marginRight: "-120px"}}/>
            </div>
            {/* Description */}
            <p
              className="text-[#161616] leading-[1.4em] text-left"
              style={{
                fontSize: "clamp(14px, 2vw, 30px)",
                marginTop: "clamp(16px, 2vw, 30px)",
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
              className="h-auto relative z-10"
              style={{ maxWidth: "clamp(230px, 44vw, 439px)" }}
            />
        </div>
      </section>

      {/* Shift Transfer Section */}
      <section
        className="w-full relative overflow-hidden"
        style={{
          paddingLeft: "clamp(40px, 8vw, 180px)",
          paddingRight: "clamp(40px, 8vw, 180px)",
        }}
      >
        {/* Image left, text right */}
        <div className="flex flex-row items-center">
          {/* Feature Image */}
            <Image
              src="/img/revoluna/transfer.png"
              alt="Schedule screen"
              width={1081}
              height={1008}
              className="h-auto relative z-10"
              style={{ maxWidth: "clamp(180px, 40vw, 600px)" }}
            />

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
              <div className="block flex-1 h-px bg-[#161616] z-0"
              style={{marginLeft: "-120px"}}/>
              <h3
                className="text-[#161616] shrink-0"
                style={{
                  fontSize: "clamp(18px, 3vw, 48px)",
                  lineHeight: "1.4em",
                }}
              >
                Shift Transfer
              </h3>
            </div>
            {/* Description */}
            <p
              className="text-[#161616] leading-[1.4em] text-right"
              style={{
                fontSize: "clamp(14px, 2vw, 30px)",
                minWidth: "clamp(50px, 30vw, 554px)",
              }}
            >
              Doctors can make a scheduled shift available so colleagues from the same group can take over when needed.
            </p>
          </div>
        </div>
      </section>

      {/* Check-in / Check-out Section */}
      <section className="w-full">
      </section>

      {/* Conclusion Section */}
      <section
        className="w-full flex items-center justify-center"
        style={{
          paddingTop: "clamp(20px, 6vw, 60px)",
          paddingLeft: "clamp(40px, 8vw, 180px)",
          paddingRight: "clamp(40px, 8vw, 180px)",
        }}
      >
        <p
          className="leading-[1.4em] text-black text-justify"
          style={{
            fontSize: "clamp(24px, 3.5vw, 50px)",
          }}
        >
          The mobile app replaced informal workflows with a structured,
          production-ready experience, giving doctors better visibility and
          control over their schedules and payments.
        </p>
      </section>

      <section className="w-full flex rounded-sm justify-center overflow-hidden"
          style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",      
          paddingTop: "clamp(20px, 6vw, 60px)",
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

      {/* Icon and Store Section */}
      <section className="w-full flex rounded-sm object-fill justify-center overflow-hidden"
          style={{
          width: "calc(100% - clamp(16px, 2vw, 30px))",      
          gap: "clamp(5px, 0.3vw, 10px)",
        }}
        >
        <Image
          className="w-1/2 h-auto object-cover"
          src="/img/revoluna/icon.png"
          alt="Icon"
          width={740}
          height={740}
        />
        <Image
          className="w-1/2 h-auto object-cover"
          src="/img/revoluna/store.png"
          alt="Store"
          width={700}
          height={740}
        />
      </section>
    </main>
  );
}
