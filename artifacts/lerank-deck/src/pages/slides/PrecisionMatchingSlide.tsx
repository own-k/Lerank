export default function PrecisionMatchingSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#ECEAE2" }}>
      <div className="premium-grid-overlay absolute inset-0" style={{ opacity: 0.5 }} />
      <div className="absolute" style={{ bottom: 0, right: 0, width: "40vw", height: "60vh", background: "radial-gradient(ellipse at bottom right, rgba(30,61,40,0.08) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 flex" style={{ padding: "7vh 7vw", gap: "5vw" }}>
        <div style={{ flex: "0 0 44vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "2vh" }}>
            Precision Matching
          </div>
          <h2 className="font-display" style={{ fontSize: "4vw", fontWeight: 900, color: "#111811", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "3.5vh" }}>
            The right consultant,<br />
            <span style={{ color: "#1E3D28" }}>not just any consultant</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.45vw", color: "#3D4D3F", lineHeight: 1.65, fontWeight: 400, marginBottom: "4vh" }}>
            Our ranking engine goes beyond simple filtering. Every consultant listing is scored against each student's unique academic profile, budget, and target countries — surfacing matches that actually make sense.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <p className="font-body" style={{ fontSize: "1.1vw", color: "#1E3D28", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5vh" }}>Matching signals</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1vw" }}>
              <span className="font-body" style={{ fontSize: "1.2vw", backgroundColor: "#1E3D28", color: "#C9A84C", borderRadius: "0.5rem", padding: "0.6vh 1.2vw", fontWeight: 600 }}>GPA</span>
              <span className="font-body" style={{ fontSize: "1.2vw", backgroundColor: "#1E3D28", color: "#C9A84C", borderRadius: "0.5rem", padding: "0.6vh 1.2vw", fontWeight: 600 }}>IELTS / SAT Score</span>
              <span className="font-body" style={{ fontSize: "1.2vw", backgroundColor: "#1E3D28", color: "#C9A84C", borderRadius: "0.5rem", padding: "0.6vh 1.2vw", fontWeight: 600 }}>Degree Level</span>
              <span className="font-body" style={{ fontSize: "1.2vw", backgroundColor: "#1E3D28", color: "#C9A84C", borderRadius: "0.5rem", padding: "0.6vh 1.2vw", fontWeight: 600 }}>Field of Study</span>
              <span className="font-body" style={{ fontSize: "1.2vw", backgroundColor: "#1E3D28", color: "#C9A84C", borderRadius: "0.5rem", padding: "0.6vh 1.2vw", fontWeight: 600 }}>Consulting Budget</span>
              <span className="font-body" style={{ fontSize: "1.2vw", backgroundColor: "#1E3D28", color: "#C9A84C", borderRadius: "0.5rem", padding: "0.6vh 1.2vw", fontWeight: 600 }}>Target Countries</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2vh" }}>
          <div style={{ backgroundColor: "white", borderRadius: "1.2rem", overflow: "hidden", boxShadow: "0 20px 45px -20px rgba(30,61,40,0.18)" }}>
            <div style={{ backgroundColor: "#1E3D28", padding: "2vh 2vw" }}>
              <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.6)", fontWeight: 500, marginBottom: "0.3vh" }}>Your Top Match</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p className="font-display" style={{ fontSize: "1.8vw", fontWeight: 700, color: "#ECEAE2" }}>Dr. Aliya Bekova</p>
                <span className="font-body" style={{ fontSize: "1.3vw", backgroundColor: "#C9A84C", color: "#111811", borderRadius: "0.5rem", padding: "0.4vh 1vw", fontWeight: 700 }}>96% match</span>
              </div>
            </div>
            <div style={{ padding: "2.5vh 2vw" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5vh 1.5vw", marginBottom: "2vh" }}>
                <div>
                  <p className="font-body" style={{ fontSize: "0.9vw", color: "#6B7A6E", fontWeight: 500, marginBottom: "0.3vh" }}>Rating</p>
                  <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#1E3D28" }}>4.9</p>
                </div>
                <div>
                  <p className="font-body" style={{ fontSize: "0.9vw", color: "#6B7A6E", fontWeight: 500, marginBottom: "0.3vh" }}>Students</p>
                  <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#1E3D28" }}>312</p>
                </div>
                <div>
                  <p className="font-body" style={{ fontSize: "0.9vw", color: "#6B7A6E", fontWeight: 500, marginBottom: "0.3vh" }}>Success</p>
                  <p className="font-display" style={{ fontSize: "1.6vw", fontWeight: 700, color: "#1E3D28" }}>94%</p>
                </div>
              </div>
              <div style={{ backgroundColor: "#F5F5F0", borderRadius: "0.5rem", padding: "1.5vh 1.2vw" }}>
                <p className="font-body" style={{ fontSize: "0.9vw", color: "#6B7A6E", fontWeight: 500, marginBottom: "1vh" }}>Active Milestones</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                    <div style={{ width: "0.8vw", height: "0.8vw", backgroundColor: "#1E3D28", borderRadius: "50%" }} />
                    <p className="font-body" style={{ fontSize: "1vw", color: "#3D4D3F", textDecoration: "line-through", opacity: 0.6 }}>Statement of Purpose — Draft 1</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                    <div style={{ width: "0.8vw", height: "0.8vw", backgroundColor: "#1E3D28", borderRadius: "50%" }} />
                    <p className="font-body" style={{ fontSize: "1vw", color: "#3D4D3F", textDecoration: "line-through", opacity: 0.6 }}>University Shortlist (8 schools)</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                    <div style={{ width: "0.8vw", height: "0.8vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                    <p className="font-body" style={{ fontSize: "1vw", color: "#111811", fontWeight: 600 }}>Application Review — Round 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
