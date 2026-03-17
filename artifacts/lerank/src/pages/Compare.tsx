import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Badge, Button, Card, CardContent, Input, Label } from "@/components/ui-elements";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, DollarSign, Eye, EyeOff, Filter, Loader2, LogOut, MapPin, Star, X, GitCompare, CheckSquare, Square, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";

type DegreeLevel = "bachelor" | "master" | "phd";

const COUNTRY_OPTIONS = ["USA", "UK", "Canada", "Australia", "Germany", "Netherlands", "France", "Singapore"];

const MAJOR_OPTIONS = [
  "Computer Science", "Business Administration", "Engineering", "Medicine",
  "Law", "Economics", "Data Science", "Architecture", "Psychology", "Other",
];

const consultantColors = [
  "from-violet-500 to-indigo-500",
  "from-stone-400 to-stone-600",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-sky-500 to-blue-500",
  "from-fuchsia-500 to-purple-500",
];

function getColorClass(name: string) {
  let code = 0;
  for (let i = 0; i < name.length; i++) code += name.charCodeAt(i);
  return consultantColors[code % consultantColors.length];
}

const TOTAL_STEPS = 4;

export default function Compare() {
  const { user, login, register, logout, isLoading: isAuthLoading, token } = useAuth();
  const [, setLocation] = useLocation();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [consultants, setConsultants] = useState<any[]>([]);
  const [isLoadingConsultants, setIsLoadingConsultants] = useState(false);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const [filterCountry, setFilterCountry] = useState("All");
  const [filterRating, setFilterRating] = useState("Any");
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showComparePanel, setShowComparePanel] = useState(false);

  const toggleCompare = (id: number) => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [profileData, setProfileData] = useState({
    gpa: 3.5,
    gpaScale: 4.0,
    ieltsScore: "" as string | number,
    satScore: "" as string | number,
    degreeLevel: "master" as DegreeLevel,
    major: "",
    consultingBudget: 5000,
    educationBudget: 30000,
    preferredCountries: [] as string[],
  });

  useEffect(() => {
    if (user === null) return;
    if (user.role === "company_admin") { setLocation("/admin/company"); return; }
    if (user.role === "super_admin") { setLocation("/admin/super"); }
  }, [user, setLocation]);

  useEffect(() => {
    if (user?.onboardingCompleted !== true || user.role !== "student") return;
    setIsLoadingConsultants(true);
    fetch("/api/consultants?sortBy=bestMatch")
      .then(async (res) => { if (!res.ok) return []; return res.json(); })
      .then((data) => setConsultants(Array.isArray(data) ? data : []))
      .catch(() => setConsultants([]))
      .finally(() => setIsLoadingConsultants(false));
  }, [user?.onboardingCompleted, user?.role]);

  const filteredConsultants = useMemo(() => {
    return consultants.filter((c) => {
      const matchesCountry = filterCountry === "All" ||
        (Array.isArray(c.specializedCountries) && c.specializedCountries.includes(filterCountry));
      const rating = parseFloat(c.rating) || 0;
      const matchesRating = filterRating === "Any" ||
        (filterRating === "4.5+" && rating >= 4.5) ||
        (filterRating === "4.8+" && rating >= 4.8);
      return matchesCountry && matchesRating;
    });
  }, [consultants, filterCountry, filterRating]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!email.includes("@") || !email.includes(".")) {
      setAuthError("Please enter a valid email address.");
      return;
    }
    setIsSubmittingAuth(true);
    try {
      if (isLoginMode) { await login(email, password); }
      else { await register(fullName, email, password); }
    } catch (err: any) {
      setAuthError(typeof err?.message === "string" ? err.message : "Authentication failed");
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleOnboardingSubmit = async () => {
    setIsSubmittingProfile(true);
    try {
      const payload = {
        gpa: profileData.gpa,
        gpaScale: profileData.gpaScale,
        ieltsScore: profileData.ieltsScore === "" ? null : Number(profileData.ieltsScore),
        satScore: profileData.satScore === "" ? null : Number(profileData.satScore),
        degreeLevel: profileData.degreeLevel,
        preferredMajor: profileData.major,
        budgetMax: profileData.consultingBudget,
        educationBudget: String(profileData.educationBudget),
        preferredCountries: profileData.preferredCountries,
        onboardingCompleted: true,
      };
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}) },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      if (updated?.onboardingCompleted === true) window.location.reload();
    } catch (err: any) {
      setAuthError(typeof err?.message === "string" ? err.message : "Profile update failed");
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const toggleCountry = (country: string) => {
    setProfileData((prev) => ({
      ...prev,
      preferredCountries: prev.preferredCountries.includes(country)
        ? prev.preferredCountries.filter((c) => c !== country)
        : [...prev.preferredCountries, country],
    }));
  };

  const set = (field: string) => (val: any) => setProfileData((prev) => ({ ...prev, [field]: val }));

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isAuthLoading) {
    return (
      <div className="min-h-screen premium-bg flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // ── Auth form ─────────────────────────────────────────────────────────────
  if (user === null) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden premium-bg p-6">
        <div className="pointer-events-none absolute inset-0 premium-grid" />
        <div className="pointer-events-none absolute left-[12%] top-[14%] h-56 w-56 rounded-full bg-primary/20 blur-3xl hidden md:block" />
        <div className="pointer-events-none absolute right-[10%] bottom-[16%] h-72 w-72 rounded-full bg-primary/12 blur-3xl hidden md:block" />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/">
              <button type="button" className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </button>
            </Link>
            <h1 className="font-display text-4xl font-bold">Lerank</h1>
            <p className="mt-1 text-sm text-muted-foreground">Premium admissions consulting marketplace</p>
          </div>

          <Card className="border-border/70 bg-card shadow-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
            <CardContent className="p-8">
              <div className="mb-6 flex gap-1 rounded-xl bg-muted/50 p-1">
                {["Sign In", "Register"].map((label, i) => (
                  <button key={label} type="button"
                    onClick={() => { setIsLoginMode(i === 0); setAuthError(""); setShowPassword(false); }}
                    className={((i === 0) === isLoginMode ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground") + " flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200"}
                  >{label}</button>
                ))}
              </div>

              <form onSubmit={handleAuth} noValidate className="flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {!isLoginMode && (
                    <motion.div
                      key="name-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden bg-transparent"
                    >
                      <div className="flex flex-col gap-1.5 pb-1">
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Full Name</Label>
                        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email Address</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {authError && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{authError}</motion.p>
                  )}
                </AnimatePresence>

                <Button type="submit" isLoading={isSubmittingAuth} className="mt-1 w-full h-12 text-base">
                  {isLoginMode ? "Sign In" : "Create Account"}
                  {!isSubmittingAuth && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ── Onboarding ────────────────────────────────────────────────────────────
  if (user.onboardingCompleted !== true) {
    return (
      <div className="min-h-screen premium-bg">
        <div className="pointer-events-none absolute inset-0 premium-grid" />
        <div className="mx-auto max-w-2xl px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold">Build Your Profile</h1>
              <p className="mt-2 text-sm text-muted-foreground">We use this to rank consultants perfectly for you.</p>
            </div>
            <ThemeToggle />
          </motion.div>

          {/* Progress bar */}
          <div className="mb-8 flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
              <div key={step} className={(step <= onboardingStep ? "bg-primary" : "bg-muted") + " relative h-1.5 flex-1 rounded-full transition-all duration-500"} />
            ))}
          </div>

          <Card className="border-border/70 bg-card shadow-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
            <CardContent className="p-8">
              <AnimatePresence mode="wait">

                {/* ── Step 1: Academic ── */}
                {onboardingStep === 1 && (
                  <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Step 1 of {TOTAL_STEPS}</p>
                      <h2 className="font-display text-2xl font-bold">Academic Background</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Your scores help us match the right consultant tier.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-3 sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <Label>GPA</Label>
                          <div className="flex items-center gap-2">
                            <select className="h-7 rounded-lg border border-border bg-background px-2 text-xs" value={profileData.gpaScale} onChange={(e) => { const s = parseFloat(e.target.value) || 4; set("gpaScale")(s); set("gpa")(Math.min(Number(profileData.gpa), s)); }}>
                              <option value="4.0">/ 4.0</option>
                              <option value="5.0">/ 5.0</option>
                              <option value="10.0">/ 10.0</option>
                              <option value="100">/ 100</option>
                            </select>
                            <span className="text-xl font-bold text-gold">{Number(profileData.gpa).toFixed(profileData.gpaScale === 100 ? 0 : 2)}</span>
                            <span className="text-xs text-muted-foreground">/ {profileData.gpaScale}</span>
                          </div>
                        </div>
                        <div className="relative pt-1 pb-2">
                          <input
                            type="range"
                            min="0"
                            max={profileData.gpaScale}
                            step={profileData.gpaScale === 100 ? 1 : 0.01}
                            value={Number(profileData.gpa)}
                            onChange={(e) => set("gpa")(parseFloat(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer
                              bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400
                              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                              [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                          />
                          <div className="flex justify-between mt-1.5">
                            <span className="text-[10px] text-muted-foreground/60">0</span>
                            <span className="text-[10px] text-muted-foreground/60">{profileData.gpaScale / 2}</span>
                            <span className="text-[10px] text-muted-foreground/60">{profileData.gpaScale}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>IELTS Score <span className="text-xs text-muted-foreground">(optional)</span></Label>
                          {profileData.ieltsScore !== "" ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xl font-bold text-gold">{Number(profileData.ieltsScore).toFixed(1)}</span>
                              <span className="text-xs font-medium text-muted-foreground">/ 9.0</span>
                              <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                                Number(profileData.ieltsScore) >= 8 ? "bg-emerald-500/15 text-emerald-600" :
                                Number(profileData.ieltsScore) >= 7 ? "bg-blue-500/15 text-blue-600" :
                                Number(profileData.ieltsScore) >= 6 ? "bg-amber-500/15 text-amber-600" :
                                "bg-rose-500/15 text-rose-600"
                              }`}>
                                {Number(profileData.ieltsScore) >= 8 ? "Expert" :
                                 Number(profileData.ieltsScore) >= 7 ? "Good" :
                                 Number(profileData.ieltsScore) >= 6 ? "Competent" : "Modest"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">not set</span>
                          )}
                        </div>
                        <div className="relative pt-1 pb-2">
                          <input
                            type="range"
                            min="0"
                            max="9"
                            step="0.5"
                            value={profileData.ieltsScore === "" ? 0 : Number(profileData.ieltsScore)}
                            onChange={(e) => set("ieltsScore")(parseFloat(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer
                              bg-gradient-to-r from-rose-400 via-amber-400 via-blue-400 to-emerald-400
                              [&::-webkit-slider-thumb]:appearance-none
                              [&::-webkit-slider-thumb]:w-5
                              [&::-webkit-slider-thumb]:h-5
                              [&::-webkit-slider-thumb]:rounded-full
                              [&::-webkit-slider-thumb]:bg-white
                              [&::-webkit-slider-thumb]:border-2
                              [&::-webkit-slider-thumb]:border-gold
                              [&::-webkit-slider-thumb]:shadow-md
                              [&::-webkit-slider-thumb]:cursor-pointer
                              [&::-moz-range-thumb]:w-5
                              [&::-moz-range-thumb]:h-5
                              [&::-moz-range-thumb]:rounded-full
                              [&::-moz-range-thumb]:bg-white
                              [&::-moz-range-thumb]:border-2
                              [&::-moz-range-thumb]:border-gold
                              [&::-moz-range-thumb]:shadow-md
                              [&::-moz-range-thumb]:cursor-pointer"
                          />
                          <div className="flex justify-between mt-1.5">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
                              <span key={v} className="text-[10px] text-muted-foreground/60 w-4 text-center">{v}</span>
                            ))}
                          </div>
                        </div>
                        {profileData.ieltsScore === "" && (
                          <button
                            type="button"
                            onClick={() => set("ieltsScore")(6.5)}
                            className="text-xs text-gold underline underline-offset-2 hover:text-gold/80"
                          >
                            Add score
                          </button>
                        )}
                        {profileData.ieltsScore !== "" && (
                          <button
                            type="button"
                            onClick={() => set("ieltsScore")("")}
                            className="text-xs text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>SAT Score <span className="text-xs text-muted-foreground">(optional)</span></Label>
                          {profileData.satScore !== "" ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xl font-bold text-gold">{profileData.satScore}</span>
                              <span className="text-xs text-muted-foreground">/ 1600</span>
                              <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                                Number(profileData.satScore) >= 1400 ? "bg-emerald-500/15 text-emerald-600" :
                                Number(profileData.satScore) >= 1200 ? "bg-blue-500/15 text-blue-600" :
                                Number(profileData.satScore) >= 1000 ? "bg-amber-500/15 text-amber-600" :
                                "bg-rose-500/15 text-rose-600"
                              }`}>
                                {Number(profileData.satScore) >= 1400 ? "Excellent" :
                                 Number(profileData.satScore) >= 1200 ? "Good" :
                                 Number(profileData.satScore) >= 1000 ? "Average" : "Below Avg"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">not set</span>
                          )}
                        </div>
                        <div className="relative pt-1 pb-2">
                          <input
                            type="range"
                            min="400"
                            max="1600"
                            step="10"
                            value={profileData.satScore === "" ? 400 : Number(profileData.satScore)}
                            onChange={(e) => set("satScore")(parseInt(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer
                              bg-gradient-to-r from-rose-400 via-amber-400 via-blue-400 to-emerald-400
                              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                              [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                          />
                          <div className="flex justify-between mt-1.5">
                            <span className="text-[10px] text-muted-foreground/60">400</span>
                            <span className="text-[10px] text-muted-foreground/60">1000</span>
                            <span className="text-[10px] text-muted-foreground/60">1600</span>
                          </div>
                        </div>
                        {profileData.satScore === "" && (
                          <button type="button" onClick={() => set("satScore")(1200)} className="text-xs text-gold underline underline-offset-2 hover:text-gold/80">Add score</button>
                        )}
                        {profileData.satScore !== "" && (
                          <button type="button" onClick={() => set("satScore")("")} className="text-xs text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground">Clear</button>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={logout} className="flex items-center gap-1.5"><ArrowLeft className="h-4 w-4" /> Back</Button>
                      <Button onClick={() => setOnboardingStep(2)} className="flex-1">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Goals ── */}
                {onboardingStep === 2 && (
                  <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Step 2 of {TOTAL_STEPS}</p>
                      <h2 className="font-display text-2xl font-bold">Academic Goals</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Tell us what you're aiming for.</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Target Degree Level</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {(["bachelor", "master", "phd"] as DegreeLevel[]).map((level) => (
                          <button key={level} type="button" onClick={() => set("degreeLevel")(level)}
                            className={(profileData.degreeLevel === level ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground") + " rounded-xl border px-3 py-3 text-sm font-semibold capitalize transition-all duration-200"}
                          >{level === "phd" ? "PhD" : level.charAt(0).toUpperCase() + level.slice(1)}</button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Field of Study / Major</Label>
                      <select className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm" value={profileData.major} onChange={(e) => set("major")(e.target.value)}>
                        <option value="">Select your major…</option>
                        {MAJOR_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    {profileData.major === "Other" && (
                      <div className="space-y-2">
                        <Label>Specify Major</Label>
                        <Input placeholder="e.g. Environmental Science" onChange={(e) => set("major")(e.target.value)} />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setOnboardingStep(1)}>Back</Button>
                      <Button onClick={() => setOnboardingStep(3)} className="flex-1">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3: Budget & Countries ── */}
                {onboardingStep === 3 && (
                  <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Step 3 of {TOTAL_STEPS}</p>
                      <h2 className="font-display text-2xl font-bold">Budget & Destinations</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Helps us filter consultants you can actually afford.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Consulting Budget</Label>
                        <p className="text-xs text-muted-foreground">Max you'll spend on a consulting service.</p>
                        <input type="range" min="500" max="6000" step="50" value={profileData.consultingBudget} onChange={(e) => set("consultingBudget")(parseInt(e.target.value))} className="w-full accent-primary" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$500</span>
                          <span className="font-display text-lg font-bold text-foreground">${profileData.consultingBudget.toLocaleString()}</span>
                          <span>$6,000</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Annual Education Budget</Label>
                        <p className="text-xs text-muted-foreground">Tuition + living costs per year.</p>
                        <input type="range" min="5000" max="100000" step="1000" value={profileData.educationBudget} onChange={(e) => set("educationBudget")(parseInt(e.target.value))} className="w-full accent-primary" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$5k</span>
                          <span className="font-display text-lg font-bold text-foreground">${profileData.educationBudget.toLocaleString()}</span>
                          <span>$100k</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Countries</Label>
                      <p className="text-xs text-muted-foreground">Select all that interest you.</p>
                      <div className="flex flex-wrap gap-2">
                        {COUNTRY_OPTIONS.map((country) => {
                          const selected = profileData.preferredCountries.includes(country);
                          return (
                            <button key={country} type="button" onClick={() => toggleCountry(country)}
                              className={(selected ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground") + " inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200"}
                            >
                              {selected && <X className="h-3 w-3" />}{country}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setOnboardingStep(2)}>Back</Button>
                      <Button onClick={() => setOnboardingStep(4)} className="flex-1">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 4: Review ── */}
                {onboardingStep === 4 && (
                  <motion.div key="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Step 4 of {TOTAL_STEPS}</p>
                      <h2 className="font-display text-2xl font-bold">Review & Confirm</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Everything looks correct? We'll start matching you.</p>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-muted/30 overflow-hidden">
                      {[
                        { label: "Degree", value: profileData.degreeLevel === "phd" ? "PhD" : profileData.degreeLevel.charAt(0).toUpperCase() + profileData.degreeLevel.slice(1) },
                        { label: "Major", value: profileData.major || "Not specified" },
                        { label: "GPA", value: `${profileData.gpa} / ${profileData.gpaScale}` },
                        { label: "IELTS", value: profileData.ieltsScore ? String(profileData.ieltsScore) : "Not specified" },
                        { label: "SAT", value: profileData.satScore ? String(profileData.satScore) : "Not specified" },
                        { label: "Consulting Budget", value: `$${profileData.consultingBudget.toLocaleString()}` },
                        { label: "Education Budget / yr", value: `$${profileData.educationBudget.toLocaleString()}` },
                        { label: "Countries", value: profileData.preferredCountries.length > 0 ? profileData.preferredCountries.join(", ") : "Any" },
                      ].map((row, i, arr) => (
                        <div key={row.label} className={"flex items-center justify-between px-5 py-3.5" + (i < arr.length - 1 ? " border-b border-border/50" : "")}>
                          <span className="text-sm text-muted-foreground">{row.label}</span>
                          <span className="text-sm font-semibold">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {authError && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">{authError}</motion.p>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setOnboardingStep(3)}>Back</Button>
                      <Button onClick={handleOnboardingSubmit} isLoading={isSubmittingProfile} className="flex-1">Complete Profile</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ── Main compare view ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen premium-bg pb-16">
      <div className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm" style={{ willChange: "transform", transform: "translateZ(0)" }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/">
            <span className="font-display text-xl font-bold cursor-pointer hover:text-primary transition-colors">Lerank</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:block">
              Welcome, <span className="font-semibold text-foreground">{user.fullName}</span>
            </span>
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive hover:border-destructive/50">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-10 md:flex-row">
        <aside className="w-full shrink-0 space-y-4 md:w-72">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="reveal-card rounded-2xl border border-border/70 bg-card/90 p-5">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
              <Filter className="h-4 w-4 text-primary" />
              Filters
              {(filterCountry !== "All" || filterRating !== "Any") && (
                <button type="button" onClick={() => { setFilterCountry("All"); setFilterRating("Any"); }} className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors">Clear</button>
              )}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Country</Label>
                <select className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}>
                  <option value="All">All Countries</option>
                  {COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Min Rating</Label>
                <select className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm" value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                  <option value="Any">Any Rating</option>
                  <option value="4.5+">4.5+</option>
                  <option value="4.8+">4.8+</option>
                </select>
              </div>
            </div>
            {(filterCountry !== "All" || filterRating !== "Any") && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg bg-primary/10 px-3 py-2 text-xs text-gold font-medium">
                Showing {filteredConsultants.length} of {consultants.length}
              </motion.div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="reveal-card rounded-2xl border border-border/70 bg-card/90 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold">Your Profile</h3>
              <Link href="/dashboard">
                <button type="button" className="text-xs text-primary hover:underline">Edit</button>
              </Link>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { label: "Degree", value: (user.profile?.degreeLevel ?? "—") },
                { label: "Major", value: user.profile?.major ?? "—" },
                { label: "Budget", value: user.profile?.consultingBudget ? `$${user.profile.consultingBudget.toLocaleString()}` : (user.profile?.budgetMax ? `$${user.profile.budgetMax.toLocaleString()}` : "—") },
                { label: "GPA", value: user.profile?.gpa ? `${user.profile.gpa} / ${user.profile.gpaScale}` : "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold capitalize">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </aside>

        <main className="flex-1 min-w-0">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="font-display text-3xl font-bold">Your Top Matches</h1>
            <p className="mt-1 text-muted-foreground">Ranked by compatibility with your profile and budget.</p>
          </motion.div>

          {isLoadingConsultants ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/70 bg-card/90 p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl skeleton" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-36 rounded-lg skeleton" />
                      <div className="h-4 w-24 rounded-lg skeleton" />
                    </div>
                  </div>
                  <div className="h-4 rounded-lg skeleton" />
                  <div className="h-4 w-3/4 rounded-lg skeleton" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-9 rounded-xl skeleton" />
                    <div className="h-9 rounded-xl skeleton" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid gap-6 lg:grid-cols-2">
                {filteredConsultants.map((consultant, index) => (
                  <motion.div key={consultant.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: index * 0.06, duration: 0.4 }}>
                    <Card className="group h-full border-border/70 bg-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/30 overflow-hidden" style={{ willChange: "transform" }}>
                      <div className="h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                      <CardContent className="flex h-full flex-col p-6">
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getColorClass(consultant.name)} text-xl font-bold text-white shadow-lg`}>
                              {consultant.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold leading-tight">{consultant.name}</h3>
                              <div className="mt-1 flex items-center gap-1.5 text-sm">
                                <Star className="h-3.5 w-3.5 fill-[hsl(43,88%,50%)] text-[hsl(43,88%,50%)]" />
                                <span className="font-bold">{consultant.rating}</span>
                                <span className="text-muted-foreground">({consultant.studentsHelped})</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="success" className="shrink-0">{consultant.successRate}% Success</Badge>
                        </div>

                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {consultant.description || "Premium education consulting with personalized guidance for international applicants."}
                        </p>

                        <div className="mb-2 mt-auto">
                          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                            <span>Match score</span>
                            <span className="font-bold text-gold">{consultant.matchScore ?? Math.round(85 + Math.random() * 14)}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${consultant.matchScore ?? Math.round(85 + Math.random() * 14)}%` }} transition={{ delay: index * 0.06 + 0.3, duration: 0.8, ease: "easeOut" }} />
                          </div>
                        </div>

                        <div className="mb-4 mt-4 grid grid-cols-2 gap-2.5 text-sm">
                          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                            <span className="truncate text-xs">{Array.isArray(consultant.specializedCountries) ? consultant.specializedCountries.join(", ") : "Various"}</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                            <DollarSign className="h-3.5 w-3.5 shrink-0 text-primary" />
                            <span className="text-xs">${consultant.priceMin}–${consultant.priceMax}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 border-t border-border/60 pt-4">
                          <button
                            type="button"
                            onClick={() => toggleCompare(consultant.id)}
                            title={compareIds.includes(consultant.id) ? "Remove from compare" : compareIds.length >= 3 ? "Max 3 consultants" : "Add to compare"}
                            className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                              compareIds.includes(consultant.id)
                                ? "border-primary bg-primary/10 text-primary"
                                : compareIds.length >= 3
                                ? "border-border text-muted-foreground opacity-40 cursor-not-allowed"
                                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            }`}
                          >
                            {compareIds.includes(consultant.id) ? <CheckSquare className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
                            Compare
                          </button>
                          <Button variant="outline" className="flex-1 text-sm">View Profile</Button>
                          <Button className="flex-1 text-sm">Hire</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {filteredConsultants.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-2xl border border-border/70 bg-card/70 p-12 text-center">
                    <Filter className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                    <p className="font-semibold">No consultants match your filters</p>
                    <p className="mt-1 text-sm text-muted-foreground">Try adjusting the country or rating filters.</p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => { setFilterCountry("All"); setFilterRating("Any"); }}>Clear filters</Button>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* ── Compare Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {compareIds.length >= 1 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            {/* Collapse toggle */}
            <div
              className="mx-auto w-full max-w-7xl px-6"
              onClick={() => setShowComparePanel(p => !p)}
            >
              <div className="flex cursor-pointer items-center justify-between rounded-t-2xl border border-b-0 border-border/80 bg-card px-5 py-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <GitCompare className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold">
                    Comparing {compareIds.length} consultant{compareIds.length > 1 ? "s" : ""}
                  </span>
                  <div className="flex gap-2">
                    {compareIds.map(id => {
                      const c = consultants.find(x => x.id === id);
                      if (!c) return null;
                      return (
                        <span key={id} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                          {c.name}
                          <button type="button" onClick={e => { e.stopPropagation(); toggleCompare(id); }} className="ml-0.5 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {compareIds.length >= 2 && (
                    <span className="text-xs text-muted-foreground">
                      {showComparePanel ? "Hide" : "Show"} comparison
                    </span>
                  )}
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${showComparePanel ? "rotate-0" : "rotate-180"}`} />
                </div>
              </div>
            </div>

            {/* Comparison table */}
            <AnimatePresence>
              {showComparePanel && compareIds.length >= 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mx-auto w-full max-w-7xl overflow-x-auto border border-t-0 border-border/80 bg-card px-6 py-5 shadow-lg">
                    {(() => {
                      const compared = compareIds.map(id => consultants.find(x => x.id === id)).filter(Boolean);
                      const rows: { label: string; key: (c: any) => string | number }[] = [
                        { label: "Rating", key: c => c.rating },
                        { label: "Success Rate", key: c => `${c.successRate}%` },
                        { label: "Students Helped", key: c => c.studentsHelped ?? "—" },
                        { label: "Price Range", key: c => `$${c.priceMin}–$${c.priceMax}` },
                        { label: "Match Score", key: c => `${c.matchScore ?? "—"}%` },
                        { label: "Countries", key: c => Array.isArray(c.specializedCountries) ? c.specializedCountries.join(", ") : "Various" },
                      ];
                      return (
                        <table className="w-full min-w-[480px] text-sm">
                          <thead>
                            <tr>
                              <th className="w-28 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground pb-3"></th>
                              {compared.map((c: any) => (
                                <th key={c.id} className="pb-3 text-center font-bold">
                                  <div className="flex flex-col items-center gap-1">
                                    <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${getColorClass(c.name)} flex items-center justify-center text-sm font-bold text-white`}>
                                      {c.name.charAt(0)}
                                    </div>
                                    <span className="text-sm leading-tight">{c.name}</span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, ri) => (
                              <tr key={row.label} className={ri % 2 === 0 ? "bg-muted/30" : ""}>
                                <td className="py-2.5 pr-4 text-xs font-semibold text-muted-foreground">{row.label}</td>
                                {compared.map((c: any) => (
                                  <td key={c.id} className="py-2.5 text-center font-semibold">{row.key(c)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
