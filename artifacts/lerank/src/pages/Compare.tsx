import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Badge, Button, Card, CardContent, Input, Label } from "@/components/ui-elements";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, DollarSign, Eye, EyeOff, Filter, Loader2, LogOut, MapPin, Star, X, GitCompare, CheckSquare, Square, Phone, Mail, Clock, Globe, ChevronRight, Users, Award, TrendingUp } from "lucide-react";
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

const consultantColumnColors = [
  { border: "border-t-violet-500", bg: "bg-violet-50/60 dark:bg-violet-950/20" },
  { border: "border-t-stone-500",  bg: "bg-stone-50/60 dark:bg-stone-950/20"  },
  { border: "border-t-emerald-500",bg: "bg-emerald-50/60 dark:bg-emerald-950/20"},
  { border: "border-t-rose-500",   bg: "bg-rose-50/60 dark:bg-rose-950/20"   },
  { border: "border-t-sky-500",    bg: "bg-sky-50/60 dark:bg-sky-950/20"    },
  { border: "border-t-fuchsia-500",bg: "bg-fuchsia-50/60 dark:bg-fuchsia-950/20"},
];

function getColorClass(name: string) {
  let code = 0;
  for (let i = 0; i < name.length; i++) code += name.charCodeAt(i);
  return consultantColors[code % consultantColors.length];
}

function getColumnColor(name: string) {
  let code = 0;
  for (let i = 0; i < name.length; i++) code += name.charCodeAt(i);
  return consultantColumnColors[code % consultantColumnColors.length];
}

const TOTAL_STEPS = 4;

export default function Compare() {
  const { user, login, register, verifyEmail, resendCode, forgotPassword, resetPassword, logout, isLoading: isAuthLoading, token } = useAuth();
  const { t } = useLanguage();
  const tc = t.compare;
  const [, setLocation] = useLocation();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email verification state
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [fallbackCode, setFallbackCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [forgotFallbackCode, setForgotFallbackCode] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [forgotStep, setForgotStep] = useState<"email" | "code" | "done">("email");
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);

  const [consultants, setConsultants] = useState<any[]>([]);
  const [isLoadingConsultants, setIsLoadingConsultants] = useState(false);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const [filterCountry, setFilterCountry] = useState("All");
  const [filterRating, setFilterRating] = useState("Any");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"browse" | "compare">("browse");
  const [viewingProfile, setViewingProfile] = useState<any>(null);

  const toggleCompare = (id: number) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      const next = [...prev, id];
      if (next.length === 3) setActiveTab("compare");
      return next;
    });
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
    if (!isLoginMode) {
      const words = fullName.trim().split(/\s+/).filter(Boolean);
      if (words.length < 1 || words.some(w => w.replace(/[^a-zA-Z]/g, "").length < 3)) {
        setAuthError("Name must be at least 3 letters.");
        return;
      }
      if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        setAuthError("Password must contain both letters and numbers.");
        return;
      }
      if (password !== confirmPassword) {
        setAuthError("Passwords do not match. Please try again.");
        return;
      }
    }
    setIsSubmittingAuth(true);
    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        const result = await register(fullName, email, password);
        if (result.requiresVerification) {
          setVerificationEmail(result.email);
          setFallbackCode(result.fallbackCode || "");
          setShowVerification(true);
        }
      }
    } catch (err: any) {
      setAuthError(typeof err?.message === "string" ? err.message : "Authentication failed");
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setAuthError("");
    try {
      await verifyEmail(verificationEmail, verificationCode);
    } catch (err: any) {
      setAuthError(typeof err?.message === "string" ? err.message : "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const result = await resendCode(verificationEmail);
      setVerificationCode("");
      setFallbackCode(result.fallbackCode || "");
      setAuthError(t.verification.codeResent);
    } catch (err: any) {
      setAuthError(typeof err?.message === "string" ? err.message : "Failed to resend");
    }
  };

  const handleForgotPassword = async () => {
    setIsForgotSubmitting(true);
    setAuthError("");
    try {
      if (forgotStep === "email") {
        const result = await forgotPassword(forgotEmail);
        setForgotFallbackCode(result.fallbackCode || "");
        setForgotStep("code");
      } else if (forgotStep === "code") {
        if (forgotNewPassword !== forgotConfirmPassword) {
          setAuthError("Passwords do not match");
          setIsForgotSubmitting(false);
          return;
        }
        await resetPassword(forgotEmail, forgotCode, forgotNewPassword);
        setForgotStep("done");
      }
    } catch (err: any) {
      setAuthError(typeof err?.message === "string" ? err.message : "Failed");
    } finally {
      setIsForgotSubmitting(false);
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
    const authShell = (content: React.ReactNode) => (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden premium-bg p-6">
        <div className="pointer-events-none absolute inset-0 premium-grid" />
        <div className="pointer-events-none absolute left-[12%] top-[14%] h-56 w-56 rounded-full bg-primary/20 blur-3xl hidden md:block" />
        <div className="pointer-events-none absolute right-[10%] bottom-[16%] h-72 w-72 rounded-full bg-primary/12 blur-3xl hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full max-w-md">
          <div className="mb-8">
            <div className="mb-5 flex items-center justify-between">
              <Link href="/">
                <button type="button" className="inline-flex items-center gap-2 text-sm text-[#4A5248] dark:text-[#7A8E78] transition-colors hover:text-[#1E3D28] dark:hover:text-[#D4B96A]">
                  <ArrowLeft className="h-4 w-4" /> {tc.backToHome}
                </button>
              </Link>
            </div>
            <h1 className="font-display text-4xl font-bold">Lerank</h1>
            <p className="mt-1 text-sm text-muted-foreground">{tc.appSubtitle}</p>
          </div>
          {content}
        </motion.div>
      </div>
    );

    // Email verification screen
    if (showVerification) {
      return authShell(
        <Card className="overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.07] dark:bg-[#1A2218]" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <CardContent className="p-8" style={{ paddingTop: '2rem' }}>
            <h2 className="text-xl font-bold mb-2">{t.verification.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {fallbackCode ? `A code was sent to ${verificationEmail}` : t.verification.subtitle}
            </p>
            {fallbackCode && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300/50 rounded-xl px-4 py-3 mb-4">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">Email delivery issue — use this code</p>
                <span className="font-mono font-bold text-2xl tracking-[0.25em] text-amber-800 dark:text-amber-300">{fallbackCode}</span>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder={t.verification.codePlaceholder}
                className="text-center text-2xl font-mono tracking-[0.3em] h-14"
                maxLength={6}
              />

              <AnimatePresence>
                {authError && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{authError}</motion.p>
                )}
              </AnimatePresence>

              <Button onClick={handleVerify} isLoading={isVerifying} disabled={verificationCode.length !== 6} className="w-full h-12 text-base font-semibold dark:bg-[#D4B96A] dark:text-[#0F1410]">
                {t.verification.submit}
              </Button>

              <button type="button" onClick={handleResendCode} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                {t.verification.resend}
              </button>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Forgot password screen
    if (showForgotPassword) {
      return authShell(
        <Card className="overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.07] dark:bg-[#1A2218]" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <CardContent className="p-8" style={{ paddingTop: '2rem' }}>
            <h2 className="text-xl font-bold mb-2">{t.forgotPassword.title}</h2>

            {forgotStep === "done" ? (
              <div className="space-y-4">
                <p className="text-sm text-emerald-600 font-medium">{t.forgotPassword.success}</p>
                <Button onClick={() => { setShowForgotPassword(false); setForgotStep("email"); setForgotEmail(""); setForgotCode(""); setForgotNewPassword(""); setForgotConfirmPassword(""); setAuthError(""); }}
                  className="w-full h-12 text-base font-semibold dark:bg-[#D4B96A] dark:text-[#0F1410]">
                  {t.forgotPassword.backToLogin}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {forgotStep === "email" && (
                  <>
                    <p className="text-sm text-muted-foreground">{t.forgotPassword.subtitle}</p>
                    <Input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder={tc.form.emailPlaceholder} />
                  </>
                )}

                {forgotStep === "code" && (
                  <>
                    <p className="text-sm text-muted-foreground">{t.forgotPassword.codeSent}</p>
                    {forgotFallbackCode && (
                      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300/50 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">Email delivery issue — use this code</p>
                        <span className="font-mono font-bold text-2xl tracking-[0.25em] text-amber-800 dark:text-amber-300">{forgotFallbackCode}</span>
                      </div>
                    )}
                    <Input
                      value={forgotCode}
                      onChange={(e) => setForgotCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder={t.verification.codePlaceholder}
                      className="text-center text-2xl font-mono tracking-[0.3em] h-14"
                      maxLength={6}
                    />
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#4A5248] dark:text-[#7A8E78]">{t.forgotPassword.newPassword}</Label>
                      <Input type="password" value={forgotNewPassword} onChange={(e) => setForgotNewPassword(e.target.value)} placeholder="••••••••" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#4A5248] dark:text-[#7A8E78]">{t.forgotPassword.confirmNewPassword}</Label>
                      <Input type="password" value={forgotConfirmPassword} onChange={(e) => setForgotConfirmPassword(e.target.value)} placeholder="••••••••" />
                      {forgotNewPassword && forgotConfirmPassword && forgotNewPassword !== forgotConfirmPassword && (
                        <p className="text-xs text-destructive">Passwords do not match</p>
                      )}
                    </div>
                  </>
                )}

                <AnimatePresence>
                  {authError && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{authError}</motion.p>
                  )}
                </AnimatePresence>

                <Button onClick={handleForgotPassword} isLoading={isForgotSubmitting}
                  disabled={forgotStep === "email" ? !forgotEmail.includes("@") : (forgotCode.length !== 6 || forgotNewPassword.length < 6 || forgotNewPassword !== forgotConfirmPassword)}
                  className="w-full h-12 text-base font-semibold dark:bg-[#D4B96A] dark:text-[#0F1410]">
                  {forgotStep === "email" ? t.forgotPassword.sendCode : t.forgotPassword.resetPassword}
                </Button>

                <button type="button" onClick={() => { setShowForgotPassword(false); setAuthError(""); setForgotStep("email"); setForgotFallbackCode(""); setForgotEmail(""); setForgotCode(""); }}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors">
                  {t.forgotPassword.backToLogin}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    // Normal login/register form
    return authShell(
      <Card className="overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.07] dark:bg-[#1A2218]" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <CardContent className="p-8" style={{ paddingTop: '2rem' }}>
          <div className="mb-6 flex gap-1 rounded-xl bg-[#F0EDE4] dark:bg-[#141C12] p-1">
            {[tc.tabs.signIn, tc.tabs.register].map((label, i) => (
              <button key={i} type="button"
                onClick={() => { setIsLoginMode(i === 0); setAuthError(""); setShowPassword(false); setConfirmPassword(""); setShowConfirmPassword(false); }}
                className={((i === 0) === isLoginMode
                  ? "bg-[#FAFAF8] dark:bg-[#0F1410] text-[#111811] dark:text-[#F0ECE2] shadow-sm rounded-[10px]"
                  : "text-[#4A5248] dark:text-[#7A8E78]") + " flex-1 py-2.5 text-sm font-semibold transition-all duration-200"}
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
                    <Label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#4A5248] dark:text-[#7A8E78]">{tc.form.fullName}</Label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={tc.form.fullNamePlaceholder} />
                    {fullName.trim().length > 0 && (() => {
                      const words = fullName.trim().split(/\s+/).filter(Boolean);
                      if (words.some(w => w.replace(/[^a-zA-Z]/g, "").length < 3)) return <p className="text-xs text-destructive mt-0.5">Each name must have at least 3 letters</p>;
                      return <p className="text-xs text-emerald-600 mt-0.5">✓ {words.join(" ")}</p>;
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#4A5248] dark:text-[#7A8E78]">{tc.form.email}</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tc.form.emailPlaceholder} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#4A5248] dark:text-[#7A8E78]">{tc.form.password}</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tc.form.passwordPlaceholder}
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

            <AnimatePresence initial={false}>
              {!isLoginMode && (
                <motion.div
                  key="confirm-password-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden bg-transparent"
                >
                  <div className="flex flex-col gap-1.5 pb-1">
                    <Label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#4A5248] dark:text-[#7A8E78]">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className={`pr-12 ${!isLoginMode && confirmPassword && password ? (confirmPassword === password ? "border-emerald-400 focus:ring-emerald-400" : "border-destructive focus:ring-destructive") : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {!isLoginMode && confirmPassword && password && confirmPassword !== password && (
                      <p className="text-xs text-destructive mt-0.5">Passwords do not match</p>
                    )}
                    {!isLoginMode && confirmPassword && password && confirmPassword === password && (
                      <p className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1">✓ Passwords match</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {authError && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{authError}</motion.p>
              )}
            </AnimatePresence>

            <Button type="submit" isLoading={isSubmittingAuth} className="mt-1 w-full h-12 text-base font-semibold dark:bg-[#D4B96A] dark:text-[#0F1410] dark:hover:bg-[#D4B96A]/90 dark:shadow-none">
              {isLoginMode ? tc.submitSignIn : tc.submitCreateAccount}
              {!isSubmittingAuth && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            {isLoginMode && (
              <button type="button" onClick={() => { setShowForgotPassword(true); setAuthError(""); }}
                className="text-sm text-muted-foreground hover:text-gold transition-colors text-center">
                {t.forgotPassword.title}?
              </button>
            )}
          </form>
        </CardContent>
      </Card>
    );
  }

  // ── Onboarding ────────────────────────────────────────────────────────────
  if (user.onboardingCompleted !== true) {
    const ob = tc.onboarding;
    return (
      <div className="min-h-screen premium-bg">
        <div className="pointer-events-none absolute inset-0 premium-grid" />
        <div className="mx-auto max-w-2xl px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold">{ob.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{ob.subtitle}</p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="mb-8 flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
              <div key={step} className={(step <= onboardingStep ? "bg-primary" : "bg-muted") + " relative h-1.5 flex-1 rounded-full transition-all duration-500"} />
            ))}
          </div>

          <Card className="bg-card overflow-hidden border-0" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
            <CardContent className="p-8">
              <AnimatePresence mode="wait">

                {/* ── Step 1: Academic ── */}
                {onboardingStep === 1 && (
                  <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">{ob.stepLabel} 1 {ob.stepOf} {TOTAL_STEPS}</p>
                      <h2 className="font-display text-2xl font-bold">{ob.step1Title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{ob.step1Sub}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-3 sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <Label>{ob.gpa}</Label>
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
                            type="range" min="0" max={profileData.gpaScale} step={profileData.gpaScale === 100 ? 1 : 0.01}
                            value={Number(profileData.gpa)}
                            onChange={(e) => set("gpa")(parseFloat(e.target.value))}
                            className="slider-academic"
                            style={{ '--pct': `${(Number(profileData.gpa) / Number(profileData.gpaScale)) * 100}%` } as React.CSSProperties}
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
                          <Label>{ob.ielts} <span className="text-xs text-muted-foreground">({ob.optional})</span></Label>
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
                                {Number(profileData.ieltsScore) >= 8 ? ob.ieltsExpert :
                                 Number(profileData.ieltsScore) >= 7 ? ob.ieltsGood :
                                 Number(profileData.ieltsScore) >= 6 ? ob.ieltsCompetent : ob.ieltsModest}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">{ob.notSet}</span>
                          )}
                        </div>
                        <div className="relative pt-1 pb-2">
                          <input
                            type="range" min="0" max="9" step="0.5"
                            value={profileData.ieltsScore === "" ? 0 : Number(profileData.ieltsScore)}
                            onChange={(e) => set("ieltsScore")(parseFloat(e.target.value))}
                            className="slider-academic"
                            style={{ '--pct': `${(profileData.ieltsScore === "" ? 0 : Number(profileData.ieltsScore)) / 9 * 100}%` } as React.CSSProperties}
                          />
                          <div className="flex justify-between mt-1.5">
                            {[0,1,2,3,4,5,6,7,8,9].map((v) => (
                              <span key={v} className="text-[10px] text-muted-foreground/60 w-4 text-center">{v}</span>
                            ))}
                          </div>
                        </div>
                        {profileData.ieltsScore === "" && (
                          <button type="button" onClick={() => set("ieltsScore")(6.5)} className="text-xs text-[#1E3D28] dark:text-[#D4B96A] hover:underline underline-offset-2">+ {ob.addScore}</button>
                        )}
                        {profileData.ieltsScore !== "" && (
                          <button type="button" onClick={() => set("ieltsScore")("")} className="text-xs text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground">{ob.clear}</button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>{ob.sat} <span className="text-xs text-muted-foreground">({ob.optional})</span></Label>
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
                                {Number(profileData.satScore) >= 1400 ? ob.satExcellent :
                                 Number(profileData.satScore) >= 1200 ? ob.satGood :
                                 Number(profileData.satScore) >= 1000 ? ob.satAverage : ob.satBelowAvg}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">{ob.notSet}</span>
                          )}
                        </div>
                        <div className="relative pt-1 pb-2">
                          <input
                            type="range" min="400" max="1600" step="10"
                            value={profileData.satScore === "" ? 400 : Number(profileData.satScore)}
                            onChange={(e) => set("satScore")(parseInt(e.target.value))}
                            className="slider-academic"
                            style={{ '--pct': `${(profileData.satScore === "" ? 0 : (Number(profileData.satScore) - 400) / 1200) * 100}%` } as React.CSSProperties}
                          />
                          <div className="flex justify-between mt-1.5">
                            <span className="text-[10px] text-muted-foreground/60">400</span>
                            <span className="text-[10px] text-muted-foreground/60">1000</span>
                            <span className="text-[10px] text-muted-foreground/60">1600</span>
                          </div>
                        </div>
                        {profileData.satScore === "" && (
                          <button type="button" onClick={() => set("satScore")(1200)} className="text-xs text-[#1E3D28] dark:text-[#D4B96A] hover:underline underline-offset-2">+ {ob.addScore}</button>
                        )}
                        {profileData.satScore !== "" && (
                          <button type="button" onClick={() => set("satScore")("")} className="text-xs text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground">{ob.clear}</button>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={logout} className="flex items-center gap-1.5 dark:border-[#D4B96A]/60 dark:text-[#D4B96A] dark:bg-transparent dark:hover:bg-[#D4B96A]/10"><ArrowLeft className="h-4 w-4" /> {ob.back}</Button>
                      <Button onClick={() => setOnboardingStep(2)} className="flex-1 dark:bg-[#D4B96A] dark:text-[#111811] dark:hover:bg-[#D4B96A]/90">{ob.continue} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Goals ── */}
                {onboardingStep === 2 && (
                  <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">{ob.stepLabel} 2 {ob.stepOf} {TOTAL_STEPS}</p>
                      <h2 className="font-display text-2xl font-bold">{ob.step2Title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{ob.step2Sub}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>{ob.degreeLevel}</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {(["bachelor", "master", "phd"] as DegreeLevel[]).map((level) => (
                          <button key={level} type="button" onClick={() => set("degreeLevel")(level)}
                            className={(profileData.degreeLevel === level ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground") + " rounded-xl border px-3 py-3 text-sm font-semibold transition-all duration-200"}
                          >{t.degreeLevels[level]}</button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{ob.fieldOfStudy}</Label>
                      <select className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm" value={profileData.major} onChange={(e) => set("major")(e.target.value)}>
                        <option value="">{ob.selectMajor}</option>
                        {MAJOR_OPTIONS.map((m, i) => {
                          const keys = ["computerScience","businessAdmin","engineering","medicine","law","economics","dataScience","architecture","psychology","other"] as const;
                          return <option key={m} value={m}>{t.majors[keys[i]]}</option>;
                        })}
                      </select>
                    </div>

                    {profileData.major === "Other" && (
                      <div className="space-y-2">
                        <Label>{ob.specifyMajor}</Label>
                        <Input placeholder={ob.specifyPlaceholder} onChange={(e) => set("major")(e.target.value)} />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setOnboardingStep(1)}>{ob.back}</Button>
                      <Button onClick={() => setOnboardingStep(3)} className="flex-1">{ob.continue} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3: Budget & Countries ── */}
                {onboardingStep === 3 && (
                  <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">{ob.stepLabel} 3 {ob.stepOf} {TOTAL_STEPS}</p>
                      <h2 className="font-display text-2xl font-bold">{ob.step3Title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{ob.step3Sub}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>{ob.consultingBudget}</Label>
                        <p className="text-xs text-muted-foreground">{ob.consultingBudgetHint}</p>
                        <input type="range" min="500" max="6000" step="50" value={profileData.consultingBudget} onChange={(e) => set("consultingBudget")(parseInt(e.target.value))} className="w-full accent-gold" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$500</span>
                          <span className="font-display text-lg font-bold text-foreground">${profileData.consultingBudget.toLocaleString()}</span>
                          <span>$6,000</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>{ob.educationBudget}</Label>
                        <p className="text-xs text-muted-foreground">{ob.educationBudgetHint}</p>
                        <input type="range" min="5000" max="100000" step="1000" value={profileData.educationBudget} onChange={(e) => set("educationBudget")(parseInt(e.target.value))} className="w-full accent-gold" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$5k</span>
                          <span className="font-display text-lg font-bold text-foreground">${profileData.educationBudget.toLocaleString()}</span>
                          <span>$100k</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{ob.preferredCountries}</Label>
                      <p className="text-xs text-muted-foreground">{ob.preferredCountriesHint}</p>
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
                      <Button variant="outline" onClick={() => setOnboardingStep(2)}>{ob.back}</Button>
                      <Button onClick={() => setOnboardingStep(4)} className="flex-1">{ob.continue} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 4: Review ── */}
                {onboardingStep === 4 && (
                  <motion.div key="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.28 }} className="space-y-6">
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">{ob.stepLabel} 4 {ob.stepOf} {TOTAL_STEPS}</p>
                      <h2 className="font-display text-2xl font-bold">{ob.step4Title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{ob.step4Sub}</p>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-muted/30 overflow-hidden">
                      {[
                        { label: ob.reviewDegree, value: profileData.degreeLevel === "phd" ? "PhD" : profileData.degreeLevel.charAt(0).toUpperCase() + profileData.degreeLevel.slice(1) },
                        { label: ob.reviewMajor, value: profileData.major || ob.notSpecified },
                        { label: ob.reviewGpa, value: `${profileData.gpa} / ${profileData.gpaScale}` },
                        { label: ob.reviewIelts, value: profileData.ieltsScore ? String(profileData.ieltsScore) : ob.notSpecified },
                        { label: ob.reviewSat, value: profileData.satScore ? String(profileData.satScore) : ob.notSpecified },
                        { label: ob.reviewConsultingBudget, value: `$${profileData.consultingBudget.toLocaleString()}` },
                        { label: ob.reviewEducationBudget, value: `$${profileData.educationBudget.toLocaleString()}` },
                        { label: ob.reviewCountries, value: profileData.preferredCountries.length > 0 ? profileData.preferredCountries.join(", ") : ob.any },
                      ].map((row, i, arr) => (
                        <div key={i} className={"flex items-center justify-between px-5 py-3.5" + (i < arr.length - 1 ? " border-b border-border/50" : "")}>
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
                      <Button variant="outline" onClick={() => setOnboardingStep(3)}>{ob.back}</Button>
                      <Button onClick={handleOnboardingSubmit} isLoading={isSubmittingProfile} className="flex-1">{ob.completeProfile}</Button>
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
  const tm = tc.main;
  const comparedConsultants = compareIds.map(id => consultants.find(x => x.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen premium-bg pb-16">
      {/* ── Sticky nav ── */}
      <div className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md" style={{ transform: "translateZ(0)" }}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link href="/">
            <span className="font-brand text-2xl sm:text-3xl cursor-pointer transition-colors duration-200 hover:text-primary">Lerank</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground md:block">
              {tm.welcome}<span className="font-semibold text-foreground">{user.fullName}</span>
            </span>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">{tm.dashboard}</Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors duration-200">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-6 pb-24 sm:px-6 md:flex-row md:gap-8 md:pt-10 md:pb-10">
        {/* ── Sidebar (desktop) / collapsible panel (mobile) ── */}
        <aside className="w-full shrink-0 md:w-64">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-3">
            <button
              type="button"
              onClick={() => setShowMobileFilters(v => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-border/70 bg-card/90 px-4 py-3 text-sm font-semibold"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                {tm.filterTitle}
                {(filterCountry !== "All" || filterRating !== "Any") && (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">!</span>
                )}
              </span>
              <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${showMobileFilters ? "rotate-90" : ""}`} />
            </button>
          </div>

          {/* Filter panel — always visible on desktop, collapsible on mobile */}
          <AnimatePresence initial={false}>
            {(showMobileFilters || true) && (
              <motion.div
                key="filter-panel"
                initial={false}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`reveal-card rounded-2xl border border-border/70 bg-card/90 p-5 md:block ${showMobileFilters ? "block" : "hidden md:block"}`}
                >
                  <h3 className="mb-4 hidden md:flex items-center gap-2 text-base font-bold">
                    <Filter className="h-4 w-4 text-primary" />
                    {tm.filterTitle}
                    {(filterCountry !== "All" || filterRating !== "Any") && (
                      <button type="button" onClick={() => { setFilterCountry("All"); setFilterRating("Any"); }} className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">{tm.clear}</button>
                    )}
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tm.filterCountry}</Label>
                      <select className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40" value={filterCountry} onChange={(e) => { setFilterCountry(e.target.value); setShowMobileFilters(false); }}>
                        <option value="All">{tm.allCountries}</option>
                        {COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tm.filterRating}</Label>
                      <select className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40" value={filterRating} onChange={(e) => { setFilterRating(e.target.value); setShowMobileFilters(false); }}>
                        <option value="Any">{tm.anyRating}</option>
                        <option value="4.5+">4.5+</option>
                        <option value="4.8+">4.8+</option>
                      </select>
                    </div>
                  </div>
                  <AnimatePresence>
                    {(filterCountry !== "All" || filterRating !== "Any") && (
                      <motion.div initial={{ opacity: 0, y: 4, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: 4, height: 0 }} className="mt-4 overflow-hidden rounded-lg bg-primary/10 px-3 py-2 text-xs text-gold font-medium">
                        {tm.showing} {filteredConsultants.length} {tm.showingOf} {consultants.length}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="reveal-card hidden rounded-2xl border border-border/70 bg-card/90 p-5 md:block"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold">{tm.yourProfile}</h3>
                    <Link href="/dashboard">
                      <button type="button" className="text-xs text-primary hover:underline transition-opacity duration-200">{tm.edit}</button>
                    </Link>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: tm.degree, value: (user.profile?.degreeLevel ?? "—") },
                      { label: tm.major, value: user.profile?.major ?? "—" },
                      { label: tm.budget, value: user.profile?.consultingBudget ? `$${user.profile.consultingBudget.toLocaleString()}` : (user.profile?.budgetMax ? `$${user.profile.budgetMax.toLocaleString()}` : "—") },
                      { label: tm.gpa, value: user.profile?.gpa ? `${user.profile.gpa} / ${user.profile.gpaScale}` : "—" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-semibold capitalize">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">
          {/* Header + Tab Bar */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mb-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
              <div>
                <h1 className="font-display text-3xl font-bold">{tm.topMatches}</h1>
                <p className="mt-1 text-muted-foreground">{tm.topMatchesSubtitle}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                <span className="relative flex h-2 w-2 pulse-dot text-emerald-500">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live verified consultants
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 flex items-center gap-1 border-b border-border/60">
              <button
                type="button"
                onClick={() => setActiveTab("browse")}
                className={`relative pb-3 px-4 text-sm font-semibold transition-colors duration-200 ${activeTab === "browse" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Browse
                {activeTab === "browse" && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => { if (compareIds.length >= 2) setActiveTab("compare"); }}
                disabled={compareIds.length < 2}
                className={`relative pb-3 px-4 text-sm font-semibold transition-colors duration-200 flex items-center gap-2 ${activeTab === "compare" ? "text-primary" : compareIds.length < 2 ? "text-muted-foreground/40 cursor-not-allowed" : "text-muted-foreground hover:text-foreground"}`}
              >
                <GitCompare className="h-3.5 w-3.5" />
                Compare
                {compareIds.length > 0 && (
                  <span className={`inline-flex items-center justify-center h-5 min-w-5 rounded-full text-xs font-bold px-1.5 ${compareIds.length >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {compareIds.length}
                  </span>
                )}
                {activeTab === "compare" && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
              {compareIds.length > 0 && compareIds.length < 2 && (
                <span className="ml-2 text-xs text-muted-foreground/60 pb-3">Select at least 2 to compare</span>
              )}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ── Browse Tab ── */}
            {activeTab === "browse" && (
              <motion.div key="browse" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                {isLoadingConsultants ? (
                  <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2">
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
                  <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                      {filteredConsultants.map((consultant, index) => {
                        const isSelected = compareIds.includes(consultant.id);
                        const matchPct = consultant.matchScore ?? Math.min(98, 82 + ((consultant.studentsHelped || 0) % 17));
                        return (
                          <motion.div
                            key={consultant.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            whileHover={{ y: -6, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                            transition={{ delay: index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            style={{ willChange: "transform" }}
                          >
                            <Card className={`h-full overflow-hidden border transition-[border-color,box-shadow] duration-300 cursor-default ${isSelected ? "border-primary/50 shadow-[0_0_0_2px_hsl(var(--primary)/0.12),0_8px_32px_rgba(0,0,0,0.10)]" : "border-border/70 hover:border-primary/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)]"}`}>
                              {/* Top accent bar */}
                              <div className={`h-[3px] transition-all duration-500 ${isSelected ? "bg-primary w-full" : "bg-primary w-0 group-hover:w-full"}`} />
                              <CardContent className="flex h-full flex-col p-6">
                                {/* Header */}
                                <div className="mb-4 flex items-start justify-between gap-4">
                                  <div className="flex items-center gap-4">
                                    <div className="relative">
                                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getColorClass(consultant.name)} text-xl font-bold text-white shadow-md`}>
                                        {consultant.name.charAt(0)}
                                      </div>
                                      {consultant.rating >= 4.8 && (
                                        <div className="absolute -top-2 -right-2 flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow-sm shadow-amber-400/40 leading-none">
                                          ★ TOP
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-bold leading-tight">{consultant.name}</h3>
                                      <div className="mt-1 flex items-center gap-1.5 text-sm">
                                        <Star className="h-3.5 w-3.5 fill-[hsl(43,88%,50%)] text-[hsl(43,88%,50%)]" />
                                        <span className="font-bold">{consultant.rating}</span>
                                        <span className="text-muted-foreground">· {consultant.studentsHelped} students</span>
                                      </div>
                                    </div>
                                  </div>
                                  <Badge variant="success" className="shrink-0">{consultant.successRate}% success</Badge>
                                </div>

                                {/* Description */}
                                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                  {consultant.description || tm.defaultDesc}
                                </p>

                                {/* Match bar */}
                                <div className="mb-4 mt-auto">
                                  <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{tm.matchScore}</span>
                                    <span className="font-bold text-gold">{matchPct}%</span>
                                  </div>
                                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                    <motion.div
                                      className="h-full rounded-full bg-primary"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${matchPct}%` }}
                                      transition={{ delay: index * 0.05 + 0.25, duration: 0.7, ease: "easeOut" }}
                                    />
                                  </div>
                                </div>

                                {/* Info chips */}
                                <div className="mb-4 grid grid-cols-2 gap-2">
                                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 transition-colors duration-200">
                                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                                    <span className="truncate text-xs font-medium">{Array.isArray(consultant.specializedCountries) ? consultant.specializedCountries.slice(0, 3).join(", ") : "Various"}</span>
                                  </div>
                                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 transition-colors duration-200">
                                    <DollarSign className="h-3.5 w-3.5 shrink-0 text-primary" />
                                    <span className="text-xs font-medium">${consultant.priceMin}–${consultant.priceMax}</span>
                                  </div>
                                </div>

                                {/* Action row */}
                                <div className="flex gap-2 border-t border-border/50 pt-4">
                                  <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => toggleCompare(consultant.id)}
                                    disabled={!isSelected && compareIds.length >= 3}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                                      isSelected
                                        ? "border-primary bg-primary/10 text-primary"
                                        : compareIds.length >= 3
                                        ? "border-border text-muted-foreground/40 cursor-not-allowed"
                                        : "border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                                    }`}
                                  >
                                    {isSelected ? <CheckSquare className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
                                    {tm.compare}
                                  </motion.button>
                                  <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setViewingProfile(consultant)}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    {tm.viewProfile}
                                  </motion.button>
                                  <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.97 }}
                                    className="flex-1 inline-flex items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
                                  >
                                    {tm.hire}
                                  </motion.button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {filteredConsultants.length === 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-2xl border border-border/70 bg-card/70 p-12 text-center">
                        <Filter className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                        <p className="font-semibold">{tm.noResults}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{tm.noResultsHint}</p>
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => { setFilterCountry("All"); setFilterRating("Any"); }}>{tm.clearFilters}</Button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Compare prompt banner — sticky on mobile, inline on desktop */}
                <AnimatePresence>
                  {compareIds.length >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="glass fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between rounded-2xl border-primary/20 px-4 py-3 shadow-xl shadow-primary/10 sm:px-6 sm:py-4 md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto md:mt-8 md:shadow-lg md:shadow-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                          <GitCompare className="h-4.5 w-4.5 text-primary" />
                          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground">{compareIds.length}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {compareIds.length === 3 ? "Ready to compare!" : `${compareIds.length} of 3 selected`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {comparedConsultants.map((c: any) => c.name).join(" · ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setCompareIds([])} className="text-xs text-muted-foreground hover:text-destructive transition-colors duration-200">Clear</button>
                        {compareIds.length >= 2 && (
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveTab("compare")}
                            className="btn-glow inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200"
                          >
                            View Comparison <ChevronRight className="h-4 w-4" />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── Compare Tab ── */}
            {activeTab === "compare" && (
              <motion.div key="compare" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                {comparedConsultants.length < 2 ? (
                  <div className="rounded-2xl border border-border/70 bg-card/70 p-16 text-center">
                    <GitCompare className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                    <p className="font-semibold text-lg">Select consultants to compare</p>
                    <p className="mt-2 text-sm text-muted-foreground">Go to Browse, then select 2 or 3 consultants using the Compare button on each card.</p>
                    <Button variant="outline" size="sm" className="mt-6" onClick={() => setActiveTab("browse")}>Browse Consultants</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Comparing {comparedConsultants.length} consultants</p>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => { setCompareIds([]); setActiveTab("browse"); }} className="text-xs text-muted-foreground hover:text-destructive transition-colors duration-200">Clear all</button>
                      </div>
                    </div>

                    {/* Profile headers */}
                    <div className={`grid gap-3 sm:gap-4 ${comparedConsultants.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                      {comparedConsultants.map((c: any) => (
                        <motion.div
                          key={c.id}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`relative rounded-2xl border border-border/70 bg-card p-5 text-center shadow-sm border-t-[3px] ${getColumnColor(c.name).border} ${getColumnColor(c.name).bg}`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleCompare(c.id)}
                            className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${getColorClass(c.name)} text-2xl font-bold text-white shadow-md`}>
                            {c.name.charAt(0)}
                          </div>
                          <h3 className="font-bold text-base leading-tight">{c.name}</h3>
                          <div className="mt-1 flex items-center justify-center gap-1.5 text-sm">
                            <Star className="h-3.5 w-3.5 fill-[hsl(43,88%,50%)] text-[hsl(43,88%,50%)]" />
                            <span className="font-bold">{c.rating}</span>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{c.description || tm.defaultDesc}</p>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setViewingProfile(c)}
                            className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200"
                          >
                            <Eye className="h-3 w-3" /> Full Profile
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Comparison table */}
                    <div className="rounded-2xl border border-border/70 bg-card shadow-sm overflow-x-auto">
                      <div style={{ minWidth: comparedConsultants.length === 2 ? 480 : 600 }}>
                        {/* Column color header strip */}
                        <div className={`grid border-b border-border/50 ${comparedConsultants.length === 2 ? "grid-cols-[140px_1fr_1fr]" : "grid-cols-[140px_1fr_1fr_1fr]"}`}>
                          <div className="bg-muted/40 border-r border-border/50" />
                          {comparedConsultants.map((c: any) => (
                            <div key={c.id} className={`h-1.5 ${getColumnColor(c.name).bg} border-r border-border/50 last:border-0`} style={{ borderTopWidth: 3, borderTopStyle: "solid" }} />
                          ))}
                        </div>
                        {[
                          { label: "Rating", icon: Star, key: (c: any) => c.rating, highlight: (vals: any[]) => Math.max(...vals.map(Number)) },
                          { label: "Success Rate", icon: TrendingUp, key: (c: any) => `${c.successRate}%`, highlight: (vals: any[]) => Math.max(...vals.map(v => parseInt(v))) },
                          { label: "Students Helped", icon: Users, key: (c: any) => c.studentsHelped ?? "—", highlight: (vals: any[]) => Math.max(...vals.map(Number)) },
                          { label: "Price Range", icon: DollarSign, key: (c: any) => `$${c.priceMin}–$${c.priceMax}`, highlight: null },
                          { label: "Match Score", icon: Award, key: (c: any) => `${c.matchScore ?? "—"}%`, highlight: (vals: any[]) => Math.max(...vals.map(v => parseInt(v) || 0)) },
                          { label: "Countries", icon: Globe, key: (c: any) => Array.isArray(c.specializedCountries) ? c.specializedCountries.join(", ") : "Various", highlight: null },
                          { label: "Working Hours", icon: Clock, key: (c: any) => c.workingHours || "Mon–Fri, 9am–6pm", highlight: null },
                          { label: "Contact Email", icon: Mail, key: (c: any) => c.contactEmail || "Via platform", highlight: null },
                        ].map((row, ri) => {
                          const vals = comparedConsultants.map(row.key);
                          const bestVal = row.highlight ? row.highlight(vals) : null;
                          return (
                            <div key={ri} className={`grid border-b border-border/50 last:border-0 ${comparedConsultants.length === 2 ? "grid-cols-[140px_1fr_1fr]" : "grid-cols-[140px_1fr_1fr_1fr]"}`}>
                              <div className="flex items-center gap-2 px-4 py-3.5 bg-muted/40 border-r border-border/50">
                                <row.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                <span className="text-xs font-semibold text-muted-foreground">{row.label}</span>
                              </div>
                              {comparedConsultants.map((c: any) => {
                                const val = row.key(c);
                                const numVal = parseFloat(String(val)) || parseInt(String(val)) || 0;
                                const isBest = bestVal !== null && numVal === bestVal && bestVal > 0;
                                return (
                                  <div key={c.id} className={`flex items-center justify-center px-4 py-3.5 border-r border-border/50 last:border-0 text-sm transition-colors duration-200 ${isBest ? "bg-primary/6 font-bold text-primary" : `font-medium ${getColumnColor(c.name).bg}`}`}>
                                    <span className="text-center">{val}</span>
                                    {isBest && <span className="ml-1.5 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">Best</span>}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA row */}
                    <div className={`grid gap-3 sm:gap-4 ${comparedConsultants.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                      {comparedConsultants.map((c: any) => (
                        <motion.button
                          key={c.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200"
                        >
                          Hire {c.name.split(" ")[0]}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* ── View Profile Slide-over ── */}
      <AnimatePresence>
        {viewingProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setViewingProfile(null)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-card shadow-2xl overflow-y-auto"
            >
              {/* Close button */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-card/98 backdrop-blur-sm px-6 py-4">
                <h2 className="font-display text-xl font-bold">Consultant Profile</h2>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setViewingProfile(null)}
                  className="rounded-full p-2 hover:bg-muted transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile hero */}
                <div className="flex items-start gap-5">
                  <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${getColorClass(viewingProfile.name)} text-3xl font-bold text-white shadow-lg`}>
                    {viewingProfile.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold font-display">{viewingProfile.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Star className="h-4 w-4 fill-[hsl(43,88%,50%)] text-[hsl(43,88%,50%)]" />
                      <span className="font-bold text-lg">{viewingProfile.rating}</span>
                      <span className="text-muted-foreground">· {viewingProfile.studentsHelped} students helped</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 px-2.5 py-1 text-xs font-bold">
                        <TrendingUp className="h-3 w-3" /> {viewingProfile.successRate}% Success Rate
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-bold">
                        {viewingProfile.matchScore ?? "92"}% Match
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {(viewingProfile.bio || viewingProfile.description) && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">About</h4>
                    <p className="text-sm leading-relaxed text-foreground">
                      {viewingProfile.bio || viewingProfile.description}
                    </p>
                  </div>
                )}

                {/* Key stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: DollarSign, label: "Price Range", value: `$${viewingProfile.priceMin}–$${viewingProfile.priceMax}` },
                    { icon: Users, label: "Students Helped", value: viewingProfile.studentsHelped ?? "—" },
                    { icon: Clock, label: "Working Hours", value: viewingProfile.workingHours || "Mon–Fri, 9am–6pm" },
                    { icon: Award, label: "Experience", value: viewingProfile.yearsExperience ? `${viewingProfile.yearsExperience} years` : "10+ years" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-xl border border-border/60 bg-muted/30 p-3.5">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
                      </div>
                      <p className="text-sm font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Countries */}
                {Array.isArray(viewingProfile.specializedCountries) && viewingProfile.specializedCountries.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      <Globe className="inline h-3 w-3 mr-1" />Countries Covered
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {viewingProfile.specializedCountries.map((country: string) => (
                        <span key={country} className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold">
                          <MapPin className="h-3 w-3 text-primary" />{country}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements per country */}
                {viewingProfile.requirementsPerCountry && Object.keys(viewingProfile.requirementsPerCountry).length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Requirements by Country</h4>
                    <div className="space-y-2">
                      {Object.entries(viewingProfile.requirementsPerCountry).map(([country, req]: [string, any]) => (
                        <div key={country} className="rounded-xl border border-border/60 bg-muted/20 p-3">
                          <div className="font-semibold text-sm mb-1">{country}</div>
                          <p className="text-xs text-muted-foreground">{typeof req === "string" ? req : JSON.stringify(req)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Contact</h4>
                  <div className="space-y-2">
                    {viewingProfile.contactEmail && (
                      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
                        <Mail className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm">{viewingProfile.contactEmail}</span>
                      </div>
                    )}
                    {viewingProfile.contactPhone && (
                      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
                        <Phone className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm">{viewingProfile.contactPhone}</span>
                      </div>
                    )}
                    {viewingProfile.location && (
                      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm">{viewingProfile.location}</span>
                      </div>
                    )}
                    {!viewingProfile.contactEmail && !viewingProfile.contactPhone && !viewingProfile.location && (
                      <p className="text-sm text-muted-foreground">Contact available after hiring through the platform.</p>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3 pt-2 pb-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { toggleCompare(viewingProfile.id); }}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      compareIds.includes(viewingProfile.id)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    {compareIds.includes(viewingProfile.id) ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                    {compareIds.includes(viewingProfile.id) ? "Added to Compare" : "Add to Compare"}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200"
                  >
                    Hire {viewingProfile.name.split(" ")[0]}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
