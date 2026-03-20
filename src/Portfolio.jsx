import { useEffect } from "react";

// ─── Inject Google Fonts & Material Symbols into <head> ───────────────────────
function useFonts() {
  useEffect(() => {
    const links = [
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
      "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,700;0,800;1,700&display=swap",
    ];
    links.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, []);
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  useFonts();

  return (
    <div
      className="bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container"
      style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: "#fbf9f9", color: "#1b1c1c" }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          backgroundColor: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "1.5rem 2rem",
            maxWidth: "1536px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              color: "#1c1917",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Lakshyaveer &amp; Amit
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
            {["About", "Projects", "Tech Stack", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                style={{
                  color: "#78716c",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#92400e")}
                onMouseLeave={(e) => (e.target.style.color = "#78716c")}
              >
                {item}
              </a>
            ))}
          </div>

          <button
            style={{
              backgroundColor: "#735c00",
              color: "#ffffff",
              borderRadius: "9999px",
              padding: "0.75rem 2rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Get in Touch
          </button>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            paddingTop: "8rem",
            paddingBottom: "10rem",
            padding: "8rem 2rem 10rem",
          }}
        >
          <div
            style={{
              maxWidth: "80rem",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "4rem",
            }}
          >
            {/* Left */}
            <div style={{ flex: "3 1 300px", display: "flex", flexDirection: "column", gap: "2rem" }}>
              <span
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#546066",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                }}
              >
                Architecting Digital Sanctuaries
              </span>

              <h1
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.05em",
                  color: "#1b1c1c",
                  margin: 0,
                }}
              >
                Lakshyaveer{" "}
                <span
                  style={{
                    color: "#735c00",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  &amp;
                </span>{" "}
                Amit
              </h1>

              <p
                style={{
                  fontSize: "1.25rem",
                  color: "#546066",
                  maxWidth: "36rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Full-stack craftsmen specializing in robust Java architectures and fluid Android experiences.
              </p>

              <div style={{ paddingTop: "2rem" }}>
                <a
                  href="#projects"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    background: "linear-gradient(135deg, #735c00, #e7c355)",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    padding: "1.25rem 2.5rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
                    textDecoration: "none",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  View Works
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Right */}
            <div style={{ flex: "2 1 250px", position: "relative" }}>
              <div
                style={{
                  aspectRatio: "4/5",
                  backgroundColor: "#e9e8e8",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVojEILO6gCtUIlEcHBcBoAhZsGVpDqvvJBdJ3oJbzz7VAr_52C3x9LHLBtm7SserpahgFHWd_sY0vZ4izTPaEzdrh0VIoS6rT5W_ys1ylqBuXaPLJ7BU7q2qTLLM3pYyVEcwDi3DsnFe0LnRMqBIymuyZjehejNxusl2JS1EpMjY9MD8Fy7uTM-C73fCNUEIAIt14MS6MPBI44AMtxELEc_42uvbdoxBxFtlcIm9-_OI7Oxw9KEjBNXMQdLQV9f_Yoce4-pMbS5E"
                  alt="Two professional developers collaborating in a minimalist workspace"
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.25)" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-2rem",
                  left: "-2rem",
                  width: "12rem",
                  height: "12rem",
                  backgroundColor: "#f5d061",
                  borderRadius: "0.75rem",
                  zIndex: 0,
                }}
              />
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          style={{ backgroundColor: "#f5f3f3", padding: "8rem 2rem" }}
        >
          <div
            style={{
              maxWidth: "80rem",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            {/* Card */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "3rem",
                borderRadius: "0.75rem",
                boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  marginBottom: "1.5rem",
                  color: "#1b1c1c",
                }}
              >
                Expertise In Core &amp; Mobile
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#4d4636", fontSize: "1.125rem", lineHeight: 1.7 }}>
                <p style={{ margin: 0 }}>
                  With over a decade of combined experience, we bridge the gap between complex backend systems and intuitive mobile interfaces.
                </p>
                <p style={{ margin: 0 }}>
                  Our philosophy is rooted in <strong>Type-Safe</strong> development, focusing on Java's scalability and Android's high-performance ecosystem.
                </p>
              </div>
              <div style={{ paddingTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {["Java Expert", "Android Specialist", "Architecture Design"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: "#f5d061",
                      color: "#6f5800",
                      padding: "0.5rem 1.5rem",
                      borderRadius: "9999px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Text */}
            <div>
              <span
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#735c00",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  display: "block",
                  marginBottom: "1.5rem",
                }}
              >
                01. The Approach
              </span>
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: "2rem",
                  color: "#1b1c1c",
                }}
              >
                Crafting solutions with precision and editorial intent.
              </h3>
              <div style={{ width: "6rem", height: "4px", backgroundColor: "#735c00" }} />
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ padding: "8rem 2rem", backgroundColor: "#fbf9f9" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "5rem",
                gap: "2rem",
              }}
            >
              <div style={{ maxWidth: "36rem" }}>
                <span
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#546066",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  02. Selected Works
                </span>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    margin: 0,
                    color: "#1b1c1c",
                  }}
                >
                  Handcrafted Software.
                </h2>
              </div>
              <a
                href="https://github.com"
                style={{
                  color: "#735c00",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  borderBottom: "2px solid #f5d061",
                  paddingBottom: "0.25rem",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
              >
                Browse GitHub
              </a>
            </div>

            {/* Bento Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "2rem",
              }}
            >
              {/* Modern UI Kit — col-span-8 */}
              <ProjectCard
                style={{ gridColumn: "span 8" }}
                icon="brush"
                title="Modern_UI_Kit"
                description="A collection of high-performance Android components designed for speed and consistency across diverse device ecosystems."
                imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDFYVMAkrtpSIuSDZPcvQphPf5KGnVexchmvQt8Zw-xmfc-7BnWovoqs0byNTXx9oaM2kNRtCVbtBUpmH-rPIcwPs3KAC0vP9C9pAeQkopB3MN0ZQlXeDhfEsyTh6j5tyqUE8jt4y9TzADv2LGriuBqdnc62-PEW5shSI_v_R55B9KWhJpvcQFWZHaPUK7nE7FfzjZlnojoKRxeDDqpSO_SLqZHpQ9fWeuxk_bdKxpDRVPvCHogfgWi8V7IARR5sMQ8QoSamXsNky8"
                imgAlt="Modern UI components displayed on mobile screens"
                aspectRatio="16/9"
              />

              {/* Tech Stack — col-span-4 */}
              <div
                id="tech-stack"
                style={{
                  gridColumn: "span 4",
                  backgroundColor: "#735c00",
                  color: "#ffffff",
                  borderRadius: "0.75rem",
                  padding: "3rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
                }}
              >
                <div>
                  <span
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      opacity: 0.7,
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      display: "block",
                      marginBottom: "2rem",
                    }}
                  >
                    Capabilities
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "2rem",
                      fontWeight: 800,
                      marginBottom: "3rem",
                    }}
                  >
                    The Stack.
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {["Java SE/EE", "Android SDK", "ReactiveX", "Kotlin Multiplatform", "Dagger/Hilt", "Jetpack Compose"].map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "1.25rem",
                        }}
                      >
                        <span
                          style={{
                            width: "0.5rem",
                            height: "0.5rem",
                            backgroundColor: "#f5d061",
                            borderRadius: "9999px",
                            flexShrink: 0,
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p style={{ color: "#f5d061", fontSize: "0.875rem", lineHeight: 1.6, opacity: 0.9, marginTop: "3rem" }}>
                  Always evolving, always building for the next frontier of performance.
                </p>
              </div>

              {/* Reactive Server — col-span-6 */}
              <ProjectCard
                style={{ gridColumn: "span 6" }}
                icon="lan"
                title="Reactive_Server"
                badge="v2.4.0"
                description="A highly scalable Java backbone designed to handle millions of concurrent connections with minimal latency overhead."
                imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuB6_gcJydABHqO1iQFJTs1sAgNVL_PES0rsOd2D4N3NHzNtncrELNjigeoL2P1gobpxEpG6rIWAkkexa2NeV6gZyrMkGilDtp7Yjcg0__826_2bA9VTDXe6-BVI_MV_XN2rCTLLRQAofuFBeQuP2UbcbFlWWHgB7GQl2Xpe_6MtK2e9tlxmw1pTTFVM6q6maCNPkrBdvm7SVNpvvPtvNAD4gml0yjmKvtsCZrrKjRpYPUEqt4HH-V3AZk7cqssCnMOYVJEHl9GWsqc"
                imgAlt="Abstract server network visualization"
                aspectRatio="1/1"
                grayscale
              />

              {/* Core Analytics — col-span-6 */}
              <ProjectCard
                style={{ gridColumn: "span 6", backgroundColor: "#efeded" }}
                icon="monitoring"
                title="Core_Analytics"
                badge="Released"
                description="Lightweight, privacy-first data processing engine for Android applications to monitor engagement in real-time."
                imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuC2SnlXIcKvc9ppuwG3V17qhTHaZLWN0J6TBGd_hP9HwgnEMp-FKFKuIG_iyMo7UI_ZDKUCR-euUHNunzzqy-rT-A2AiXaWpCdTQJ39z7hAdM0gc5j-QX3zL4SmMwuczj8VkZUPLwJx5JpFxBuw-oOF611JLCLgG0fPAYpRa-iqoEFQTCw15FBkYxJQdq7GoAhndBqvtkgswu_xmcOgDc2d8Qv3efaSKWyLTx_u353FtVUkNDtjCU2RhfFjAXUb3lJBtqwGlLa_1C0"
                imgAlt="Clean data dashboard visualization"
                aspectRatio="16/9"
              />
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "8rem 2rem", backgroundColor: "#f5f3f3" }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#735c00",
                fontWeight: 700,
                fontSize: "0.75rem",
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              03. Collaboration
            </span>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                marginBottom: "3rem",
                color: "#1b1c1c",
              }}
            >
              Initiate Project.
            </h2>

            {/* Contact Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "2rem",
                marginBottom: "4rem",
                textAlign: "left",
              }}
            >
              {[
                { name: "Lakshyaveer Singh", phone: "+91 81304 17748", tel: "+918130417748" },
                { name: "Amit Upadhyay", phone: "+91 91401 42098", tel: "+919140142098" },
              ].map((person) => (
                <div
                  key={person.name}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "2rem",
                    borderRadius: "0.75rem",
                    boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
                    border: "1px solid rgba(208,198,176,0.3)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      marginBottom: "1rem",
                      color: "#1b1c1c",
                    }}
                  >
                    {person.name}
                  </h3>
                  <a
                    href={`tel:${person.tel}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "#546066",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "#735c00" }}>call</span>
                    {person.phone}
                  </a>
                  <div style={{ display: "flex", gap: "1rem", paddingTop: "0.75rem" }}>
                    {["LinkedIn", "GitHub"].map((link) => (
                      <a
                        key={link}
                        href="#"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#546066",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>
                          {link === "LinkedIn" ? "link" : "code"}
                        </span>
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "3rem",
                borderRadius: "0.75rem",
                boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "2rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  { label: "Full Name", placeholder: "John Doe", type: "text" },
                  { label: "Email Address", placeholder: "john@company.com", type: "email" },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#546066",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%",
                        backgroundColor: "#f5f3f3",
                        border: "none",
                        borderRadius: "0.25rem",
                        padding: "1rem 1.5rem",
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "1rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#546066",
                    marginBottom: "0.75rem",
                  }}
                >
                  Project Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your next big idea..."
                  style={{
                    width: "100%",
                    backgroundColor: "#f5f3f3",
                    border: "none",
                    borderRadius: "0.25rem",
                    padding: "1rem 1.5rem",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "1rem",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}>
                <button
                  onClick={(e) => e.preventDefault()}
                  style={{
                    backgroundColor: "#735c00",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    padding: "1.25rem 4rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Send Request
                </button>
              </div>
            </div>

            {/* Footer links */}
            <div
              style={{
                marginTop: "5rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "3rem",
                color: "#546066",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "1.125rem",
              }}
            >
              <a href="mailto:hello@example.com" style={{ color: "inherit", textDecoration: "none" }}>
                hello@lakshyaveer-amit.dev
              </a>
              <span style={{ width: "0.5rem", height: "0.5rem", backgroundColor: "#d0c6b0", borderRadius: "9999px" }} />
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "#fafaf9" }}>
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "4rem 2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1c1917" }}>
            Lakshyaveer &amp; Amit
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["GitHub", "LinkedIn", "Twitter", "Email"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: "#78716c",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  opacity: 0.8,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.target.style.color = "#92400e"; e.target.style.opacity = "1"; }}
                onMouseLeave={(e) => { e.target.style.color = "#78716c"; e.target.style.opacity = "0.8"; }}
              >
                {link}
              </a>
            ))}
          </div>
          <div style={{ color: "#78716c", fontFamily: "'Manrope', sans-serif", fontSize: "0.875rem" }}>
            © 2024 Lakshyaveer &amp; Amit. Handcrafted with precision.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Reusable Project Card ─────────────────────────────────────────────────────
function ProjectCard({ style, icon, title, badge, description, imgSrc, imgAlt, aspectRatio, grayscale }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        overflow: "hidden",
        boxShadow: "0 12px 32px rgba(27,28,28,0.06)",
        ...style,
      }}
    >
      <div style={{ padding: "3rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "2.25rem", color: "#735c00" }}>{icon}</span>
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  margin: 0,
                  color: "#1b1c1c",
                }}
              >
                {title}
              </h3>
            </div>
            {badge && (
              <span
                style={{
                  backgroundColor: "#e4e2e2",
                  padding: "0.25rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#1b1c1c",
                }}
              >
                {badge}
              </span>
            )}
          </div>
          <p style={{ color: "#4d4636", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "36rem" }}>
            {description}
          </p>
        </div>
        <div
          style={{
            aspectRatio,
            backgroundColor: "#e9e8e8",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          <img
            src={imgSrc}
            alt={imgAlt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: grayscale ? "grayscale(1) brightness(0.75)" : "none",
              transition: "all 0.7s",
            }}
          />
        </div>
      </div>
    </div>
  );
}