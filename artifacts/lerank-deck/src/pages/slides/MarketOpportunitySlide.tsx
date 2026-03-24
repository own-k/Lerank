export default function MarketOpportunitySlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#ECEAE2" }}>
      <div className="premium-grid-overlay absolute inset-0" style={{ opacity: 0.5 }} />
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "100vh", background: "linear-gradient(135deg, transparent 0%, rgba(30,61,40,0.05) 100%)" }} />
      <div className="absolute inset-0 flex flex-col" style={{ padding: "7vh 7vw" }}>
        <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.5vh" }}>
          Market Opportunity
        </div>
        <h2 className="font-display" style={{ fontSize: "4vw", fontWeight: 800, color: "#111811", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "5vh" }}>
          A massive, underserved <span style={{ color: "#1E3D28" }}>market</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2.5vw", flex: 1, alignContent: "start" }}>
          <div style={{ backgroundColor: "#1E3D28", borderRadius: "1.2rem", padding: "4vh 2.5vw", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(201,168,76,0.7)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2vh" }}>Global EdTech Market</p>
              <div className="font-display" style={{ fontSize: "5.5vw", fontWeight: 900, background: "linear-gradient(135deg, #C9A84C, #E8D9A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, marginBottom: "1vh" }}>$340B</div>
              <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.65)", lineHeight: 1.5, fontWeight: 400 }}>Global EdTech market size estimate — growing approximately 16% annually (HolonIQ)</p>
            </div>
          </div>
          <div style={{ backgroundColor: "white", borderRadius: "1.2rem", padding: "4vh 2.5vw", display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid rgba(30,61,40,0.1)" }}>
            <div>
              <p className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2vh" }}>Study Abroad Market</p>
              <div className="font-display" style={{ fontSize: "5.5vw", fontWeight: 900, color: "#1E3D28", lineHeight: 1, marginBottom: "1vh" }}>6.4M</div>
              <p className="font-body" style={{ fontSize: "1.2vw", color: "#3D4D3F", lineHeight: 1.5, fontWeight: 400 }}>International students enrolled globally, projected to double by 2030</p>
            </div>
          </div>
          <div style={{ backgroundColor: "#1E3D28", borderRadius: "1.2rem", padding: "4vh 2.5vw", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(201,168,76,0.7)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2vh" }}>Central Asia SAM</p>
              <div className="font-display" style={{ fontSize: "5.5vw", fontWeight: 900, background: "linear-gradient(135deg, #C9A84C, #E8D9A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, marginBottom: "1vh" }}>700K+</div>
              <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.65)", lineHeight: 1.5, fontWeight: 400 }}>Students in Central Asia seeking international education guidance annually</p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "3.5vh", backgroundColor: "rgba(30,61,40,0.06)", borderRadius: "0.75rem", padding: "2vh 2.5vw", borderLeft: "0.35vw solid #C9A84C" }}>
          <p className="font-body" style={{ fontSize: "1.3vw", color: "#1E3D28", fontWeight: 600, lineHeight: 1.5 }}>
            Traditional consulting platforms lack escrow protection, verified consultants, and native-language support — Lerank addresses all three.
          </p>
        </div>
      </div>
    </div>
  );
}
