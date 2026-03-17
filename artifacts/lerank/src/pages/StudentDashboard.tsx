import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Card, CardContent, Badge, Button } from "@/components/ui-elements";
import { Link } from "wouter";
import { Activity, Bell, CheckCircle, CreditCard, LayoutDashboard, LogOut, FileText, ChevronRight, DollarSign, ShieldCheck } from "lucide-react";

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

export default function StudentDashboard() {
  const { user, logout, token } = useAuth();
  const { data: stats } = useFetchWithAuth("/api/dashboard/stats", token);
  const { data: applications } = useFetchWithAuth("/api/applications", token);
  const { data: activities } = useFetchWithAuth("/api/dashboard/activity", token);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A0F0A] text-[#F5EDE4] flex flex-col fixed inset-y-0 z-10">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-2xl font-display font-bold text-white">Lerank</span>
        </div>
        <div className="p-4 flex-1">
          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#C4956A]/20 text-[#C4956A] font-medium">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/compare" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <FileText className="w-5 h-5" /> Find Consultants
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <CreditCard className="w-5 h-5" /> Escrow Payments
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-[#8B7355] flex items-center justify-center text-white font-bold">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{user.fullName}</div>
              <div className="text-xs text-gray-400">Student</div>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">

          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-display font-bold text-[#1A0F0A]">Welcome back, {user.fullName.split(' ')[0]}!</h1>
              <p className="text-gray-500 mt-1">Here is the latest on your university applications.</p>
            </div>
            <Button variant="outline" className="bg-white"><Bell className="w-4 h-4 mr-2" /> Notifications</Button>
          </header>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="text-sm text-gray-500 font-medium mb-2">Active Applications</div>
                <div className="text-3xl font-bold text-[#1A0F0A]">{stats?.activeApplications || 0}</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="text-sm text-gray-500 font-medium mb-2">Milestones Done (Week)</div>
                <div className="text-3xl font-bold text-[#C4956A]">{stats?.milestonesCompletedThisWeek || 0}</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-[#1A0F0A] text-white">
              <CardContent className="p-6">
                <div className="text-sm text-gray-400 font-medium mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Funds in Escrow</div>
                <div className="text-3xl font-bold">{formatCurrency(stats?.moneyInEscrow || 0)}</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="text-sm text-gray-500 font-medium mb-2">Released to Consultants</div>
                <div className="text-3xl font-bold text-emerald-600">{formatCurrency(stats?.moneyReleased || 0)}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Applications */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#1A0F0A]">Active Applications</h2>
                <Link href="/compare" className="text-sm font-semibold text-[#C4956A] hover:underline">Find new consultant</Link>
              </div>

              {Array.isArray(applications) && applications.map((app: any) => (
                <Card key={app.id} className="border-[#E8DDD3] shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-bold text-lg">{app.companyName}</h3>
                        <p className="text-sm text-gray-500">{app.serviceName}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        app.escrowStatus === 'held' ? 'bg-blue-100 text-blue-700' :
                        app.escrowStatus === 'released' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        Escrow: {app.escrowStatus?.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">Overall Progress</span>
                        <span className="font-bold">{Math.round(app.progressPercent || 0)}%</span>
                      </div>
                      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#C4956A] to-[#8B7355] transition-all duration-1000" style={{ width: `${app.progressPercent || 0}%` }}></div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total: {formatCurrency(app.totalAmount)}</span>
                      <Button variant="ghost" size="sm" className="text-[#C4956A]">View Details <ChevronRight className="w-4 h-4 ml-1" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!applications || applications.length === 0) && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                  <p className="text-gray-500 mb-4">You have no active applications yet.</p>
                  <Link href="/compare"><Button className="bg-[#C4956A] hover:bg-[#b8845e] text-white">Browse Consultants</Button></Link>
                </div>
              )}
            </div>

            {/* Activity Feed */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#1A0F0A]">Recent Activity</h2>
              <Card className="border-[#E8DDD3] shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {Array.isArray(activities) && activities.map((activity: any) => (
                      <div key={activity.id} className="p-4 flex gap-4">
                        <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
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
                          <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                    {(!activities || !activities.length) && <div className="p-6 text-center text-sm text-gray-500">No recent activity</div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
