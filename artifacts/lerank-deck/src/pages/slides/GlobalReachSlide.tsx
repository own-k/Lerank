export default function GlobalReachSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: "#111811" }}>
      <div className="premium-grid-overlay absolute inset-0" />
      <div className="absolute" style={{ top: 0, right: 0, width: "60vw", height: "100vh", background: "radial-gradient(ellipse at top right, rgba(201,168,76,0.08) 0%, transparent 60%)" }} />
      <div className="absolute" style={{ bottom: 0, left: 0, width: "40vw", height: "50vh", background: "radial-gradient(ellipse at bottom left, rgba(45,90,62,0.15) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 flex" style={{ padding: "7vh 7vw", gap: "6vw" }}>
        <div style={{ flex: "0 0 42vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="font-body" style={{ fontSize: "1.1vw", color: "#C9A84C", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, marginBottom: "2vh" }}>
            Multi-Language
          </div>
          <h2 className="font-display" style={{ fontSize: "4.2vw", fontWeight: 900, color: "#ECEAE2", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "3.5vh" }}>
            Built for
            <br />
            <span style={{ background: "linear-gradient(135deg, #C9A84C, #E8D9A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>global students</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.4vw", color: "rgba(236,234,226,0.75)", lineHeight: 1.65, fontWeight: 400, marginBottom: "4vh" }}>
            Lerank is built for students across Central Asia and beyond. The full platform is available in English, Russian, and Uzbek — ensuring students can navigate the consulting process in their native language.
          </p>
          <div style={{ display: "flex", gap: "2vw" }}>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", padding: "1.8vh 2vw", border: "1px solid rgba(201,168,76,0.2)", flex: 1, textAlign: "center" }}>
              <p className="font-display" style={{ fontSize: "2.5vw", fontWeight: 900, color: "#C9A84C" }}>EN</p>
              <p className="font-body" style={{ fontSize: "1vw", color: "rgba(236,234,226,0.55)", fontWeight: 400 }}>English</p>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", padding: "1.8vh 2vw", border: "1px solid rgba(201,168,76,0.2)", flex: 1, textAlign: "center" }}>
              <p className="font-display" style={{ fontSize: "2.5vw", fontWeight: 900, color: "#C9A84C" }}>RU</p>
              <p className="font-body" style={{ fontSize: "1vw", color: "rgba(236,234,226,0.55)", fontWeight: 400 }}>Russian</p>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.75rem", padding: "1.8vh 2vw", border: "1px solid rgba(201,168,76,0.2)", flex: 1, textAlign: "center" }}>
              <p className="font-display" style={{ fontSize: "2.5vw", fontWeight: 900, color: "#C9A84C" }}>UZ</p>
              <p className="font-body" style={{ fontSize: "1vw", color: "rgba(236,234,226,0.55)", fontWeight: 400 }}>Uzbek</p>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2vh" }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "1.2rem", padding: "3vh 2.5vw", border: "1px solid rgba(201,168,76,0.2)" }}>
            <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(201,168,76,0.8)", fontWeight: 600, marginBottom: "2.5vh", letterSpacing: "0.06em" }}>DESTINATION COUNTRIES</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2vh 1vw" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>United States</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>United Kingdom</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>Germany</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>Canada</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>South Korea</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#C9A84C", borderRadius: "50%" }} />
                <p className="font-body" style={{ fontSize: "1.2vw", color: "rgba(236,234,226,0.7)", fontWeight: 400 }}>Australia</p>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#1E3D28", borderRadius: "1rem", padding: "2.5vh 2vw" }}>
            <p className="font-body" style={{ fontSize: "1.1vw", color: "rgba(236,234,226,0.6)", marginBottom: "0.5vh", fontWeight: 400 }}>Primary market focus</p>
            <p className="font-display" style={{ fontSize: "1.8vw", fontWeight: 700, color: "#ECEAE2" }}>Central Asia — Uzbekistan, Kazakhstan, Kyrgyzstan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
