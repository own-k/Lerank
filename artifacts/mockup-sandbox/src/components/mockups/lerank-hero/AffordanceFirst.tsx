/*
  Variant B — Ease of Interaction & Affordance Visibility
  ────────────────────────────────────────────────────────
  Hypothesis: Every interactive element must look obviously clickable.
  Both CTAs are visually distinct, equally-weighted pill buttons with icons
  and explicit labels. A "96% match badge" on the card suggests interactivity.
  Stats have a subtle hover-ring to suggest they're explorable.
  Tradeoff: higher visual weight — more button mass means less whitespace
  and a heavier above-fold, but nothing is ambiguous to the eye.
*/

import { ArrowRight, Building2, GraduationCap, Lock, Search, ShieldCheck } from "lucide-react";

export function AffordanceFirst() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(170deg, #F0EDE6 0%, #E8E2D8 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Nav — all items look tappable ── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 48px",
          background: "rgba(240,237,230,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: 22,
            color: "#111811",
          }}
        >
          Lerank
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {["How It Works", "The Problem", "Guarantee"].map((item) => (
            <button
              key={item}
              style={{
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.10)",
                borderRadius: 8,
                padding: "7px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: "#333",
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}
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
          Sign In →
        </button>
      </nav>

      {/* ── Two-column layout ── */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 48,
          alignItems: "center",
          padding: "48px 64px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Left column */}
        <div>
          {/* Trust pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(30,61,40,0.08)",
              border: "1px solid rgba(30,61,40,0.15)",
              borderRadius: 100,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 700,
              color: "#1E3D28",
              marginBottom: 24,
            }}
          >
            <ShieldCheck size={12} />
            Escrow-protected marketplace
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#111811",
              margin: "0 0 16px",
              letterSpacing: "-0.5px",
            }}
          >
            Premium Guidance.
            <br />
            <span style={{ color: "#C9A84C" }}>Real Accountability.</span>
          </h1>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "#666",
              marginBottom: 32,
              maxWidth: 420,
            }}
          >
            Compare vetted education consultants. Pay only when they deliver.
            Your funds stay locked in escrow until each milestone is confirmed.
          </p>

          {/* ── TWO equally-afforded CTAs ── */}
          <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
            <button
              style={{
                background: "#1E3D28",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px 26px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 20px rgba(30,61,40,0.28)",
              }}
            >
              <GraduationCap size={17} />
              Find My Consultant
              <ArrowRight size={15} />
            </button>
            <button
              style={{
                background: "#fff",
                color: "#1E3D28",
                border: "2px solid #1E3D28",
                borderRadius: 12,
                padding: "14px 26px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Building2 size={17} />
              Join as Consultant
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Search hint — interaction affordance */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#fff",
              border: "1.5px solid #D4C9BC",
              borderRadius: 10,
              padding: "12px 16px",
              cursor: "text",
              maxWidth: 400,
            }}
          >
            <Search size={15} color="#999" />
            <span style={{ fontSize: 14, color: "#aaa", fontWeight: 500 }}>
              Search by destination: "UK universities"…
            </span>
          </div>

          {/* Stats with clear click affordance ring */}
          <div style={{ display: "flex", gap: 20, marginTop: 28 }}>
            {[
              { v: "2,400+", l: "Students matched" },
              { v: "94%", l: "Satisfaction" },
              { v: "$0", l: "Disputes lost" },
            ].map(({ v, l }, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1.5px solid #D4C9BC",
                  background: "#fff",
                  cursor: "pointer",
                  textAlign: "center",
                  minWidth: 80,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#111811",
                  }}
                >
                  {v}
                </div>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — consultant card with clear interactive zones */}
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1px solid rgba(0,0,0,0.09)",
            boxShadow: "0 8px 36px rgba(0,0,0,0.10)",
            padding: 24,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                Your top match
              </p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#111811" }}>
                Mr. Shojalil Kosimov
              </h3>
            </div>
            <span
              style={{
                background: "#1E3D28",
                color: "#fff",
                borderRadius: 100,
                padding: "5px 12px",
                fontSize: 12,
                fontWeight: 700,
                height: "fit-content",
              }}
            >
              96% match
            </span>
          </div>

          {/* Stat chips — all with border = looks interactive */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
            {[
              { v: "4.9", l: "Rating" },
              { v: "312", l: "Students" },
              { v: "97%", l: "Success" },
            ].map(({ v, l }, i) => (
              <div
                key={i}
                style={{
                  background: "#F5F1EA",
                  border: "1px solid #DDD5C8",
                  borderRadius: 10,
                  padding: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800 }}>{v}</div>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Milestones with clear checkboxes */}
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#aaa", letterSpacing: "0.05em", marginBottom: 10 }}>
              Active milestones
            </p>
            {[
              { label: "Personal statement review", done: true },
              { label: "University shortlisting", done: true },
              { label: "Application submission", done: false },
            ].map(({ label, done }, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 0",
                  borderBottom: "1px solid #f0ece6",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: done ? "none" : "2px solid #ccc",
                    background: done ? "#1E3D28" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {done && <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✓</span>}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: done ? "#aaa" : "#111",
                    textDecoration: done ? "line-through" : "none",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Escrow CTA — most prominent card action */}
          <button
            style={{
              width: "100%",
              background: "#1E3D28",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "13px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Lock size={14} />
            View Escrow Balance · $1,200
            <ArrowRight size={14} />
          </button>

          <button
            style={{
              width: "100%",
              marginTop: 8,
              background: "transparent",
              color: "#1E3D28",
              border: "1.5px solid #1E3D28",
              borderRadius: 10,
              padding: "11px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Compare Other Consultants
          </button>
        </div>
      </div>

      {/* Tradeoff annotation */}
      <div
        style={{
          textAlign: "center",
          padding: "10px 20px",
          background: "#FDF8EF",
          borderTop: "1px solid #E8DDD3",
          fontSize: 11,
          color: "#999",
          fontWeight: 600,
          letterSpacing: "0.03em",
        }}
      >
        TRADEOFF: All interactive elements are obvious → heavier visual weight, less whitespace breathing room
      </div>
    </div>
  );
}
