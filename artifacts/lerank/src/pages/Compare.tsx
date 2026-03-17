import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button, Input, Card, CardContent, Badge, Label } from "@/components/ui-elements";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, MapPin, Star, GraduationCap, DollarSign, ArrowRight, Loader2, Filter } from "lucide-react";
import { useLocation } from "wouter";

export default function Compare() {
  const { user, login, register, isLoading: isAuthLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState("");

  const [consultants, setConsultants] = useState<any[]>([]);
  const [isLoadingConsultants, setIsLoadingConsultants] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (user?.onboardingCompleted) {
      setIsLoadingConsultants(true);
      fetch("/api/consultants?sortBy=bestMatch")
        .then(r => r.json())
        .then(data => setConsultants(Array.isArray(data) ? data : []))
        .catch(() => setConsultants([]))
        .finally(() => setIsLoadingConsultants(false));
    }
  }, [user?.onboardingCompleted]);

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [profileData, setProfileData] = useState({
    ieltsScore: 7,
    gpa: 3.5,
    gpaScale: 4.0,
    budgetMax: 5000,
    preferredCountries: ["USA", "UK"],
    degreeLevel: "master"
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (isLoginMode) {
        await login(email, password);
      } else {
        await register(fullName, email, password);
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    }
  };

  const handleOnboardingSubmit = async () => {
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...profileData, onboardingCompleted: true }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthLoading) {
    return <div className="min-h-screen bg-[#1A0F0A] flex items-center justify-center"><Loader2 className="w-10 h-10 text-[#C4956A] animate-spin" /></div>;
  }

  // --- VIEW 1: AUTH ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#1A0F0A] flex flex-col items-center justify-center p-6 dark">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-display font-bold text-white mb-2">Lerank</h1>
            <p className="text-[#E8DDD3]">Your journey to top universities starts here.</p>
          </div>
          
          <Card className="bg-[#2C1810] border-[#8B7355]/30">
            <CardContent className="p-8">
              <form onSubmit={handleAuth} className="space-y-6">
                {!isLoginMode && (
                  <div className="space-y-2">
                    <Label className="text-[#E8DDD3]">Full Name</Label>
                    <Input 
                      required 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      className="bg-[#1A0F0A] border-[#8B7355]/50 text-white focus-visible:ring-[#C4956A]" 
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label className="text-[#E8DDD3]">Email Address</Label>
                  <Input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="bg-[#1A0F0A] border-[#8B7355]/50 text-white focus-visible:ring-[#C4956A]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#E8DDD3]">Password</Label>
                  <Input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="bg-[#1A0F0A] border-[#8B7355]/50 text-white focus-visible:ring-[#C4956A]" 
                  />
                </div>

                {authError && <p className="text-red-400 text-sm">{authError}</p>}

                <Button type="submit" className="w-full bg-[#C4956A] hover:bg-[#D4C4B0] text-[#1A0F0A]">
                  {isLoginMode ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-[#8B7355] hover:text-[#C4956A] text-sm">
                  {isLoginMode ? "Need an account? Register" : "Already have an account? Sign in"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // --- VIEW 2: ONBOARDING WIZARD ---
  if (!user.onboardingCompleted) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold text-[#1A0F0A] mb-4">Let's build your profile</h1>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(step => (
                <div key={step} className={`h-2 rounded-full flex-1 ${step <= onboardingStep ? 'bg-[#C4956A]' : 'bg-[#E8DDD3]'}`} />
              ))}
            </div>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardContent className="p-10">
              <AnimatePresence mode="wait">
                {onboardingStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <h2 className="text-2xl font-bold">Academic Background</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>GPA</Label>
                        <Input type="number" step="0.1" value={profileData.gpa} onChange={e => setProfileData({...profileData, gpa: parseFloat(e.target.value)})} />
                      </div>
                      <div className="space-y-2">
                        <Label>GPA Scale</Label>
                        <select className="w-full h-12 rounded-xl border border-border px-4" value={profileData.gpaScale} onChange={e => setProfileData({...profileData, gpaScale: parseFloat(e.target.value)})}>
                          <option value="4.0">4.0</option>
                          <option value="5.0">5.0</option>
                          <option value="10.0">10.0</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>IELTS Score (Optional)</Label>
                        <Input type="number" step="0.5" value={profileData.ieltsScore} onChange={e => setProfileData({...profileData, ieltsScore: parseFloat(e.target.value)})} />
                      </div>
                    </div>
                    <Button onClick={() => setOnboardingStep(2)} className="w-full">Continue <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </motion.div>
                )}

                {onboardingStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <h2 className="text-2xl font-bold">Preferences</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Target Degree Level</Label>
                        <div className="flex gap-4">
                          {['bachelor', 'master', 'phd'].map(level => (
                            <button
                              key={level}
                              onClick={() => setProfileData({...profileData, degreeLevel: level})}
                              className={`flex-1 py-4 rounded-xl border-2 capitalize font-semibold transition-colors ${profileData.degreeLevel === level ? 'border-[#C4956A] bg-[#C4956A]/10 text-[#C4956A]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Consulting Budget (USD)</Label>
                        <p className="text-sm text-gray-500 mb-4">How much are you willing to spend on an education consultant?</p>
                        <input 
                          type="range" 
                          min="500" max="15000" step="500" 
                          value={profileData.budgetMax} 
                          onChange={(e) => setProfileData({...profileData, budgetMax: parseInt(e.target.value)})}
                          className="w-full accent-[#C4956A]"
                        />
                        <div className="text-center font-bold text-2xl text-[#1A0F0A]">Up to ${profileData.budgetMax}</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setOnboardingStep(1)}>Back</Button>
                      <Button onClick={() => setOnboardingStep(3)} className="flex-1">Continue <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    </div>
                  </motion.div>
                )}

                {onboardingStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <h2 className="text-2xl font-bold text-center">Ready to find your match</h2>
                    <p className="text-center text-gray-600">We'll use this data to rank the best consultants for your specific profile.</p>
                    
                    <div className="bg-[#FAF6F1] p-6 rounded-2xl border border-[#E8DDD3] space-y-4">
                      <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-500">Degree</span>
                        <span className="font-semibold capitalize">{profileData.degreeLevel}</span>
                      </div>
                      <div className="flex justify-between border-b pb-4">
                        <span className="text-gray-500">GPA</span>
                        <span className="font-semibold">{profileData.gpa} / {profileData.gpaScale}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Consultant Budget</span>
                        <span className="font-semibold">${profileData.budgetMax}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setOnboardingStep(2)}>Back</Button>
                      <Button 
                        onClick={handleOnboardingSubmit} 
                        isLoading={updateProfileMutation.isPending}
                        className="flex-1 bg-[#1A0F0A] text-white hover:bg-[#2C1810]"
                      >
                        Complete Profile & See Matches
                      </Button>
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

  // --- VIEW 3: CONSULTANT GRID ---
  return (
    <div className="min-h-screen bg-[#FAF6F1] pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E8DDD3] sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl text-[#1A0F0A]">Lerank Matches</div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600 hidden sm:block">Welcome, {user.fullName}</span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Filter className="w-5 h-5"/> Filters</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Destination Country</Label>
                <select className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm">
                  <option>All Countries</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <select className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm">
                  <option>Any</option>
                  <option>4.5+</option>
                  <option>4.8+</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-[#1A0F0A]">Your Top Matches</h1>
              <p className="text-gray-500 mt-1">Based on your {user.profile?.gpa} GPA and budget</p>
            </div>
          </div>

          {isLoadingConsultants ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#C4956A]" /></div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {consultants?.map((consultant) => (
                <Card key={consultant.id} className="hover:shadow-2xl transition-all duration-300 border-[#E8DDD3] bg-white group flex flex-col h-full">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400">
                          {consultant.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#1A0F0A] group-hover:text-[#C4956A] transition-colors">{consultant.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-gray-900">{consultant.rating}</span>
                            <span>({consultant.studentsHelped} students)</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {consultant.successRate}% Success
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-6 line-clamp-2">{consultant.description || "Premium education consulting services."}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{consultant.specializedCountries.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">${consultant.priceMin} - ${consultant.priceMax}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 mt-auto flex gap-3">
                      <Button variant="outline" className="flex-1">View Profile</Button>
                      <Button className="flex-1 bg-[#1A0F0A] hover:bg-[#2C1810]">Hire & Pay into Escrow</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {consultants?.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500">
                  No consultants found matching your criteria. Try adjusting your filters.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
