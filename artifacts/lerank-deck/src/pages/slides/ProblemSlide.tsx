export default function ProblemSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#ECEAE2" }}>
      <div className="absolute inset-0 premium-grid-overlay" style={{ opacity: 0.6 }} />
      <div className="absolute top-0 right-0" style={{ width: "38vw", height: "100vh", background: "linear-gradient(135deg, transparent 0%, rgba(30,61,40,0.07) 100%)" }} />
      <div className="absolute inset-0 flex flex-col" style={{ padding: "7vh 7vw" }}>
        <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.5vh" }}>
          The Problem
        </div>
        <h2 className="font-display" style={{ fontSize: "4vw", fontWeight: 800, color: "#111811", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "5vh" }}>
          Traditional consulting runs<br />on <span style={{ color: "#1E3D28" }}>blind trust</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2vw", marginBottom: "4vh" }}>
          <div style={{ backgroundColor: "#1E3D28", borderRadius: "1rem", padding: "3.5vh 2.5vw" }}>
            <div className="font-display" style={{ fontSize: "5.5vw", fontWeight: 900, color: "#C9A84C", lineHeight: 1, marginBottom: "1.5vh" }}>67%</div>
            <p className="font-body" style={{ fontSize: "1.3vw", color: "rgba(236,234,226,0.82)", lineHeight: 1.55, fontWeight: 400 }}>of students report communication blackouts during critical application phases</p>
          </div>
          <div style={{ backgroundColor: "#1E3D28", borderRadius: "1rem", padding: "3.5vh 2.5vw" }}>
            <div className="font-display" style={{ fontSize: "5.5vw", fontWeight: 900, color: "#C9A84C", lineHeight: 1, marginBottom: "1.5vh" }}>$3k+</div>
            <p className="font-body" style={{ fontSize: "1.3vw", color: "rgba(236,234,226,0.82)", lineHeight: 1.55, fontWeight: 400 }}>paid upfront on average before any measurable output is delivered</p>
          </div>
          <div style={{ backgroundColor: "#1E3D28", borderRadius: "1rem", padding: "3.5vh 2.5vw" }}>
            <div className="font-display" style={{ fontSize: "5.5vw", fontWeight: 900, color: "#C9A84C", lineHeight: 1, marginBottom: "1.5vh" }}>1 in 4</div>
            <p className="font-body" style={{ fontSize: "1.3vw", color: "rgba(236,234,226,0.82)", lineHeight: 1.55, fontWeight: 400 }}>students feel they were oversold on admission outcomes</p>
          </div>
        </div>
        <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2.5vh 2.5vw", border: "1px solid rgba(30,61,40,0.12)", display: "flex", alignItems: "flex-start", gap: "2vw" }}>
          <div style={{ width: "0.35vw", minHeight: "6vh", backgroundColor: "#C9A84C", borderRadius: "2px", flexShrink: 0, marginTop: "0.3vh" }} />
          <div>
            <p className="font-display" style={{ fontSize: "1.7vw", fontWeight: 700, color: "#1E3D28", lineHeight: 1.3, marginBottom: "1vh" }}>The incentive is misaligned</p>
            <p className="font-body" style={{ fontSize: "1.3vw", color: "#3D4D3F", lineHeight: 1.6, fontWeight: 400 }}>When a consultant is paid upfront, the financial incentive to maintain quality disappears. Students have no leverage once payment is made — no refund, no transparency, no accountability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
