import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, Button, Input, Label } from "@/components/ui-elements";
import { CheckCircle, Search, Users, Settings, Target, LogOut, Save, X, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ActiveTab = "students" | "templates" | "settings";

const COUNTRY_OPTIONS = ["USA", "UK", "Canada", "Australia", "Germany", "Netherlands", "France", "Singapore", "South Korea", "Japan", "Malaysia", "Turkey"];

export default function CompanyAdmin() {
  const { user, logout, token } = useAuth();
  const { t } = useLanguage();
  const tc = t.companySettings;
  const [students, setStudents] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("students");

  // Company settings state
  const [companyData, setCompanyData] = useState<any>(null);
  const [settingsForm, setSettingsForm] = useState({
    name: "",
    bio: "",
    contactEmail: "",
    contactPhone: "",
    location: "",
    workingHours: "",
    requirementsPerCountry: "" as string,
    priceMin: 500,
    priceMax: 5000,
    specializedCountries: [] as string[],
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState<"idle" | "success" | "error">("idle");
  const [settingsError, setSettingsError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch("/api/company/students", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(data => setStudents(Array.isArray(data) ? data : []))
      .catch(() => setStudents([]));
  }, [token]);

  useEffect(() => {
    if (!token || activeTab !== "settings") return;
    fetch("/api/company/settings", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setCompanyData(data);
          setSettingsForm({
            name: data.name || "",
            bio: data.bio || "",
            contactEmail: data.contactEmail || "",
            contactPhone: data.contactPhone || "",
            location: data.location || "",
            workingHours: data.workingHours || "",
            requirementsPerCountry: data.requirementsPerCountry || "",
            priceMin: data.priceMin || 500,
            priceMax: data.priceMax || 5000,
            specializedCountries: data.specializedCountries || [],
          });
        }
      });
  }, [token, activeTab]);

  const loadApplicationDetail = async (appId: number) => {
    if (!token) return;
    const res = await fetch(`/api/applications/${appId}`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      const data = await res.json();
      setSelectedApp(data);
    }
  };

  const handleMilestoneUpdate = async (milestoneId: number, status: string) => {
    if (!token) return;
    await fetch(`/api/milestones/${milestoneId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    if (selectedApp) loadApplicationDetail(selectedApp.id);
    const res = await fetch("/api/company/students", { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setStudents(await res.json());
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    setSettingsStatus("idle");
    setSettingsError("");
    try {
      const res = await fetch("/api/company/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(settingsForm),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to save");
      }
      setSettingsStatus("success");
      setTimeout(() => setSettingsStatus("idle"), 3000);
    } catch (e: any) {
      setSettingsStatus("error");
      setSettingsError(e.message || "Error");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const toggleCountry = (c: string) => {
    setSettingsForm(prev => ({
      ...prev,
      specializedCountries: prev.specializedCountries.includes(c)
        ? prev.specializedCountries.filter(x => x !== c)
        : [...prev.specializedCountries, c],
    }));
  };

  if (!user || user.role !== 'company_admin') return <div className="p-8 text-center text-red-500">Access Denied</div>;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed inset-y-0 z-10">
        <div className="h-20 flex items-center px-6 border-b border-border">
          <span className="text-xl font-bold text-foreground">Consultant Portal</span>
        </div>
        <div className="p-4 flex-1 space-y-1">
          <div className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Management</div>
          <button onClick={() => setActiveTab("students")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold cursor-pointer ${activeTab === "students" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-muted"}`}>
            <Users className="w-5 h-5" /> Students
          </button>
          <button onClick={() => setActiveTab("templates")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer ${activeTab === "templates" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-muted"}`}>
            <Target className="w-5 h-5" /> Templates
          </button>
          <button onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium cursor-pointer ${activeTab === "settings" ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-muted"}`}>
            <Settings className="w-5 h-5" /> {tc.title}
          </button>
        </div>
        <div className="p-4 border-t border-border">
          <div className="text-sm font-medium text-foreground mb-1">{user.fullName}</div>
          <button onClick={logout} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {activeTab === "settings" ? (
            /* ── Company Settings ── */
            <div className="max-w-3xl space-y-6">
              <header>
                <h1 className="text-3xl font-bold text-foreground">{tc.title}</h1>
                <p className="text-muted-foreground">{tc.subtitle}</p>
              </header>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5 sm:p-6 space-y-5">
                  <div className="space-y-2">
                    <Label>{tc.companyName}</Label>
                    <Input value={settingsForm.name} onChange={e => setSettingsForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>{tc.bio}</Label>
                    <textarea
                      value={settingsForm.bio}
                      onChange={e => setSettingsForm(f => ({ ...f, bio: e.target.value }))}
                      rows={4}
                      className="flex w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5 sm:p-6 space-y-5">
                  <h2 className="font-bold text-foreground text-base">Contact Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{tc.contactEmail}</Label>
                      <Input type="email" value={settingsForm.contactEmail} onChange={e => setSettingsForm(f => ({ ...f, contactEmail: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{tc.contactPhone}</Label>
                      <Input value={settingsForm.contactPhone} onChange={e => setSettingsForm(f => ({ ...f, contactPhone: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{tc.location}</Label>
                      <Input value={settingsForm.location} onChange={e => setSettingsForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Tashkent, Uzbekistan" />
                    </div>
                    <div className="space-y-2">
                      <Label>{tc.workingHours}</Label>
                      <Input value={settingsForm.workingHours} onChange={e => setSettingsForm(f => ({ ...f, workingHours: e.target.value }))} placeholder="e.g. Mon-Fri 9:00-18:00" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5 sm:p-6 space-y-5">
                  <h2 className="font-bold text-foreground text-base">{tc.requirements}</h2>
                  <p className="text-sm text-muted-foreground">{tc.requirementsHint}</p>
                  <textarea
                    value={settingsForm.requirementsPerCountry}
                    onChange={e => setSettingsForm(f => ({ ...f, requirementsPerCountry: e.target.value }))}
                    rows={6}
                    placeholder={"USA: TOEFL 90+, GPA 3.5+\nUK: IELTS 7.0+, Personal Statement\nGermany: B2 German, APS Certificate"}
                    className="flex w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none font-mono"
                  />
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5 sm:p-6 space-y-5">
                  <h2 className="font-bold text-foreground text-base">{tc.pricing}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{tc.priceMin}</Label>
                      <Input type="number" value={settingsForm.priceMin} onChange={e => setSettingsForm(f => ({ ...f, priceMin: parseInt(e.target.value) || 0 }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{tc.priceMax}</Label>
                      <Input type="number" value={settingsForm.priceMax} onChange={e => setSettingsForm(f => ({ ...f, priceMax: parseInt(e.target.value) || 0 }))} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5 sm:p-6 space-y-4">
                  <h2 className="font-bold text-foreground text-base">{tc.countries}</h2>
                  <div className="flex flex-wrap gap-2">
                    {COUNTRY_OPTIONS.map(c => (
                      <button
                        key={c} type="button"
                        onClick={() => toggleCountry(c)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                          settingsForm.specializedCountries.includes(c)
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

              <div className="flex flex-wrap items-center gap-3 pb-8">
                <Button onClick={handleSaveSettings} isLoading={isSavingSettings} className="bg-primary hover:bg-primary/85 text-primary-foreground">
                  <Save className="w-4 h-4 mr-2" /> {tc.save}
                </Button>
                <AnimatePresence>
                  {settingsStatus === "success" && (
                    <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> {tc.saved}
                    </motion.span>
                  )}
                  {settingsStatus === "error" && (
                    <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-sm font-medium text-red-500">
                      {settingsError}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* ── Students tab (default) ── */
            <>
              <header>
                <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
                <p className="text-muted-foreground">Manage active applications and update milestones.</p>
              </header>

              <Card className="shadow-sm">
                <div className="p-4 border-b flex justify-between items-center bg-muted/30">
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input placeholder="Search students..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Service</th>
                        <th className="px-6 py-4">Progress</th>
                        <th className="px-6 py-4">Escrow Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {students.map(student => (
                        <tr key={student.applicationId} className="hover:bg-muted/30">
                          <td className="px-6 py-4 font-medium text-foreground">{student.studentName}</td>
                          <td className="px-6 py-4 text-muted-foreground">{student.serviceName}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-muted rounded-full h-2 max-w-[100px]">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${student.progressPercent}%` }}></div>
                              </div>
                              <span className="text-xs font-bold">{Math.round(student.progressPercent)}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                              student.escrowStatus === 'held' ? 'bg-blue-100 text-blue-700' :
                              student.escrowStatus === 'released' ? 'bg-green-100 text-green-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>{student.escrowStatus}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button size="sm" onClick={() => loadApplicationDetail(student.applicationId)}>Update Milestones</Button>
                          </td>
                        </tr>
                      ))}
                      {!students.length && <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No active students yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </Card>

              {selectedApp && (
                <Card className="border-primary shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Update Milestones for Application #{selectedApp.id}</h2>
                      <Button variant="ghost" onClick={() => setSelectedApp(null)}>Close</Button>
                    </div>

                    <div className="space-y-4">
                      {selectedApp.milestones?.map((milestone: any) => (
                        <div key={milestone.id} className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/50">
                          <div>
                            <div className="font-bold text-foreground">{milestone.name}</div>
                            <div className="text-sm text-muted-foreground">Current: <span className="font-semibold capitalize">{milestone.status.replace(/_/g, ' ')}</span></div>
                          </div>
                          <div className="flex gap-2">
                            {milestone.status === 'completed' ? (
                              <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-100 px-3 py-1.5 rounded-lg text-sm">
                                <CheckCircle className="w-4 h-4" /> Completed
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                {milestone.status === 'not_started' && (
                                  <Button size="sm" variant="outline" onClick={() => handleMilestoneUpdate(milestone.id, 'in_progress')}>
                                    Start
                                  </Button>
                                )}
                                {milestone.status === 'in_progress' && (
                                  <Button size="sm" variant="outline" onClick={() => handleMilestoneUpdate(milestone.id, 'under_review')}>
                                    Submit for Review
                                  </Button>
                                )}
                                {milestone.status === 'under_review' && (
                                  <Button size="sm" onClick={() => handleMilestoneUpdate(milestone.id, 'completed')}>
                                    Mark Complete
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
