export default function SolutionSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#1E3D28" }}>
      <div className="premium-grid-overlay absolute inset-0" style={{ opacity: 0.8 }} />
      <div className="absolute" style={{ top: 0, right: 0, width: "45vw", height: "100vh", background: "radial-gradient(ellipse at top right, rgba(201,168,76,0.12) 0%, transparent 65%)" }} />
      <div className="absolute" style={{ bottom: 0, left: 0, width: "35vw", height: "50vh", background: "radial-gradient(ellipse at bottom left, rgba(201,168,76,0.08) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "7vh 7vw" }}>
        <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "2vh" }}>
          The Solution
        </div>
        <h2 className="font-display" style={{ fontSize: "4.5vw", fontWeight: 900, color: "#ECEAE2", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "2vh" }}>
          Lerank: Escrow-protected
        </h2>
        <h2 className="font-display" style={{ fontSize: "4.5vw", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "4.5vh", background: "linear-gradient(135deg, #C9A84C 0%, #E8D9A8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          consulting marketplace
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw" }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "1rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ width: "3vw", height: "3vw", backgroundColor: "rgba(201,168,76,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2vh" }}>
              <div style={{ width: "1vw", height: "1vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
            </div>
            <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#ECEAE2", marginBottom: "1vh", lineHeight: 1.25 }}>Milestone Escrow</p>
            <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.6, fontWeight: 400 }}>Pay per milestone, not upfront. Funds are held in a regulated escrow account and released only when you approve each deliverable.</p>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "1rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ width: "3vw", height: "3vw", backgroundColor: "rgba(201,168,76,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2vh" }}>
              <div style={{ width: "1vw", height: "1vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
            </div>
            <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#ECEAE2", marginBottom: "1vh", lineHeight: 1.25 }}>Precision Matching</p>
            <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.6, fontWeight: 400 }}>Our ranking engine weighs GPA, budget, degree level, and target countries to surface the right consultant for each student.</p>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "1rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ width: "3vw", height: "3vw", backgroundColor: "rgba(201,168,76,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2vh" }}>
              <div style={{ width: "1vw", height: "1vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
            </div>
            <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#ECEAE2", marginBottom: "1vh", lineHeight: 1.25 }}>Verified Consultants</p>
            <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.6, fontWeight: 400 }}>Every consultant profile goes through a manual quality and consistency review before being listed on the marketplace.</p>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "1rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <div style={{ width: "3vw", height: "3vw", backgroundColor: "rgba(201,168,76,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2vh" }}>
              <div style={{ width: "1vw", height: "1vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
            </div>
            <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#ECEAE2", marginBottom: "1vh", lineHeight: 1.25 }}>Live Progress Dashboard</p>
            <p className="font-body" style={{ fontSize: "1.25vw", color: "rgba(236,234,226,0.7)", lineHeight: 1.6, fontWeight: 400 }}>Every deliverable is tracked in a shared dashboard with timestamped updates visible to both student and consultant.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
