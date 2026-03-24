export default function DashboardSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#1E3D28" }}>
      <div className="premium-grid-overlay absolute inset-0" style={{ opacity: 0.7 }} />
      <div className="absolute" style={{ top: 0, left: 0, width: "35vw", height: "100vh", background: "radial-gradient(ellipse at top left, rgba(201,168,76,0.12) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 flex" style={{ padding: "7vh 7vw", gap: "5vw" }}>
        <div style={{ flex: "0 0 38vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "2vh" }}>
            Shared Dashboard
          </div>
          <h2 className="font-display" style={{ fontSize: "4vw", fontWeight: 900, color: "#ECEAE2", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "3.5vh" }}>
            Full visibility,<br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C, #E8D9A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>both sides</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.4vw", color: "rgba(236,234,226,0.75)", lineHeight: 1.65, fontWeight: 400, marginBottom: "4vh" }}>
            Students and consultants share a real-time dashboard. Every deliverable is tracked with timestamped updates — no more communication blackouts.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.35vw", height: "3vh", backgroundColor: "#C9A84C", borderRadius: "2px", flexShrink: 0 }} />
              <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.8)", fontWeight: 400 }}>Application progress tracking</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.35vw", height: "3vh", backgroundColor: "#C9A84C", borderRadius: "2px", flexShrink: 0 }} />
              <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.8)", fontWeight: 400 }}>Escrow balance and release history</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.35vw", height: "3vh", backgroundColor: "#C9A84C", borderRadius: "2px", flexShrink: 0 }} />
              <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.8)", fontWeight: 400 }}>Activity feed with milestone updates</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.35vw", height: "3vh", backgroundColor: "#C9A84C", borderRadius: "2px", flexShrink: 0 }} />
              <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.8)", fontWeight: 400 }}>Dispute workflow with 48h resolution</p>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2vh" }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "1.2rem", padding: "2.5vh 2vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.55)", marginBottom: "2vh", fontWeight: 500 }}>Dashboard Overview</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5vh 1.5vw" }}>
              <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", padding: "1.8vh 1.5vw" }}>
                <p className="font-body" style={{ fontSize: "0.9vw", color: "rgba(236,234,226,0.5)", marginBottom: "0.5vh" }}>Active Applications</p>
                <p className="font-display" style={{ fontSize: "2.8vw", fontWeight: 900, color: "#C9A84C" }}>3</p>
              </div>
              <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", padding: "1.8vh 1.5vw" }}>
                <p className="font-body" style={{ fontSize: "0.9vw", color: "rgba(236,234,226,0.5)", marginBottom: "0.5vh" }}>Escrow Balance</p>
                <p className="font-display" style={{ fontSize: "2.8vw", fontWeight: 900, color: "#C9A84C" }}>$1,200</p>
              </div>
              <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", padding: "1.8vh 1.5vw" }}>
                <p className="font-body" style={{ fontSize: "0.9vw", color: "rgba(236,234,226,0.5)", marginBottom: "0.5vh" }}>Milestones This Wk</p>
                <p className="font-display" style={{ fontSize: "2.8vw", fontWeight: 900, color: "#ECEAE2" }}>2</p>
              </div>
              <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", padding: "1.8vh 1.5vw" }}>
                <p className="font-body" style={{ fontSize: "0.9vw", color: "rgba(236,234,226,0.5)", marginBottom: "0.5vh" }}>Total Released</p>
                <p className="font-display" style={{ fontSize: "2.8vw", fontWeight: 900, color: "#ECEAE2" }}>$800</p>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "1rem", padding: "2.5vh 2vw", border: "1px solid rgba(201,168,76,0.15)" }}>
            <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.55)", marginBottom: "1.5vh", fontWeight: 500 }}>Recent Activity</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
              <div style={{ display: "flex", gap: "1vw", alignItems: "center" }}>
                <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#C9A84C", borderRadius: "50%", flexShrink: 0 }} />
                <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>Milestone "SOP Draft 1" approved — $400 released</p>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "center" }}>
                <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#2D5A3E", borderRadius: "50%", flexShrink: 0 }} />
                <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>University shortlist submitted for review</p>
              </div>
              <div style={{ display: "flex", gap: "1vw", alignItems: "center" }}>
                <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#2D5A3E", borderRadius: "50%", flexShrink: 0 }} />
                <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>Application Review Round 1 started</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
