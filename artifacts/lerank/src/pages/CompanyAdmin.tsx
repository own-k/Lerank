import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, Button } from "@/components/ui-elements";
import { CheckCircle, Search, Users, Settings, Target, LogOut } from "lucide-react";

export default function CompanyAdmin() {
  const { user, logout, token } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    fetch("/api/company/students", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(data => setStudents(Array.isArray(data) ? data : []))
      .catch(() => setStudents([]));
  }, [token]);

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
    // Refresh student list
    const res = await fetch("/api/company/students", { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setStudents(await res.json());
  };

  if (!user || user.role !== 'company_admin') return <div className="p-8 text-center text-red-500">Access Denied</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-10">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-[#1A0F0A]">Consultant Portal</span>
        </div>
        <div className="p-4 flex-1 space-y-1">
          <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Management</div>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#C4956A]/10 text-[#C4956A] font-semibold cursor-pointer">
            <Users className="w-5 h-5" /> Students
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium cursor-pointer">
            <Target className="w-5 h-5" /> Templates
          </a>
          <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium cursor-pointer">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-1">{user.fullName}</div>
          <button onClick={logout} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-[#1A0F0A]">Student Management</h1>
            <p className="text-gray-500">Manage active applications and update milestones.</p>
          </header>

          <Card className="shadow-sm">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input placeholder="Search students..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#C4956A]" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Progress</th>
                    <th className="px-6 py-4">Escrow Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map(student => (
                    <tr key={student.applicationId} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{student.studentName}</td>
                      <td className="px-6 py-4 text-gray-600">{student.serviceName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div className="bg-[#C4956A] h-2 rounded-full" style={{ width: `${student.progressPercent}%` }}></div>
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
                  {!students.length && <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No active students yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </Card>

          {selectedApp && (
            <Card className="border-[#C4956A] shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Update Milestones for Application #{selectedApp.id}</h2>
                  <Button variant="ghost" onClick={() => setSelectedApp(null)}>Close</Button>
                </div>

                <div className="space-y-4">
                  {selectedApp.milestones?.map((milestone: any) => (
                    <div key={milestone.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <div>
                        <div className="font-bold text-gray-900">{milestone.name}</div>
                        <div className="text-sm text-gray-500">Current: <span className="font-semibold capitalize">{milestone.status.replace(/_/g, ' ')}</span></div>
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
        </div>
      </main>
    </div>
  );
}
