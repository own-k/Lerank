const base = import.meta.env.BASE_URL;

export default function ClosingSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#111811" }}>
      <img
        src={`${base}hero-bg.png`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
        style={{ opacity: 0.35 }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(17,24,17,0.95) 0%, rgba(21,43,28,0.85) 55%, rgba(17,24,17,0.92) 100%)" }} />
      <div className="premium-grid-overlay absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ padding: "7vh 7vw", textAlign: "center" }}>
        <div style={{ marginBottom: "4vh" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.2vw", marginBottom: "4vh" }}>
            <div style={{ width: "0.35vw", height: "4vh", backgroundColor: "#C9A84C", borderRadius: "2px" }} />
            <span className="font-body" style={{ fontSize: "1.6vw", color: "#C9A84C", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>Lerank</span>
            <div style={{ width: "0.35vw", height: "4vh", backgroundColor: "#C9A84C", borderRadius: "2px" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "5.5vw", fontWeight: 900, color: "#ECEAE2", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "2.5vh" }}>
            Apply with confidence.
          </h2>
          <p className="font-body" style={{ fontSize: "2vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.5, fontWeight: 300, maxWidth: "55vw", margin: "0 auto", marginBottom: "5vh" }}>
            The trust-first marketplace to compare and hire top consultants. Payments held in escrow until your consultant delivers verified milestones.
          </p>
        </div>
        <div style={{ display: "flex", gap: "4vw", justifyContent: "center", marginBottom: "5vh" }}>
          <div style={{ textAlign: "center" }}>
            <p className="font-display" style={{ fontSize: "4vw", fontWeight: 900, color: "#C9A84C", lineHeight: 1 }}>2,400+</p>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.6)", fontWeight: 400 }}>Students matched</p>
          </div>
          <div style={{ width: "1px", backgroundColor: "rgba(201,168,76,0.25)" }} />
          <div style={{ textAlign: "center" }}>
            <p className="font-display" style={{ fontSize: "4vw", fontWeight: 900, color: "#C9A84C", lineHeight: 1 }}>94%</p>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.6)", fontWeight: 400 }}>Satisfaction rate</p>
          </div>
          <div style={{ width: "1px", backgroundColor: "rgba(201,168,76,0.25)" }} />
          <div style={{ textAlign: "center" }}>
            <p className="font-display" style={{ fontSize: "4vw", fontWeight: 900, color: "#C9A84C", lineHeight: 1 }}>$0</p>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.6)", fontWeight: 400 }}>Lost to disputes</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
          <div style={{ height: "1px", width: "4vw", backgroundColor: "rgba(201,168,76,0.4)" }} />
          <span className="font-body" style={{ fontSize: "1.3vw", color: "rgba(236,234,226,0.45)", fontWeight: 400 }}>lerank.com</span>
          <div style={{ height: "1px", width: "4vw", backgroundColor: "rgba(201,168,76,0.4)" }} />
        </div>
      </div>
    </div>
  );
}
