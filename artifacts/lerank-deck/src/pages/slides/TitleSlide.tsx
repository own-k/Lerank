const base = import.meta.env.BASE_URL;

export default function TitleSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#111811" }}>
      <img
        src={`${base}hero-bg.png`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
        style={{ opacity: 0.55 }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(21,43,28,0.92) 0%, rgba(17,24,17,0.75) 55%, rgba(21,43,28,0.88) 100%)" }} />
      <div className="premium-grid-overlay absolute inset-0" />
      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: "7vh 7vw" }}>
        <div className="flex items-center justify-between">
          <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
            <div style={{ width: "0.35vw", height: "3.5vh", backgroundColor: "#C9A84C", borderRadius: "2px" }} />
            <span className="font-body font-semibold" style={{ fontSize: "1.4vw", color: "#C9A84C", letterSpacing: "0.18em", textTransform: "uppercase" }}>Lerank</span>
          </div>
          <span className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.55)", letterSpacing: "0.08em" }}>2026</span>
        </div>
        <div style={{ maxWidth: "72vw" }}>
          <div className="font-body" style={{ fontSize: "1.3vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "2.5vh" }}>
            Investor Pitch Deck
          </div>
          <h1 className="font-display" style={{ fontSize: "7vw", lineHeight: 0.92, fontWeight: 900, color: "#ECEAE2", letterSpacing: "-0.02em", marginBottom: "3vh" }}>
            Premium Guidance.
            <br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #D4B96A 60%, #E8D9A8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Real Accountability.</span>
          </h1>
          <p className="font-body" style={{ fontSize: "1.85vw", color: "rgba(236,234,226,0.75)", lineHeight: 1.55, maxWidth: "52vw", fontWeight: 400 }}>
            The trust-first marketplace to compare and hire top educational consultants. Payments held in escrow until verified milestones are delivered.
          </p>
        </div>
        <div className="flex items-center" style={{ gap: "3vw" }}>
          <div style={{ height: "1px", width: "4vw", backgroundColor: "rgba(201,168,76,0.4)" }} />
          <span className="font-body" style={{ fontSize: "1.3vw", color: "rgba(236,234,226,0.5)", fontWeight: 400 }}>Escrow-protected consulting marketplace</span>
        </div>
      </div>
    </div>
  );
}
