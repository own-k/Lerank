export default function EscrowSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#111811" }}>
      <div className="premium-grid-overlay absolute inset-0" />
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "100vh", background: "radial-gradient(ellipse at top right, rgba(201,168,76,0.1) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 flex" style={{ padding: "7vh 7vw", gap: "6vw" }}>
        <div style={{ flex: "0 0 48vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "2vh" }}>
            Escrow System
          </div>
          <h2 className="font-display" style={{ fontSize: "4vw", fontWeight: 900, color: "#ECEAE2", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "4vh" }}>
            Milestone escrow.<br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C, #E8D9A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Both sides protected.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw" }}>
            <div>
              <p className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5vh" }}>For Students</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
                <div style={{ display: "flex", gap: "0.8vw", alignItems: "flex-start" }}>
                  <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#C9A84C", borderRadius: "50%", marginTop: "0.6vh", flexShrink: 0 }} />
                  <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.8)", lineHeight: 1.5, fontWeight: 400 }}>Pay per milestone, not upfront in full</p>
                </div>
                <div style={{ display: "flex", gap: "0.8vw", alignItems: "flex-start" }}>
                  <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#C9A84C", borderRadius: "50%", marginTop: "0.6vh", flexShrink: 0 }} />
                  <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.8)", lineHeight: 1.5, fontWeight: 400 }}>Dispute any deliverable before releasing funds</p>
                </div>
                <div style={{ display: "flex", gap: "0.8vw", alignItems: "flex-start" }}>
                  <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#C9A84C", borderRadius: "50%", marginTop: "0.6vh", flexShrink: 0 }} />
                  <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.8)", lineHeight: 1.5, fontWeight: 400 }}>Full refund for incomplete milestones</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5vh" }}>For Consultants</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
                <div style={{ display: "flex", gap: "0.8vw", alignItems: "flex-start" }}>
                  <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#2D5A3E", borderRadius: "50%", marginTop: "0.6vh", flexShrink: 0 }} />
                  <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.8)", lineHeight: 1.5, fontWeight: 400 }}>Guaranteed payment upon milestone approval</p>
                </div>
                <div style={{ display: "flex", gap: "0.8vw", alignItems: "flex-start" }}>
                  <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#2D5A3E", borderRadius: "50%", marginTop: "0.6vh", flexShrink: 0 }} />
                  <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.8)", lineHeight: 1.5, fontWeight: 400 }}>Clear milestone scope prevents scope creep</p>
                </div>
                <div style={{ display: "flex", gap: "0.8vw", alignItems: "flex-start" }}>
                  <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#2D5A3E", borderRadius: "50%", marginTop: "0.6vh", flexShrink: 0 }} />
                  <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.8)", lineHeight: 1.5, fontWeight: 400 }}>Automated release — no chasing invoices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2vh" }}>
          <div style={{ backgroundColor: "rgba(201,168,76,0.1)", borderRadius: "1rem", padding: "2.5vh 2vw", border: "1px solid rgba(201,168,76,0.25)" }}>
            <p className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", fontWeight: 600, marginBottom: "0.8vh", letterSpacing: "0.06em" }}>LERANK PROMISE</p>
            <p className="font-display" style={{ fontSize: "1.5vw", fontWeight: 700, color: "#ECEAE2", lineHeight: 1.3 }}>Escrow guarantee</p>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: "1rem", padding: "2.5vh 2vw", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.65, fontWeight: 400, marginBottom: "2vh" }}>Every payment is held in a regulated escrow account. Funds are released only when you explicitly approve a milestone.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.65)", fontWeight: 400 }}>Regulated payment processing</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.65)", fontWeight: 400 }}>Dispute resolution within 48 hours</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.65)", fontWeight: 400 }}>Automatic refund for unstarted milestones</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.65)", fontWeight: 400 }}>Zero fees on disputed refunds</p>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#1E3D28", borderRadius: "1rem", padding: "2.5vh 2vw" }}>
            <div className="font-display" style={{ fontSize: "3.5vw", fontWeight: 900, color: "#C9A84C", lineHeight: 1 }}>$0</div>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.75)", marginTop: "0.8vh", fontWeight: 400 }}>Lost to disputes — ever</p>
          </div>
        </div>
      </div>
    </div>
  );
}
