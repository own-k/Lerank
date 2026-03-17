import { useAuth } from "@/hooks/use-auth";
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
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1A0F0A]">Edit Profile</h1>
          <p className="text-gray-500 mt-1 text-sm">Update your academic profile for better consultant matches.</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <X className="w-5 h-5" />
        </Button>
      </header>

      {/* Academic Scores */}
      <Card className="border-[#E8DDD3] shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-[#1A0F0A] text-base">Academic Scores</h2>
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
              <Label>GPA Scale</Label>
              <select
                value={form.gpaScale}
                onChange={e => set("gpaScale")(parseFloat(e.target.value))}
                className="flex h-11 w-full rounded-xl border border-[#E8DDD3] bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] transition-all"
              >
                <option value={4.0}>4.0 Scale</option>
                <option value={5.0}>5.0 Scale</option>
                <option value={10.0}>10.0 Scale</option>
                <option value={100}>100 Scale</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>IELTS Score <span className="text-gray-400 font-normal text-xs">(optional, max 9.0)</span></Label>
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
              <Label>SAT Score <span className="text-gray-400 font-normal text-xs">(optional, max 1600)</span></Label>
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
      <Card className="border-[#E8DDD3] shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-[#1A0F0A] text-base">Degree & Major</h2>
          <div className="space-y-2">
            <Label>Degree Level</Label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(["bachelor", "master", "phd"] as DegreeLevel[]).map(level => (
                <button
                  key={level} type="button"
                  onClick={() => set("degreeLevel")(level)}
                  className={`py-3 rounded-xl border-2 text-xs sm:text-sm font-semibold capitalize transition-all ${
                    form.degreeLevel === level
                      ? "border-[#C4956A] bg-[#C4956A]/10 text-[#C4956A]"
                      : "border-[#E8DDD3] text-gray-500 hover:border-[#C4956A]/50"
                  }`}
                >
                  {level === "phd" ? "PhD" : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Major</Label>
            <select
              value={form.major}
              onChange={e => set("major")(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-[#E8DDD3] bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] transition-all"
            >
              <option value="">Select major…</option>
              {MAJOR_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card className="border-[#E8DDD3] shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-[#1A0F0A] text-base">Budget</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Consulting Budget</Label>
              <span className="text-sm font-bold text-[#C4956A]">{formatCurrency(form.consultingBudget)}</span>
            </div>
            <input
              type="range" min={500} max={6000} step={50}
              value={form.consultingBudget}
              onChange={e => set("consultingBudget")(parseInt(e.target.value))}
              className="w-full accent-[#C4956A]"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>$500</span><span>$6,000</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Education Budget / yr</Label>
              <span className="text-sm font-bold text-[#C4956A]">{formatCurrency(form.educationBudget)}</span>
            </div>
            <input
              type="range" min={5000} max={100000} step={1000}
              value={form.educationBudget}
              onChange={e => set("educationBudget")(parseInt(e.target.value))}
              className="w-full accent-[#C4956A]"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>$5,000</span><span>$100,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferred Countries */}
      <Card className="border-[#E8DDD3] shadow-sm">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <h2 className="font-bold text-[#1A0F0A] text-base">Preferred Countries</h2>
          <div className="flex flex-wrap gap-2">
            {COUNTRY_OPTIONS.map(c => (
              <button
                key={c} type="button"
                onClick={() => toggleCountry(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  form.preferredCountries.includes(c)
                    ? "border-[#C4956A] bg-[#C4956A]/10 text-[#C4956A]"
                    : "border-[#E8DDD3] text-gray-500 hover:border-[#C4956A]/50"
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
        <Button onClick={handleSave} isLoading={isSaving} className="bg-[#C4956A] hover:bg-[#b8845e] text-white">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
        <Button variant="ghost" onClick={onClose} className="text-gray-500">Cancel</Button>
        <AnimatePresence>
          {saveStatus === "success" && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="text-sm font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Saved!
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
  const { data: stats } = useFetchWithAuth("/api/dashboard/stats", token);
  const { data: applications } = useFetchWithAuth("/api/applications", token);
  const { data: activities } = useFetchWithAuth("/api/dashboard/activity", token);
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const closeSidebar = () => setSidebarOpen(false);

  const SidebarContent = () => (
    <>
      <div className="h-16 sm:h-20 flex items-center px-6 border-b border-[#E8DDD3]">
        <span className="text-2xl font-display font-bold text-[#2C1810]">Lerank</span>
        <button onClick={closeSidebar} className="ml-auto md:hidden text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 flex-1">
        <nav className="space-y-1">
          <button onClick={() => { setActiveView("dashboard"); closeSidebar(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${
              activeView === "dashboard" ? "bg-[#C4956A]/10 text-[#C4956A]" : "text-[#8B7355] hover:bg-[#FAF6F1] hover:text-[#2C1810]"
            }`}>
            <LayoutDashboard className="w-5 h-5 shrink-0" /> Dashboard
          </button>
          <Link href="/compare" onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FAF6F1] text-[#8B7355] hover:text-[#2C1810] transition-colors">
            <FileText className="w-5 h-5 shrink-0" /> Find Consultants
          </Link>
          <button onClick={() => { setActiveView("dashboard"); closeSidebar(); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FAF6F1] text-[#8B7355] hover:text-[#2C1810] transition-colors text-left">
            <CreditCard className="w-5 h-5 shrink-0" /> Escrow Payments
          </button>
          <button onClick={() => { setActiveView("profile"); closeSidebar(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${
              activeView === "profile" ? "bg-[#C4956A]/10 text-[#C4956A]" : "text-[#8B7355] hover:bg-[#FAF6F1] hover:text-[#2C1810]"
            }`}>
            <UserCog className="w-5 h-5 shrink-0" /> Edit Profile
          </button>
        </nav>
      </div>
      <div className="p-4 border-t border-[#E8DDD3]">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-[#C4956A]/20 flex items-center justify-center text-[#C4956A] font-bold shrink-0">
            {user.fullName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-[#2C1810] truncate">{user.fullName}</div>
            <div className="text-xs text-[#8B7355]">Student</div>
          </div>
        </div>
        <button onClick={logout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-50 text-[#8B7355] hover:text-red-500 transition-colors text-sm">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex">
      {/* Sidebar — desktop fixed */}
      <aside className="hidden md:flex w-64 bg-white border-r border-[#E8DDD3] flex-col fixed inset-y-0 z-20">
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
              className="fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-[#E8DDD3] flex flex-col md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 bg-white border-b border-[#E8DDD3] sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="text-[#8B7355]">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-display font-bold text-[#2C1810]">Lerank</span>
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
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1A0F0A]">
                      Welcome back, {user.fullName.split(' ')[0]}!
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">Here is the latest on your university applications.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveView("profile")}
                      className="border-[#E8DDD3] text-[#8B7355] hover:text-[#2C1810]">
                      <UserCog className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Edit Profile</span>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white border-[#E8DDD3]">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <Card className="border-none shadow-md">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-gray-500 font-medium mb-1 sm:mb-2">Active Apps</div>
                      <div className="text-2xl sm:text-3xl font-bold text-[#1A0F0A]">{stats?.activeApplications || 0}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-gray-500 font-medium mb-1 sm:mb-2">Milestones (wk)</div>
                      <div className="text-2xl sm:text-3xl font-bold text-[#C4956A]">{stats?.milestonesCompletedThisWeek || 0}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md bg-[#C4956A]/10 border border-[#C4956A]/20">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-[#C4956A] font-medium mb-1 sm:mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 shrink-0" /> Escrow
                      </div>
                      <div className="text-xl sm:text-3xl font-bold text-[#2C1810]">{formatCurrency(stats?.moneyInEscrow || 0)}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md">
                    <CardContent className="p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-gray-500 font-medium mb-1 sm:mb-2">Released</div>
                      <div className="text-xl sm:text-3xl font-bold text-emerald-600">{formatCurrency(stats?.moneyReleased || 0)}</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Active Applications */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg sm:text-xl font-bold text-[#1A0F0A]">Active Applications</h2>
                      <Link href="/compare" className="text-sm font-semibold text-[#C4956A] hover:underline">
                        Find consultant
                      </Link>
                    </div>

                    {Array.isArray(applications) && applications.map((app: any) => (
                      <Card key={app.id} className="border-[#E8DDD3] shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-4 gap-3">
                            <div>
                              <h3 className="font-bold">{app.companyName}</h3>
                              <p className="text-sm text-gray-500">{app.serviceName}</p>
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
                              <span className="font-medium text-gray-700">Progress</span>
                              <span className="font-bold">{Math.round(app.progressPercent || 0)}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#C4956A] to-[#8B7355] transition-all duration-1000" style={{ width: `${app.progressPercent || 0}%` }} />
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-sm text-gray-500">Total: {formatCurrency(app.totalAmount)}</span>
                            <Button variant="ghost" size="sm" className="text-[#C4956A]">
                              Details <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {(!applications || applications.length === 0) && (
                      <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4 text-sm">No active applications yet.</p>
                        <Link href="/compare">
                          <Button className="bg-[#C4956A] hover:bg-[#b8845e] text-white">Browse Consultants</Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Activity Feed */}
                  <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-[#1A0F0A]">Recent Activity</h2>
                    <Card className="border-[#E8DDD3] shadow-sm">
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                          {Array.isArray(activities) && activities.map((activity: any) => (
                            <div key={activity.id} className="p-4 flex gap-3">
                              <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.type === 'payment' ? 'bg-emerald-100 text-emerald-600' :
                                activity.type === 'milestone_update' ? 'bg-[#C4956A]/20 text-[#C4956A]' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                {activity.type === 'payment' ? <DollarSign className="w-4 h-4" /> :
                                 activity.type === 'milestone_update' ? <CheckCircle className="w-4 h-4" /> :
                                 <Activity className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#1A0F0A]">{activity.message}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{new Date(activity.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                          {(!activities || !activities.length) && (
                            <div className="p-6 text-center text-sm text-gray-500">No recent activity</div>
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
