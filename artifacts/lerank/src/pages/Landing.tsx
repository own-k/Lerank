import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui-elements";
import { Shield, Target, TrendingUp, CheckCircle, ArrowRight, ShieldCheck, DollarSign, Globe2 } from "lucide-react";
import { useRef } from "react";

export default function Landing() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#1A0F0A] text-[#F5EDE4] selection:bg-[#C4956A]/30 overflow-x-hidden dark">
      {/* Texture overlay */}
      <div className="fixed inset-0 z-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C4956A] to-[#8B7355] flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-wider text-white">Lerank</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#E8DDD3]">
            <a href="#how-it-works" className="hover:text-[#C4956A] transition-colors">How it Works</a>
            <a href="#problem" className="hover:text-[#C4956A] transition-colors">The Problem</a>
            <a href="#guarantee" className="hover:text-[#C4956A] transition-colors">Guarantee</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/compare" className="text-sm font-semibold hover:text-[#C4956A] transition-colors hidden sm:block">Sign In</Link>
            <Link href="/compare">
              <Button className="bg-[#C4956A] text-[#1A0F0A] hover:bg-[#D4C4B0] border-none shadow-[0_0_20px_rgba(196,149,106,0.3)]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C4956A]/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C4956A]/30 bg-[#C4956A]/10 text-[#C4956A] text-sm font-semibold mb-6">
                <Shield className="w-4 h-4" /> 100% Escrow Protected
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
                Stop Trusting Promises. <br />
                <span className="text-gradient">Start Tracking Progress.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#E8DDD3] mb-10 leading-relaxed font-light">
                The premier marketplace for international students. We hold your payment securely until your verified consultant delivers actual results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/compare">
                  <Button size="lg" className="w-full sm:w-auto bg-[#C4956A] hover:bg-[#D4C4B0] text-[#1A0F0A] text-lg px-8">
                    Find a Consultant <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/compare">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#8B7355] text-[#E8DDD3] hover:bg-[#8B7355]/20 text-lg px-8">
                    I'm a Consultant
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-6 text-sm text-[#8B7355]">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1A0F0A] bg-[#2C1810] flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p>Trusted by <span className="text-[#C4956A] font-bold">2,000+</span> students globally</p>
              </div>
            </motion.div>
          </div>
          
          {/* Right side animated visual */}
          <div className="relative hidden lg:block h-[600px] w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
               {/* Abstract Globe representation */}
               <div className="w-[500px] h-[500px] rounded-full border border-white/5 relative animate-[spin_60s_linear_infinite]">
                 <div className="absolute inset-[10%] rounded-full border border-white/10 animate-[spin_40s_linear_infinite_reverse]"></div>
                 <div className="absolute inset-[20%] rounded-full border border-[#C4956A]/20"></div>
                 {/* Pulsing dots for universities */}
                 <div className="absolute top-[20%] left-[20%] w-4 h-4 bg-[#C4956A] rounded-full shadow-[0_0_15px_#C4956A] animate-pulse"></div>
                 <div className="absolute top-[60%] right-[15%] w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" style={{ animationDelay: "1s" }}></div>
                 <div className="absolute bottom-[25%] left-[40%] w-5 h-5 bg-[#C4956A] rounded-full shadow-[0_0_20px_#C4956A] animate-pulse" style={{ animationDelay: "0.5s" }}></div>
               </div>
               
               {/* Floating UI cards */}
               <motion.div 
                 animate={{ y: [-10, 10, -10] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-[20%] -left-10 glass-panel p-4 rounded-xl flex items-center gap-4"
               >
                 <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                   <CheckCircle className="w-5 h-5 text-emerald-400" />
                 </div>
                 <div>
                   <p className="text-xs text-[#8B7355]">Milestone 1</p>
                   <p className="text-sm font-bold text-white">SOP Completed</p>
                 </div>
               </motion.div>
               
               <motion.div 
                 animate={{ y: [10, -10, 10] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-[30%] -right-10 glass-panel p-4 rounded-xl flex items-center gap-4"
               >
                 <div className="w-10 h-10 rounded-full bg-[#C4956A]/20 flex items-center justify-center">
                   <ShieldCheck className="w-5 h-5 text-[#C4956A]" />
                 </div>
                 <div>
                   <p className="text-xs text-[#8B7355]">Payment Status</p>
                   <p className="text-sm font-bold text-white">Funds in Escrow</p>
                 </div>
               </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-32 bg-[#2C1810] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Everything You Need to <span className="text-[#C4956A]">Apply With Confidence</span></h2>
            <p className="text-[#E8DDD3] text-lg">We've rebuilt the consulting experience from the ground up to protect your investment and ensure quality.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Escrow Protection", desc: "Your money is held securely until agreed milestones are met." },
              { icon: Target, title: "Real-Time Tracking", desc: "See exactly where your application stands, 24/7." },
              { icon: CheckCircle, title: "Verified Consultants", desc: "Only top-tier, vetted professionals make it to our platform." },
              { icon: TrendingUp, title: "Smart Matching", desc: "Find the perfect match based on your goals and budget." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1A0F0A] border border-[#8B7355]/30 p-8 rounded-2xl hover:border-[#C4956A] transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#C4956A]/10 flex items-center justify-center mb-6 group-hover:bg-[#C4956A]/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-[#C4956A]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#8B7355] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                The Problem With <br/> Traditional Consulting
              </h2>
              <div className="space-y-8">
                <motion.div initial={{ opacity:0, x: -20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="flex gap-4">
                  <div className="text-5xl font-display text-[#C4956A] font-bold">67%</div>
                  <p className="text-lg text-[#E8DDD3] pt-2">of students report periods of zero communication from their consultants.</p>
                </motion.div>
                <div className="w-full h-px bg-white/10"></div>
                <motion.div initial={{ opacity:0, x: -20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay: 0.2 }} className="flex gap-4">
                  <div className="text-5xl font-display text-[#C4956A] font-bold">$3k</div>
                  <p className="text-lg text-[#E8DDD3] pt-2">average amount lost to upfront fees with no guaranteed results.</p>
                </motion.div>
                <div className="w-full h-px bg-white/10"></div>
                <motion.div initial={{ opacity:0, x: -20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay: 0.4 }} className="flex gap-4">
                  <div className="text-5xl font-display text-[#C4956A] font-bold">1 in 4</div>
                  <p className="text-lg text-[#E8DDD3] pt-2">applicants feel misled about their chances of admission.</p>
                </motion.div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full border border-red-500/20 absolute -inset-10 animate-ping"></div>
              <div className="bg-[#2C1810] border-2 border-red-500/30 p-12 rounded-3xl text-center shadow-[0_0_50px_rgba(220,38,38,0.1)] relative z-10">
                <DollarSign className="w-16 h-16 text-red-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4 glitch-wrapper" data-text="SCAM ALERT">SCAM ALERT</h3>
                <p className="text-red-200/80 text-lg">
                  Paying 100% upfront is a broken model. You lose all leverage the moment the wire transfer clears.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escrow Flow Section */}
      <section id="guarantee" className="py-32 bg-[#FAF6F1] text-[#1A0F0A]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-[#1A0F0A]">Lerank Changes Everything</h2>
          <p className="text-xl text-[#8B7355] max-w-2xl mx-auto mb-20">Our milestone-based escrow system aligns incentives. They only get paid when you see progress.</p>
          
          <div className="relative flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-8">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-[#E8DDD3] -translate-y-1/2 z-0"></div>
            
            {[
              { step: 1, title: "You Choose", desc: "Select a vetted consultant and fund the escrow." },
              { step: 2, title: "We Hold", desc: "Funds are secure. The consultant starts working." },
              { step: 3, title: "They Deliver", desc: "Approve milestones to release payments." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-white p-8 rounded-2xl shadow-xl w-full md:w-1/3 border border-[#E8DDD3]">
                <div className="w-12 h-12 rounded-full bg-[#1A0F0A] text-[#C4956A] text-xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-[#8B7355]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 inline-flex items-center gap-4 bg-[#1A0F0A] text-white px-8 py-6 rounded-2xl shadow-2xl">
            <Shield className="w-10 h-10 text-[#C4956A]" />
            <div className="text-left">
              <p className="text-[#C4956A] font-bold uppercase tracking-wider text-sm">Our Promise</p>
              <p className="text-xl font-display">100% Refund Guarantee on uncompleted milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Ready to Find Your <br/><span className="text-[#C4956A] italic">Perfect Match?</span></h2>
          <p className="text-xl text-[#E8DDD3] mb-12">Join thousands of students who applied to their dream universities with confidence and zero financial risk.</p>
          <Link href="/compare">
            <Button size="lg" className="h-16 px-10 text-xl bg-[#C4956A] text-[#1A0F0A] hover:bg-[#D4C4B0] shadow-[0_0_30px_rgba(196,149,106,0.4)]">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-[#8B7355]">
        <p>© 2025 Lerank. All rights reserved. Trust-first education marketplace.</p>
      </footer>
    </div>
  );
}
