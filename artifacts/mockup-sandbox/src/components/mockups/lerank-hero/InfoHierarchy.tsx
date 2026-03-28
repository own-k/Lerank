/*
  Variant A — Clarity of Information Hierarchy
  ─────────────────────────────────────────────
  Hypothesis: Strip the hero to a single clear scanpath.
  The user's eye moves: trust badge → headline → value prop → ONE primary CTA.
  Stats are shown prominently before body copy so the credibility signal lands
  before the explanation. The secondary CTA ("I'm a consultant") is pushed below
  the fold entirely — the tradeoff is reduced immediate access for consultants
  in exchange for zero decision paralysis for students.
*/

import { ArrowRight, Lock, ShieldCheck, Star, Users } from "lucide-react";

const STATS = [
  { value: "2,400+", label: "Students matched", icon: Users },
  { value: "94%",    label: "Satisfaction rate", icon: Star },
  { value: "$0",     label: "Lost to disputes",  icon: ShieldCheck },
];

export function InfoHierarchy() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F1EA",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Nav ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 48px",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          background: "rgba(245,241,234,0.92)",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#111811",
            letterSpacing: "-0.5px",
          }}
        >
          Lerank
        </span>
        <div style={{ display: "flex", gap: 32, fontSize: 14, fontWeight: 600, color: "#444" }}>
          <span>How It Works</span>
          <span>The Problem</span>
          <span>Guarantee</span>
        </div>
        <button
          style={{
            background: "#1E3D28",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 22px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Get Started →
        </button>
      </nav>

      {/* ── Hero body ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "56px 48px 48px",
          maxWidth: 760,
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* 1 — Trust badge: first anchor of scanpath */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(30,61,40,0.09)",
            border: "1px solid rgba(30,61,40,0.18)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: 12,
            fontWeight: 700,
            color: "#1E3D28",
            marginBottom: 28,
            letterSpacing: "0.02em",
          }}
        >
          <Lock size={12} />
          Escrow-protected consulting marketplace
        </div>

        {/* 2 — Headline: the biggest element, clear hierarchy level */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            color: "#111811",
            margin: "0 0 20px",
            letterSpacing: "-1px",
          }}
        >
          Premium Guidance.
          <br />
          <span style={{ color: "#C9A84C" }}>Real Accountability.</span>
        </h1>

        {/* 3 — Stats: credibility before explanation */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: 28,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.09)",
            background: "#fff",
          }}
        >
          {STATS.map(({ value, label, icon: Icon }, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "18px 20px",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icon size={14} color="#1E3D28" style={{ marginBottom: 2 }} />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#111811",
                }}
              >
                {value}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* 4 — Value prop: explains after stats hook */}
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "#555",
            maxWidth: 440,
            marginBottom: 36,
          }}
        >
          The trust-first marketplace to compare and hire top consultants.
          Payments held in escrow until your consultant delivers verified milestones.
        </p>

        {/* 5 — Single primary CTA: no choice paralysis */}
        <button
          style={{
            background: "#1E3D28",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "15px 36px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 4px 18px rgba(30,61,40,0.25)",
          }}
        >
          Find a Consultant
          <ArrowRight size={17} />
        </button>

        {/* Below fold — secondary CTA hint */}
        <p style={{ marginTop: 14, fontSize: 13, color: "#999", fontWeight: 500 }}>
          Are you a consultant?{" "}
          <span style={{ color: "#1E3D28", fontWeight: 700, textDecoration: "underline", cursor: "pointer" }}>
            Join Lerank
          </span>
        </p>

        {/* Dashboard preview */}
        <div
          style={{
            marginTop: 44,
            width: "100%",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 50px rgba(30,61,40,0.10)",
            background: "#fff",
            aspectRatio: "16/7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ccc",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <img
            src="/__replco/static/assets/dashboard-preview.png"
            alt="Dashboard"
            style={{ width: "100%", display: "block" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span style={{ position: "absolute" }}>Dashboard Preview</span>
        </div>
      </div>

      {/* Tradeoff annotation */}
      <div
        style={{
          textAlign: "center",
          padding: "12px 20px",
          background: "#FDF8EF",
          borderTop: "1px solid #E8DDD3",
          fontSize: 11,
          color: "#999",
          fontWeight: 600,
          letterSpacing: "0.03em",
        }}
      >
        TRADEOFF: Single CTA eliminates choice paralysis → consultant entry point is below fold
      </div>
    </div>
  );
}
