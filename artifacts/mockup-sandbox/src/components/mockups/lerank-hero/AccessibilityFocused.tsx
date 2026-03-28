/*
  Variant C — Accessibility & Readability
  ────────────────────────────────────────
  Hypothesis: Maximize legibility and inclusivity above visual flair.
  - WCAG AA contrast on all text (no text below 4.5:1 ratio)
  - Body copy at 17px, generous 1.85 leading
  - No glass/blur effects that degrade contrast
  - All interactive elements have visible focus indicators
  - Semantic structure: explicit labels, no icon-only affordances
  - Generous whitespace — 1.5x spacing scale throughout
  Tradeoff: no backdrop-filter effects, no decorative orbs, less
  brand expressiveness in exchange for universal legibility.
*/

import { ArrowRight, CheckCircle, Clock, Lock, Star, Users } from "lucide-react";

export function AccessibilityFocused() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF8",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        color: "#0F1410",
      }}
    >
      {/* Skip to content link (accessibility) */}
      <a
        href="#main"
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          background: "#1E3D28",
          color: "#fff",
          padding: "8px 16px",
          fontSize: 14,
          fontWeight: 700,
          zIndex: 1000,
        }}
      >
        Skip to main content
      </a>

      {/* ── Nav — high contrast, no blur ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 56px",
          borderBottom: "2px solid #E0DDD8",
          background: "#FAFAF8",
        }}
        aria-label="Main navigation"
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: 24,
            color: "#0F1410",
            letterSpacing: "-0.5px",
          }}
        >
          Lerank
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {["How It Works", "The Problem", "Guarantee"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#0F1410",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: 6,
              }}
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="/signup"
          style={{
            background: "#1E3D28",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 10,
            padding: "11px 24px",
            fontSize: 15,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Get Started
          <ArrowRight size={15} />
        </a>
      </nav>

      {/* ── Main hero ── */}
      <main
        id="main"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "64px 56px 48px",
          maxWidth: 820,
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Status label — high contrast badge, no glass */}
        <p
          role="status"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#E8F0E9",
            color: "#1E3D28",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 32,
            letterSpacing: "0.01em",
          }}
        >
          <Lock size={13} aria-hidden="true" />
          Escrow-protected consulting marketplace
        </p>

        {/* Heading — large, high contrast, no decorative weight variation */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            color: "#0F1410",
            margin: "0 0 24px",
            letterSpacing: "-0.5px",
          }}
        >
          Premium Guidance.{" "}
          <span
            style={{
              color: "#7A5C1E",
              display: "block",
            }}
          >
            Real Accountability.
          </span>
        </h1>

        {/* Body — 17px, 1.85 leading, near-black for max contrast */}
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.85,
            color: "#2A2E2A",
            maxWidth: 520,
            marginBottom: 40,
          }}
        >
          The trust-first marketplace to compare and hire top education consultants.
          Payments are held in escrow and released only when your consultant
          delivers verified milestones — zero risk to you.
        </p>

        {/* CTAs — full text labels, no icon-only, clear hierarchy */}
        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 48,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="/compare"
            style={{
              background: "#1E3D28",
              color: "#fff",
              textDecoration: "none",
              borderRadius: 12,
              padding: "16px 34px",
              fontSize: 16,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 2px 0 rgba(0,0,0,0.2)",
            }}
          >
            Find a Consultant
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            href="/register?role=consultant"
            style={{
              background: "#fff",
              color: "#1E3D28",
              textDecoration: "none",
              border: "2.5px solid #1E3D28",
              borderRadius: 12,
              padding: "16px 34px",
              fontSize: 16,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            Join as a Consultant
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Trust stats — visible labels, no decorative dividers, clear semantic structure */}
        <dl
          style={{
            display: "flex",
            gap: 0,
            width: "100%",
            borderTop: "2px solid #E0DDD8",
            paddingTop: 28,
            marginBottom: 40,
          }}
          aria-label="Platform statistics"
        >
          {[
            { icon: Users,       value: "2,400+", label: "Students matched successfully" },
            { icon: Star,        value: "94%",    label: "Student satisfaction rate" },
            { icon: CheckCircle, value: "$0",     label: "Lost to payment disputes" },
            { icon: Clock,       value: "48hrs",  label: "Average first response" },
          ].map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "0 12px",
                borderRight: i < 3 ? "1.5px solid #E0DDD8" : "none",
              }}
            >
              <Icon size={16} color="#1E3D28" aria-hidden="true" style={{ marginBottom: 4 }} />
              <dt
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0F1410",
                  lineHeight: 1,
                }}
              >
                {value}
              </dt>
              <dd
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#555",
                  textAlign: "center",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Dashboard preview — with alt text and caption */}
        <figure style={{ width: "100%", margin: 0 }}>
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: "2px solid #D8D4CD",
              boxShadow: "0 6px 32px rgba(0,0,0,0.09)",
              background: "#eee",
              aspectRatio: "16/7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/__replco/static/assets/dashboard-preview.png"
              alt="Screenshot of the Lerank student dashboard showing consultant matches, milestone tracking, and escrow balance"
              style={{ width: "100%", display: "block" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <figcaption
            style={{
              fontSize: 13,
              color: "#666",
              fontWeight: 500,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            The Lerank student dashboard — compare consultants, track milestones, monitor escrow
          </figcaption>
        </figure>
      </main>

      {/* Tradeoff annotation */}
      <div
        style={{
          textAlign: "center",
          padding: "12px 20px",
          background: "#F0EDE6",
          borderTop: "2px solid #E0DDD8",
          fontSize: 11,
          color: "#666",
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
      >
        TRADEOFF: WCAG AA contrast + semantic HTML + 17px body text → no glass effects, no decorative animations
      </div>
    </div>
  );
}
