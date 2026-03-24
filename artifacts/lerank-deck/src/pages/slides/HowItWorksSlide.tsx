export default function HowItWorksSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#ECEAE2" }}>
      <div className="premium-grid-overlay absolute inset-0" style={{ opacity: 0.5 }} />
      <div className="absolute inset-0 flex flex-col" style={{ padding: "6.5vh 7vw" }}>
        <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.5vh" }}>
          How It Works
        </div>
        <h2 className="font-display" style={{ fontSize: "3.8vw", fontWeight: 800, color: "#111811", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "5vh" }}>
          Three steps built around <span style={{ color: "#1E3D28" }}>your protection</span>
        </h2>
        <div style={{ display: "flex", gap: "2.5vw", marginBottom: "4vh", flex: 1 }}>
          <div style={{ flex: 1, backgroundColor: "white", borderRadius: "1rem", padding: "3.5vh 2.5vw", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0.4vh", backgroundColor: "#C9A84C" }} />
            <div className="font-display" style={{ fontSize: "5vw", fontWeight: 900, color: "rgba(30,61,40,0.1)", lineHeight: 1, marginBottom: "1.5vh" }}>01</div>
            <p className="font-display" style={{ fontSize: "1.7vw", fontWeight: 700, color: "#1E3D28", marginBottom: "1.5vh", lineHeight: 1.2 }}>Build your profile</p>
            <p className="font-body" style={{ fontSize: "1.25vw", color: "#3D4D3F", lineHeight: 1.65, fontWeight: 400 }}>Enter your academic background — GPA, test scores, target degree level, budget, and destination countries. Takes under two minutes.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "#C9A84C", fontSize: "2vw" }}>&#8594;</div>
          <div style={{ flex: 1, backgroundColor: "#1E3D28", borderRadius: "1rem", padding: "3.5vh 2.5vw", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0.4vh", backgroundColor: "#C9A84C" }} />
            <div className="font-display" style={{ fontSize: "5vw", fontWeight: 900, color: "rgba(201,168,76,0.15)", lineHeight: 1, marginBottom: "1.5vh" }}>02</div>
            <p className="font-display" style={{ fontSize: "1.7vw", fontWeight: 700, color: "#ECEAE2", marginBottom: "1.5vh", lineHeight: 1.2 }}>Compare consultants</p>
            <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.75)", lineHeight: 1.65, fontWeight: 400 }}>Browse ranked matches tailored precisely to your profile. Filter by country, rating, and price. Compare multiple consultants side by side.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "#C9A84C", fontSize: "2vw" }}>&#8594;</div>
          <div style={{ flex: 1, backgroundColor: "white", borderRadius: "1rem", padding: "3.5vh 2.5vw", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0.4vh", backgroundColor: "#C9A84C" }} />
            <div className="font-display" style={{ fontSize: "5vw", fontWeight: 900, color: "rgba(30,61,40,0.1)", lineHeight: 1, marginBottom: "1.5vh" }}>03</div>
            <p className="font-display" style={{ fontSize: "1.7vw", fontWeight: 700, color: "#1E3D28", marginBottom: "1.5vh", lineHeight: 1.2 }}>Hire with escrow</p>
            <p className="font-body" style={{ fontSize: "1.25vw", color: "#3D4D3F", lineHeight: 1.65, fontWeight: 400 }}>Fund milestones in escrow. Payment is released only after you review and approve each deliverable. Dispute resolution within 48 hours.</p>
          </div>
        </div>
        <div style={{ backgroundColor: "rgba(30,61,40,0.06)", borderRadius: "0.75rem", padding: "2vh 2.5vw", borderLeft: "0.35vw solid #C9A84C" }}>
          <p className="font-body" style={{ fontSize: "1.3vw", color: "#1E3D28", fontWeight: 600, lineHeight: 1.5 }}>
            Lerank escrow keeps the financial incentive aligned from start to finish — consultants earn by delivering, not by promising.
          </p>
        </div>
      </div>
    </div>
  );
}
