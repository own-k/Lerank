import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Card, CardContent, Button } from "@/components/ui-elements";
import { ShieldCheck, Activity, Users, Building, AlertCircle, LogOut } from "lucide-react";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export default function SuperAdmin() {
  const { user, logout } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.ok ? r.json() : null).then(setAnalytics);
    fetch("/api/admin/companies").then(r => r.ok ? r.json() : []).then(data => setCompanies(Array.isArray(data) ? data : []));
  }, []);

  const toggleCompanyStatus = async (id: number, isActive: boolean) => {
    await fetch(`/api/admin/companies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, isActive: !isActive } : c));
  };

  if (!user || user.role !== 'super_admin') return <div className="p-8 text-center">404 / Access Denied</div>;

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2C1810] p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex items-center justify-between border-b border-[#E8DDD3] pb-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-[#C4956A]" />
            <div>
              <h1 className="text-3xl font-display font-bold text-[#2C1810]">Platform Oversight</h1>
              <p className="text-[#8B7355]">Super Admin Dashboard — {user.fullName}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-[#8B7355] hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </header>

        <div className="grid grid-cols-4 gap-6">
          <Card className="bg-white border-[#E8DDD3] shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-[#8B7355] mb-1">Platform Revenue (3%)</div>
                  <div className="text-3xl font-bold text-[#C4956A]">{formatCurrency(analytics?.totalRevenue || 0)}</div>
                </div>
                <Activity className="w-6 h-6 text-[#C4956A]/40" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#E8DDD3] shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-[#8B7355] mb-1">Total Students</div>
                  <div className="text-3xl font-bold text-[#2C1810]">{analytics?.totalStudents || 0}</div>
                </div>
                <Users className="w-6 h-6 text-[#8B7355]/40" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#E8DDD3] shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-[#8B7355] mb-1">Consultant Companies</div>
                  <div className="text-3xl font-bold text-[#2C1810]">{analytics?.totalCompanies || 0}</div>
                </div>
                <Building className="w-6 h-6 text-[#8B7355]/40" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-red-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-red-400 mb-1">Active Applications</div>
                  <div className="text-3xl font-bold text-[#2C1810]">{analytics?.activeApplications || 0}</div>
                </div>
                <AlertCircle className="w-6 h-6 text-red-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-4 border border-[#E8DDD3] shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">{analytics?.completedTransactions || 0}</div>
            <div className="text-sm text-[#8B7355] mt-1">Released Escrows</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E8DDD3] shadow-sm text-center">
            <div className="text-2xl font-bold text-amber-600">{analytics?.pendingTransactions || 0}</div>
            <div className="text-sm text-[#8B7355] mt-1">Pending/Held</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E8DDD3] shadow-sm text-center">
            <div className="text-2xl font-bold text-red-500">{analytics?.refundedTransactions || 0}</div>
            <div className="text-sm text-[#8B7355] mt-1">Refunded</div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#2C1810] mb-4">Consultant Companies</h2>
          <Card className="bg-white border-[#E8DDD3] shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-[#E8DDD3] bg-[#FAF6F1] text-xs uppercase text-[#8B7355]">
                <tr>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Countries</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDD3]">
                {companies.map(c => (
                  <tr key={c.id} className="hover:bg-[#FAF6F1]">
                    <td className="px-6 py-4 font-bold text-[#2C1810]">{c.name}</td>
                    <td className="px-6 py-4 text-[#8B7355] text-sm">{c.specializedCountries?.join(", ")}</td>
                    <td className="px-6 py-4 text-amber-600 font-bold">⭐ {c.rating}</td>
                    <td className="px-6 py-4 text-[#2C1810]">{c.studentsHelped}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
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
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-[#8B7355]">No companies found.</td></tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}
