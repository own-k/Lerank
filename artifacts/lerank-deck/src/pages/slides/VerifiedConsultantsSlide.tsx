export default function VerifiedConsultantsSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#ECEAE2" }}>
      <div className="premium-grid-overlay absolute inset-0" style={{ opacity: 0.5 }} />
      <div className="absolute inset-0 flex flex-col" style={{ padding: "7vh 7vw" }}>
        <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.5vh" }}>
          Trust and Verification
        </div>
        <h2 className="font-display" style={{ fontSize: "4vw", fontWeight: 800, color: "#111811", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "5vh" }}>
          Every consultant <span style={{ color: "#1E3D28" }}>manually verified</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2vw", marginBottom: "3.5vh" }}>
          <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "3vh 2.5vw", borderTop: "0.4vh solid #C9A84C" }}>
            <div className="font-display" style={{ fontSize: "3vw", fontWeight: 900, color: "#1E3D28", marginBottom: "1.5vh" }}>01</div>
            <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#111811", marginBottom: "1vh", lineHeight: 1.2 }}>Profile Review</p>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "#3D4D3F", lineHeight: 1.6, fontWeight: 400 }}>Each consultant's background, credentials, and claimed expertise are manually reviewed by the Lerank team before listing.</p>
          </div>
          <div style={{ backgroundColor: "#1E3D28", borderRadius: "1rem", padding: "3vh 2.5vw" }}>
            <div className="font-display" style={{ fontSize: "3vw", fontWeight: 900, color: "rgba(201,168,76,0.25)", marginBottom: "1.5vh" }}>02</div>
            <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#ECEAE2", marginBottom: "1vh", lineHeight: 1.2 }}>Quality Check</p>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.75)", lineHeight: 1.6, fontWeight: 400 }}>Profiles are assessed for consistency, completeness, and pricing transparency. Only profiles meeting the quality bar are approved.</p>
          </div>
          <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "3vh 2.5vw", borderTop: "0.4vh solid #C9A84C" }}>
            <div className="font-display" style={{ fontSize: "3vw", fontWeight: 900, color: "#1E3D28", marginBottom: "1.5vh" }}>03</div>
            <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#111811", marginBottom: "1vh", lineHeight: 1.2 }}>Ongoing Ratings</p>
            <p className="font-body" style={{ fontSize: "1.2vw", color: "#3D4D3F", lineHeight: 1.6, fontWeight: 400 }}>Student ratings and success rates are tracked continuously. Poor-performing consultants are flagged and reviewed for removal.</p>
          </div>
        </div>
        <div style={{ backgroundColor: "rgba(30,61,40,0.06)", borderRadius: "0.75rem", padding: "2.5vh 2.5vw", borderLeft: "0.35vw solid #C9A84C" }}>
          <p className="font-body" style={{ fontSize: "1.3vw", color: "#1E3D28", fontWeight: 600, lineHeight: 1.5 }}>
            The Lerank badge signals to students that a consultant has passed every step of our review — not just signed up. Quality is enforced, not assumed.
          </p>
        </div>
      </div>
    </div>
  );
}
