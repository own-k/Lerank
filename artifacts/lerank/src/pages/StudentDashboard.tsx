import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { useEffect, useState } from "react";
import { Card, CardContent, Badge, Button, Input, Label } from "@/components/ui-elements";
import { Link } from "wouter";
import {
  Activity, Bell, CheckCircle, CreditCard, LayoutDashboard, LogOut,
  FileText, ChevronRight, DollarSign, ShieldCheck, UserCog, Save, X, Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

function useFetchWithAuth(url: string, token: string | null) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) { setIsLoading(false); return; }
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setIsLoading(false));
  }, [url, token]);

  return { data, isLoading };
}

type DegreeLevel = "bachelor" | "master" | "phd";

const COUNTRY_OPTIONS = ["USA", "UK", "Canada", "Australia", "Germany", "Netherlands", "France", "Singapore"];
const MAJOR_OPTIONS = [
  "Computer Science", "Business Administration", "Engineering", "Medicine",
  "Law", "Economics", "Data Science", "Architecture", "Psychology", "Other",
];

type ActiveView = "dashboard" | "profile";

function ProfileEditor({ user, token, onClose }: { user: any; token: string | null; onClose: () => void }) {
  const { t } = useLanguage();
  const tp = t.dashboard.profile;
  const profile = user.profile || {};
  const [form, setForm] = useState({
    gpa: profile.gpa ?? 3.5,
    gpaScale: profile.gpaScale ?? 4.0,
    ieltsScore: profile.ieltsScore ?? "",
    satScore: profile.satScore ?? "",
    degreeLevel: (profile.degreeLevel ?? "master") as DegreeLevel,
    major: profile.major ?? "",
    consultingBudget: profile.consultingBudget ?? profile.budgetMax ?? 2000,
    educationBudget: profile.educationBudget ?? 30000,
    preferredCountries: (profile.preferredCountries ?? profile.targetCountries ?? []) as string[],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) => (val: any) => setForm(prev => ({ ...prev, [field]: val }));

  const toggleCountry = (c: string) =>
    setForm(prev => ({
      ...prev,
      preferredCountries: prev.preferredCountries.includes(c)
        ? prev.preferredCountries.filter(x => x !== c)
        : [...prev.preferredCountries, c],
    }));

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMsg("");
    try {
      const payload = {
        gpa: parseFloat(String(form.gpa)),
        gpaScale: parseFloat(String(form.gpaScale)),
        ieltsScore: form.ieltsScore !== "" ? parseFloat(String(form.ieltsScore)) : null,
        satScore: form.satScore !== "" ? parseInt(String(form.satScore)) : null,
        degreeLevel: form.degreeLevel,
        major: form.major,
        budgetMax: form.consultingBudget,
        consultingBudget: form.consultingBudget,
        educationBudget: form.educationBudget,
        preferredCountries: form.preferredCountries,
        targetCountries: form.preferredCountries,
      };
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to save profile");
      }
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (e: any) {
      setSaveStatus("error");
      setErrorMsg(e.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <header className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">{tp.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{tp.subtitle}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground shrink-0">
          <X className="w-5 h-5" />
        </Button>
      </header>

      {/* Academic Scores */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-foreground text-base">{tp.academicScores}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GPA</Label>
              <Input
                type="number" step="0.01" min="0" max={form.gpaScale}
                value={form.gpa}
                onChange={e => set("gpa")(e.target.value)}
                onBlur={e => {
                  const v = parseFloat(e.target.value);
                  set("gpa")(isNaN(v) ? 0 : Math.max(0, Math.min(v, form.gpaScale)));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>{tp.gpaScale}</Label>
              <select
                value={form.gpaScale}
                onChange={e => set("gpaScale")(parseFloat(e.target.value))}
                className="flex h-11 w-full rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              >
                <option value={4.0}>4.0 Scale</option>
                <option value={5.0}>5.0 Scale</option>
                <option value={10.0}>10.0 Scale</option>
                <option value={100}>100 Scale</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>{tp.ieltsOptional}</Label>
              <Input
                type="number" step="0.5" min="0" max="9"
                placeholder="e.g. 7.5"
                value={form.ieltsScore}
                onChange={e => set("ieltsScore")(e.target.value)}
                onBlur={e => {
                  if (e.target.value === "") return;
                  const v = parseFloat(e.target.value);
                  if (!isNaN(v)) set("ieltsScore")(Math.max(0, Math.min(v, 9)));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>{tp.satOptional}</Label>
              <Input
                type="number" step="10" min="400" max="1600"
                placeholder="e.g. 1450"
                value={form.satScore}
                onChange={e => set("satScore")(e.target.value)}
                onBlur={e => {
                  if (e.target.value === "") return;
                  const v = parseInt(e.target.value);
                  if (!isNaN(v)) set("satScore")(Math.max(400, Math.min(v, 1600)));
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Degree & Major */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-foreground text-base">{tp.degreeMajor}</h2>
          <div className="space-y-2">
            <Label>{tp.degreeLevel}</Label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(["bachelor", "master", "phd"] as DegreeLevel[]).map(level => (
                <button
                  key={level} type="button"
                  onClick={() => set("degreeLevel")(level)}
                  className={`py-3 rounded-xl border-2 text-xs sm:text-sm font-semibold capitalize transition-all ${
                    form.degreeLevel === level
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-muted-foreground hover:border-gold/50"
                  }`}
                >
                  {level === "phd" ? "PhD" : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>{tp.major}</Label>
            <select
              value={form.major}
              onChange={e => set("major")(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">{tp.selectMajor}</option>
              {MAJOR_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-foreground text-base">{tp.budget}</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>{tp.consultingBudget}</Label>
              <span className="text-sm font-bold text-gold">{formatCurrency(form.consultingBudget)}</span>
            </div>
            <input
              type="range" min={500} max={6000} step={50}
              value={form.consultingBudget}
              onChange={e => set("consultingBudget")(parseInt(e.target.value))}
              className="w-full accent-gold"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$500</span><span>$6,000</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>{tp.educationBudget}</Label>
              <span className="text-sm font-bold text-gold">{formatCurrency(form.educationBudget)}</span>
            </div>
            <input
              type="range" min={5000} max={100000} step={1000}
              value={form.educationBudget}
              onChange={e => set("educationBudget")(parseInt(e.target.value))}
              className="w-full accent-gold"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$5,000</span><span>$100,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferred Countries */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <h2 className="font-bold text-foreground text-base">{tp.preferredCountries}</h2>
          <div className="flex flex-wrap gap-2">
            {COUNTRY_OPTIONS.map(c => (
              <button
                key={c} type="button"
                onClick={() => toggleCountry(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  form.preferredCountries.includes(c)
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex flex-wrap items-center gap-3 pb-8">
        <Button onClick={handleSave} isLoading={isSaving} className="bg-primary hover:bg-primary/85 text-primary-foreground">
          <Save className="w-4 h-4 mr-2" /> {tp.saveChanges}
        </Button>
        <Button variant="ghost" onClick={onClose} className="text-muted-foreground">{tp.cancel}</Button>
        <AnimatePresence>
          {saveStatus === "success" && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="text-sm font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> {tp.saved}
            </motion.span>
          )}
          {saveStatus === "error" && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="text-sm font-medium text-red-500">
              {errorMsg}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function StudentDashboard() {
  const { user, logout, token } = useAuth();
  const { t } = useLanguage();
  const td = t.dashboard;
  const { data: stats } = useFetchWithAuth("/api/dashboard/stats", token);
  const { data: applications } = useFetchWithAuth("/api/applications", token);
  const { data: activities } = useFetchWithAuth("/api/dashboard/activity", token);
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const closeSidebar = () => setSidebarOpen(false);

  const SidebarContent = () => (
    <>
      <div className="h-16 sm:h-20 flex items-center px-6 border-b border-border">
        <span className="text-2xl font-display font-bold text-foreground">{td.nav.title}</span>
        <button onClick={closeSidebar} className="ml-auto md:hidden text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 flex-1">
        <nav className="space-y-1">
          <button onClick={() => { setActiveView("dashboard"); closeSidebar(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${
              activeView === "dashboard" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}>
            <LayoutDashboard className="w-5 h-5 shrink-0" /> {td.nav.dashboard}
          </button>
          <Link href="/compare" onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <FileText className="w-5 h-5 shrink-0" /> {td.nav.findConsultants}
          </Link>
          <button onClick={() => { setActiveView("dashboard"); closeSidebar(); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-left">
            <CreditCard className="w-5 h-5 shrink-0" /> {td.nav.escrowPayments}
          </button>
          <button onClick={() => { setActiveView("profile"); closeSidebar(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${
              activeView === "profile" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}>
            <UserCog className="w-5 h-5 shrink-0" /> {td.nav.editProfile}
          </button>
        </nav>
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold shrink-0">
            {user.fullName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-foreground truncate">{user.fullName}</div>
            <div className="text-xs text-muted-foreground">{td.nav.student}</div>
          </div>
        </div>
        <button onClick={logout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors text-sm">
          <LogOut className="w-4 h-4" /> {td.nav.signOut}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — desktop fixed */}
      <aside className="hidden md:flex w-64 bg-card border-r border-border flex-col fixed inset-y-0 z-20">
        <SidebarContent />
      </aside>

      {/* Sidebar — mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
              onClick={closeSidebar}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-border flex flex-col md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 bg-card border-b border-border sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-display font-bold text-foreground">{td.nav.title}</span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeView === "profile" ? (
              <ProfileEditor key="profile" user={user} token={token} onClose={() => setActiveView("dashboard")} />
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-6xl mx-auto space-y-6"
              >
                <header className="flex flex-wrap gap-3 justify-between items-start">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                      {td.header.welcomeBack}{user.fullName.split(' ')[0]}!
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">{td.header.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveView("profile")}
                      className="border-border text-muted-foreground hover:text-foreground">
                      <UserCog className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">{td.header.editProfile}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-card border-border">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <Card className="border-none shadow-md">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">{td.stats.activeApps}</div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats?.activeApplications || 0}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">{td.stats.milestonesWk}</div>
                      <div className="text-2xl sm:text-3xl font-bold text-gold">{stats?.milestonesCompletedThisWeek || 0}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md bg-gold/10 border border-gold/20">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-gold font-medium mb-1 sm:mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 shrink-0" /> {td.stats.escrow}
                      </div>
                      <div className="text-xl sm:text-3xl font-bold text-foreground">{formatCurrency(stats?.moneyInEscrow || 0)}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">{td.stats.released}</div>
                      <div className="text-xl sm:text-3xl font-bold text-emerald-600">{formatCurrency(stats?.moneyReleased || 0)}</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Active Applications */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg sm:text-xl font-bold text-foreground">{td.applications.title}</h2>
                      <Link href="/compare" className="text-sm font-semibold text-gold hover:underline">
                        {td.applications.findConsultant}
                      </Link>
                    </div>

                    {Array.isArray(applications) && applications.map((app: any) => (
                      <Card key={app.id} className="border-border shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-4 gap-3">
                            <div>
                              <h3 className="font-bold">{app.companyName}</h3>
                              <p className="text-sm text-muted-foreground">{app.serviceName}</p>
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                              app.escrowStatus === 'held' ? 'bg-blue-100 text-blue-700' :
                              app.escrowStatus === 'released' ? 'bg-green-100 text-green-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {app.escrowStatus?.toUpperCase()}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-muted-foreground">{td.applications.progress}</span>
                              <span className="font-bold">{Math.round(app.progressPercent || 0)}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000" style={{ width: `${app.progressPercent || 0}%` }} />
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{td.applications.total} {formatCurrency(app.totalAmount)}</span>
                            <Button variant="ghost" size="sm" className="text-gold">
                              {td.applications.details} <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {(!applications || applications.length === 0) && (
                      <div className="text-center py-10 bg-card rounded-2xl border border-dashed border-border">
                        <p className="text-muted-foreground mb-4 text-sm">{td.applications.emptyState}</p>
                        <Link href="/compare">
                          <Button className="bg-primary hover:bg-primary/85 text-primary-foreground">{td.applications.browseConsultants}</Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Activity Feed */}
                  <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">{td.activity.title}</h2>
                    <Card className="border-border shadow-sm">
                      <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                          {Array.isArray(activities) && activities.map((activity: any) => (
                            <div key={activity.id} className="p-4 flex gap-3">
                              <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.type === 'payment' ? 'bg-emerald-100 text-emerald-600' :
                                activity.type === 'milestone_update' ? 'bg-gold/20 text-gold' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                {activity.type === 'payment' ? <DollarSign className="w-4 h-4" /> :
                                 activity.type === 'milestone_update' ? <CheckCircle className="w-4 h-4" /> :
                                 <Activity className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{new Date(activity.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                          {(!activities || !activities.length) && (
                            <div className="p-6 text-center text-sm text-muted-foreground">{td.activity.empty}</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
