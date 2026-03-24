export default function TrustSafetySlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#1E3D28" }}>
      <div className="premium-grid-overlay absolute inset-0" style={{ opacity: 0.7 }} />
      <div className="absolute" style={{ bottom: 0, right: 0, width: "55vw", height: "70vh", background: "radial-gradient(ellipse at bottom right, rgba(201,168,76,0.1) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 flex flex-col" style={{ padding: "7vh 7vw" }}>
        <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.5vh" }}>
          Trust and Safety
        </div>
        <h2 className="font-display" style={{ fontSize: "4vw", fontWeight: 900, color: "#ECEAE2", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "5vh" }}>
          Safety built into<br />
          <span style={{ background: "linear-gradient(135deg, #C9A84C, #E8D9A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>every transaction</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw", flex: 1, alignContent: "start" }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "1rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "2vh" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", backgroundColor: "rgba(201,168,76,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: "0.8vw", height: "0.8vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
              </div>
              <p className="font-display" style={{ fontSize: "1.5vw", fontWeight: 700, color: "#ECEAE2", lineHeight: 1.2 }}>Regulated Escrow</p>
            </div>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.65, fontWeight: 400 }}>All payments are processed through a regulated escrow provider. Neither Lerank nor the consultant can access funds until the student explicitly approves a milestone.</p>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "1rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "2vh" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", backgroundColor: "rgba(201,168,76,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: "0.8vw", height: "0.8vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
              </div>
              <p className="font-display" style={{ fontSize: "1.5vw", fontWeight: 700, color: "#ECEAE2", lineHeight: 1.2 }}>Dispute Resolution</p>
            </div>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.65, fontWeight: 400 }}>Disputes are reviewed and resolved within 48 hours. Students receive automatic refunds for unstarted or failed milestones. Zero fees on disputed refunds.</p>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "1rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "2vh" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", backgroundColor: "rgba(201,168,76,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: "0.8vw", height: "0.8vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
              </div>
              <p className="font-display" style={{ fontSize: "1.5vw", fontWeight: 700, color: "#ECEAE2", lineHeight: 1.2 }}>Identity Verification</p>
            </div>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.65, fontWeight: 400 }}>Every consultant is verified against their claimed credentials before going live. Student identities are confirmed via email verification during registration.</p>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "1rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "2vh" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", backgroundColor: "rgba(201,168,76,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: "0.8vw", height: "0.8vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
              </div>
              <p className="font-display" style={{ fontSize: "1.5vw", fontWeight: 700, color: "#ECEAE2", lineHeight: 1.2 }}>Scoped Agreements</p>
            </div>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.65, fontWeight: 400 }}>Each engagement is defined by explicit, milestone-scoped agreements. Clear scope prevents disputes over deliverables and eliminates scope creep for both parties.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
