import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { useEffect, useState } from "react";
import { Card, CardContent, Button, Input, Label } from "@/components/ui-elements";
import { ShieldCheck, Activity, Users, Building, AlertCircle, LogOut, Search, Plus, Trash2, UserCog, X, Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export default function SuperAdmin() {
  const { user, logout, token } = useAuth();
  const { t } = useLanguage();
  const ta = t.superAdmin;
  const [analytics, setAnalytics] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchCode, setSearchCode] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchError, setSearchError] = useState("");

  // Add user modal
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: "", email: "", password: "", role: "student" as string, companyId: "" as string });
  const [addUserError, setAddUserError] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Role change modal
  const [roleChangeUser, setRoleChangeUser] = useState<any>(null);
  const [newRole, setNewRole] = useState("student");
  const [newCompanyId, setNewCompanyId] = useState("");

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    fetch("/api/admin/analytics", { headers }).then(r => r.ok ? r.json() : null).then(setAnalytics);
    fetch("/api/admin/companies", { headers }).then(r => r.ok ? r.json() : []).then(data => setCompanies(Array.isArray(data) ? data : []));
    fetch("/api/admin/users", { headers }).then(r => r.ok ? r.json() : []).then(data => setUsers(Array.isArray(data) ? data : []));
  }, [token]);

  const toggleCompanyStatus = async (id: number, isActive: boolean) => {
    await fetch(`/api/admin/companies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isActive: !isActive }),
    });
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, isActive: !isActive } : c));
  };

  const handleSearch = async () => {
    if (!searchCode.trim()) return;
    setSearchError("");
    setSearchResult(null);
    try {
      const res = await fetch(`/api/admin/users/search?code=${searchCode.trim().toUpperCase()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSearchResult(await res.json());
      } else {
        const err = await res.json().catch(() => ({}));
        setSearchError(err.message || "Not found");
      }
    } catch {
      setSearchError("Search failed");
    }
  };

  const handleAddUser = async () => {
    setIsAddingUser(true);
    setAddUserError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          fullName: newUser.fullName,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
          companyId: newUser.companyId ? parseInt(newUser.companyId) : null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create user");
      }
      const created = await res.json();
      setUsers(prev => [...prev, created]);
      setShowAddUser(false);
      setNewUser({ fullName: "", email: "", password: "", role: "student", companyId: "" });
    } catch (e: any) {
      setAddUserError(e.message);
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm(ta.confirmDelete)) return;
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleChangeRole = async () => {
    if (!roleChangeUser) return;
    const res = await fetch(`/api/admin/users/${roleChangeUser.id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role: newRole, companyId: newCompanyId ? parseInt(newCompanyId) : null }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      setRoleChangeUser(null);
    }
  };

  if (!user || user.role !== 'super_admin') return <div className="p-8 text-center">404 / Access Denied</div>;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-gold" />
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Platform Oversight</h1>
              <p className="text-muted-foreground">Super Admin Dashboard — {user.fullName}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </header>

        {/* Analytics Cards */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Platform Revenue (3%)</div>
                  <div className="text-3xl font-bold text-gold">{formatCurrency(analytics?.totalRevenue || 0)}</div>
                </div>
                <Activity className="w-6 h-6 text-gold/40" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Students</div>
                  <div className="text-3xl font-bold text-foreground">{analytics?.totalStudents || 0}</div>
                </div>
                <Users className="w-6 h-6 text-muted-foreground/40" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Consultant Companies</div>
                  <div className="text-3xl font-bold text-foreground">{analytics?.totalCompanies || 0}</div>
                </div>
                <Building className="w-6 h-6 text-muted-foreground/40" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-red-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-red-400 mb-1">Active Applications</div>
                  <div className="text-3xl font-bold text-foreground">{analytics?.activeApplications || 0}</div>
                </div>
                <AlertCircle className="w-6 h-6 text-red-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">{analytics?.completedTransactions || 0}</div>
            <div className="text-sm text-muted-foreground mt-1">Released Escrows</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm text-center">
            <div className="text-2xl font-bold text-amber-600">{analytics?.pendingTransactions || 0}</div>
            <div className="text-sm text-muted-foreground mt-1">Pending/Held</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-sm text-center">
            <div className="text-2xl font-bold text-red-500">{analytics?.refundedTransactions || 0}</div>
            <div className="text-sm text-muted-foreground mt-1">Refunded</div>
          </div>
        </div>

        {/* User Management */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">{ta.users}</h2>
            <Button onClick={() => setShowAddUser(true)} className="gap-2">
              <Plus className="w-4 h-4" /> {ta.addUser}
            </Button>
          </div>

          {/* Search by Code */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchCode}
                onChange={e => setSearchCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
                placeholder={ta.searchPlaceholder}
                className="pl-10 font-mono uppercase tracking-wider"
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button variant="outline" onClick={handleSearch}>{ta.searchByCode}</Button>
          </div>

          {/* Search Result */}
          <AnimatePresence>
            {searchResult && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4">
                <Card className="border-gold/30 bg-gold/5">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-foreground">{searchResult.fullName}</div>
                      <div className="text-sm text-muted-foreground">{searchResult.email} — <span className="font-mono text-gold">{searchResult.userCode}</span> — {searchResult.role}</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSearchResult(null)}><X className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {searchError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 text-sm text-red-500">{searchError}</motion.p>
            )}
          </AnimatePresence>

          {/* Users Table */}
          <Card className="bg-card border-border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-border bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">{ta.userCode}</th>
                  <th className="px-6 py-4">{ta.fullName}</th>
                  <th className="px-6 py-4">{ta.email}</th>
                  <th className="px-6 py-4">{ta.role}</th>
                  <th className="px-6 py-4 text-right">{ta.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-mono font-bold text-gold text-sm">{u.userCode || "—"}</td>
                    <td className="px-6 py-4 font-bold text-foreground">{u.fullName}</td>
                    <td className="px-6 py-4 text-muted-foreground text-sm">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        u.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                        u.role === 'company_admin' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {u.role.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => { setRoleChangeUser(u); setNewRole(u.role); setNewCompanyId(u.companyId?.toString() || ""); }}>
                        <UserCog className="w-3 h-3 mr-1" /> {ta.changeRole}
                      </Button>
                      {u.role !== 'super_admin' && (
                        <Button size="sm" variant="outline" className="border-red-300 text-red-500 hover:bg-red-50" onClick={() => handleDeleteUser(u.id)}>
                          <Trash2 className="w-3 h-3 mr-1" /> {ta.deleteUser}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {!users.length && (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">{ta.noUsers}</td></tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Companies Table */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Consultant Companies</h2>
          <Card className="bg-card border-border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-border bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Countries</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {companies.map(c => (
                  <tr key={c.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-bold text-foreground">{c.name}</td>
                    <td className="px-6 py-4 text-muted-foreground text-sm">{c.specializedCountries?.join(", ")}</td>
                    <td className="px-6 py-4 text-amber-600 font-bold">⭐ {c.rating}</td>
                    <td className="px-6 py-4 text-foreground">{c.studentsHelped}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                        {c.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className={c.isActive ? "border-red-300 text-red-500 hover:bg-red-50" : "border-green-300 text-green-600 hover:bg-green-50"}
                        onClick={() => toggleCompanyStatus(c.id, c.isActive)}
                      >
                        {c.isActive ? "Suspend" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))}
                {!companies.length && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No companies found.</td></tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Add User Modal */}
        <AnimatePresence>
          {showAddUser && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40" onClick={() => setShowAddUser(false)} />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                <Card className="shadow-2xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">{ta.addUser}</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowAddUser(false)}><X className="w-5 h-5" /></Button>
                    </div>
                    <div className="space-y-2">
                      <Label>{ta.fullName}</Label>
                      <Input value={newUser.fullName} onChange={e => setNewUser(u => ({ ...u, fullName: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{ta.email}</Label>
                      <Input type="email" value={newUser.email} onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{ta.password}</Label>
                      <Input type="password" value={newUser.password} onChange={e => setNewUser(u => ({ ...u, password: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{ta.role}</Label>
                      <select value={newUser.role} onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))}
                        className="flex h-11 w-full rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="student">Student</option>
                        <option value="company_admin">Company Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </div>
                    {(newUser.role === "company_admin") && (
                      <div className="space-y-2">
                        <Label>{ta.selectCompany}</Label>
                        <select value={newUser.companyId} onChange={e => setNewUser(u => ({ ...u, companyId: e.target.value }))}
                          className="flex h-11 w-full rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">-- Select --</option>
                          {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                    )}
                    {addUserError && <p className="text-sm text-red-500">{addUserError}</p>}
                    <Button onClick={handleAddUser} isLoading={isAddingUser} className="w-full">{ta.createUser}</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Change Role Modal */}
        <AnimatePresence>
          {roleChangeUser && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40" onClick={() => setRoleChangeUser(null)} />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                <Card className="shadow-2xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold">{ta.changeRole}: {roleChangeUser.fullName}</h3>
                      <Button variant="ghost" size="icon" onClick={() => setRoleChangeUser(null)}><X className="w-5 h-5" /></Button>
                    </div>
                    <div className="space-y-2">
                      <Label>{ta.role}</Label>
                      <select value={newRole} onChange={e => setNewRole(e.target.value)}
                        className="flex h-11 w-full rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="student">Student</option>
                        <option value="company_admin">Company Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </div>
                    {newRole === "company_admin" && (
                      <div className="space-y-2">
                        <Label>{ta.selectCompany}</Label>
                        <select value={newCompanyId} onChange={e => setNewCompanyId(e.target.value)}
                          className="flex h-11 w-full rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">-- Select --</option>
                          {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                    )}
                    <Button onClick={handleChangeRole} className="w-full">{ta.changeRole}</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
