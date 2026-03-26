import { motion, useInView, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui-elements";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/hooks/use-language";
import { ArrowRight, CheckCircle, Circle, DollarSign, Globe2, Lock, Mail, MapPin, Phone, Shield, Target, TrendingUp, XCircle } from "lucide-react";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}
import { useRef, useEffect, useState } from "react";

const featureIcons = [Shield, Target, CheckCircle, TrendingUp];

function AnimatedCounter({ value, prefix = "", suffix = "", isVisible }: {
  value: number; prefix?: string; suffix?: string; isVisible: boolean;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const duration = 1400;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, value]);
  return <span className="text-gold">{prefix}{display}{suffix}</span>;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
// Premium scroll-in: fade + lift + subtle scale (no blur — blur on multiple scroll elements tanks GPU)
const BLUR_IN = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.52, ease: EASE } },
};
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const STAGGER_SLOW = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const POINT_ITEM = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } },
};
const DOT_ITEM = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { duration: 0.22 } },
};

/* ─── Neuralyn: scroll-driven word reveal ───────────────────────────────── */
function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["hsl(146 20% 55% / 0.45)", "hsl(146 20% 15%)"],
  );
  const darkColor = useTransform(
    progress,
    [start, end],
    ["hsl(60 15% 75% / 0.3)", "hsl(60 15% 90%)"],
  );

  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block">
      <motion.span style={{ color }} className="dark:hidden">
        {word}
      </motion.span>
      <motion.span style={{ color: darkColor }} className="hidden dark:inline">
        {word}
      </motion.span>
    </motion.span>
  );
}

const TESTIMONIAL_TEXT =
  "Lerank completely changed how I found my consultant. The escrow system meant my money was protected the entire time. The matching engine connected me with someone who knew exactly what universities were looking for. I got my visa approved and my offer letter within three months.";

function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const words = TESTIMONIAL_TEXT.split(" ");

  return (
    <section className="py-14 md:py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          ref={containerRef}
          className="relative flex flex-col items-start gap-10 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-gold/60" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-gold">
              Student Story
            </span>
          </div>

          <div className="text-3xl md:text-[2.6rem] font-display font-extrabold leading-[1.25] tracking-tight flex flex-wrap">
            <span className="text-foreground/20 mr-1 font-serif">&ldquo;</span>
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                start={i / words.length}
                end={Math.min((i + 2) / words.length, 1)}
              />
            ))}
            <span className="text-foreground/20 ml-1 font-serif">&rdquo;</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              AN
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Asel Nurlanovna</p>
              <p className="text-xs font-medium text-muted-foreground">
                BSc Computer Science · University of Birmingham
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-80px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  // Neuralyn: smooth spring-based parallax for hero section
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(heroScrollY, [0, 1], [0, -100]);
  const rawOpacity = useTransform(heroScrollY, [0, 0.6], [1, 0]);
  const heroContentY = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.4 });
  const heroContentOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 25, mass: 0.3 });

  const features = t.howItWorks.features.map((f, i) => ({ ...f, icon: featureIcons[i] }));

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto premium-bg text-foreground">
      <div className="pointer-events-none fixed inset-0 premium-grid" />

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav" style={{ willChange: "transform", transform: "translateZ(0)" }}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 md:grid md:h-16 md:grid-cols-[1fr_auto_1fr]">
          {/* Left — logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground md:h-8 md:w-8">
              <Globe2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </div>
            <span className="font-brand text-2xl md:text-3xl">Lerank</span>
          </div>

          {/* Center — links (desktop only) */}
          <div className="hidden items-center gap-5 text-sm font-medium text-muted-foreground md:flex">
            {([
              ["how-it-works", t.nav.howItWorks],
              ["problem", t.nav.theProblem],
              ["guarantee", t.nav.guarantee],
            ] as [string, string][]).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="transition-colors hover:text-foreground dark:hover:text-[#D4B96A] focus-visible:outline-none"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right — actions */}
          <div className="flex items-center justify-end gap-2 md:gap-3">
            <LanguageToggle />
            <Link href="/compare">
              <Button size="sm" className="dark:bg-[#D4B96A] dark:text-[#0F1410] dark:hover:bg-[#D4B96A]/90 dark:shadow-none">
                {t.nav.getStarted}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero (Nexora-style: h-screen, video bg, centered, glass dashboard) ── */}
      <section ref={heroRef} className="relative h-screen flex flex-col overflow-hidden">

        {/* Background video */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
        />

        {/* Layered overlay: strong at top for text, fades out toward dashboard */}
        <div className="absolute inset-0 z-[1]" style={{
          background: "linear-gradient(to bottom, hsl(var(--background)/0.82) 0%, hsl(var(--background)/0.62) 45%, hsl(var(--background)/0.38) 75%, hsl(var(--background)/0.20) 100%)"
        }} />

        {/* Bottom fade — blends hero into How It Works */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none" style={{
          height: "180px",
          background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)/0.7) 55%, hsl(var(--background)) 100%)",
        }} />

        {/* Parallax content wrapper */}
        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity, willChange: "transform, opacity" }}
          className="relative z-10 flex flex-col items-center flex-1 pt-14 md:pt-16 overflow-hidden"
        >
          <div className="flex flex-col items-center text-center px-4 sm:px-6 pt-10 md:pt-14 w-full max-w-6xl mx-auto">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-foreground/70"
            >
              <Lock className="h-3 w-3 text-sage" />
              {t.hero.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mb-4 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-[4.8rem] max-w-3xl"
            >
              {t.hero.heading1}
              <br />
              <span className="italic font-normal text-gradient">{t.hero.heading2}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-3 text-base md:text-lg text-foreground/80 max-w-[560px] leading-relaxed font-medium"
            >
              {t.hero.body}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="mt-6 flex items-center gap-3 flex-wrap justify-center"
            >
              <Link href="/compare">
                <Button size="lg" className="rounded-full btn-glow font-bold shadow-lg shadow-primary/20 dark:bg-[#D4B96A] dark:text-[#0F1410] dark:hover:bg-[#D4B96A]/90 dark:shadow-none">
                  {t.hero.findConsultant}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="glass" className="rounded-full font-semibold">
                  {t.hero.iAmConsultant}
                </Button>
              </Link>
            </motion.div>

            {/* Mini Lerank Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="mt-9 w-full"
              style={{
                background: "rgba(255,255,255,0.42)",
                border: "1px solid rgba(255,255,255,0.58)",
                boxShadow: "0 25px 80px -12px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            >
              {/* Dashboard top bar */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-black/[0.06] dark:border-white/[0.06] text-[11px] bg-white/30 dark:bg-black/10">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="h-5 w-5 rounded-md bg-primary flex items-center justify-center">
                    <Globe2 className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span className="font-brand text-lg leading-none text-foreground">Lerank</span>
                </div>
                <div className="hidden sm:flex flex-1 items-center gap-2 bg-black/[0.05] rounded-lg px-3 py-1.5 max-w-[240px]">
                  <span className="text-foreground/40 flex-1 text-left">Search consultants…</span>
                  <kbd className="text-[9px] text-foreground/30 border border-border/40 rounded px-1">⌘K</kbd>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-[10px] font-semibold">Find Consultant</div>
                  <div className="h-6 w-6 rounded-full bg-sage/20 border border-sage/30 flex items-center justify-center text-[9px] font-bold text-sage">A</div>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="flex text-[11px] select-none pointer-events-none" style={{ height: "220px" }}>

                {/* Sidebar — desktop only */}
                <div className="hidden md:flex w-36 border-r border-black/[0.06] dark:border-white/[0.06] flex-col gap-0.5 p-2.5 shrink-0 bg-white/20 dark:bg-black/10">
                  {[
                    { label: "Dashboard", active: true },
                    { label: "Compare", badge: "12" },
                    { label: "Applications" },
                    { label: "Escrow" },
                    { label: "Messages", badge: "3" },
                  ].map(({ label, active, badge }: { label: string; active?: boolean; badge?: string }) => (
                    <div key={label} className={`flex items-center justify-between px-2 py-1.5 rounded-md ${active ? "bg-primary/12 text-primary font-semibold" : "text-foreground/50"}`}>
                      <span>{label}</span>
                      {badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-primary text-primary-foreground" : "bg-foreground/10 text-foreground/60"}`}>{badge}</span>}
                    </div>
                  ))}
                  <div className="mt-auto pt-2 border-t border-black/[0.06]">
                    <div className="space-y-1 px-2">
                      <div className="flex justify-between text-foreground/50"><span>Escrow</span><span className="text-gold font-semibold">$1,200</span></div>
                      <div className="flex justify-between text-foreground/50"><span>Success</span><span className="text-sage font-semibold">97%</span></div>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 flex gap-3 p-3 overflow-hidden bg-white/10 dark:bg-black/5">

                  {/* Top match card */}
                  <div className="flex-1 rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.04] p-3 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-gold">YOUR TOP MATCH</p>
                        <p className="font-semibold text-foreground text-xs mt-0.5">Mr. Shojalil Kosimov</p>
                      </div>
                      <span className="bg-sage/15 text-sage text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2">96% match</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      {[["4.9","Rating"],["312","Students"],["97%","Success"]].map(([v,l]) => (
                        <div key={l} className="text-center bg-black/[0.04] rounded-md py-1.5">
                          <p className="font-bold text-foreground text-[11px]">{v}</p>
                          <p className="text-foreground/45 text-[9px]">{l}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground/45 mb-2">
                      <MapPin className="h-2.5 w-2.5 shrink-0 text-sage" />
                      <span>USA · UK · Canada · Australia</span>
                    </div>
                    <div className="bg-primary/6 border border-primary/12 rounded-lg p-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-foreground/50 flex items-center gap-1"><Lock className="h-2.5 w-2.5" /> Escrow</span>
                        <span className="text-gold font-semibold">$1,200 protected</span>
                      </div>
                      <div className="h-1 w-full bg-primary/10 rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: "68%" }} />
                      </div>
                      <div className="flex justify-between mt-1 text-foreground/40">
                        <span>2 of 3 milestones</span><span>68%</span>
                      </div>
                    </div>
                  </div>

                  {/* Applications card — desktop only */}
                  <div className="hidden sm:block flex-1 rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white/60 dark:bg-white/[0.04] p-3 min-w-0">
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-foreground/40 mb-2">Recent Applications</p>
                    {[
                      { school: "Univ. of Birmingham", status: "In Review", c: "amber" },
                      { school: "King's College London", status: "Accepted", c: "green" },
                      { school: "Univ. of Leeds", status: "Pending", c: "muted" },
                      { school: "Univ. of Manchester", status: "Documents Due", c: "blue" },
                    ].map(({ school, status, c }) => (
                      <div key={school} className="flex items-center justify-between py-1.5 border-b border-black/[0.05] last:border-0">
                        <span className="text-foreground/70 truncate mr-2 text-[10px]">{school}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                          c === "green" ? "bg-sage/15 text-sage" :
                          c === "amber" ? "bg-yellow-100 text-yellow-700" :
                          c === "blue"  ? "bg-blue-100 text-blue-600" :
                          "bg-black/[0.06] text-foreground/50"
                        }`}>{status}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-14 md:py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="mb-14"
          >
            <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-gold">{t.howItWorks.sectionLabel}</motion.p>
            <motion.h2 variants={BLUR_IN} className="max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
              {t.howItWorks.heading}
            </motion.h2>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={STAGGER_SLOW} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            className="hiw-card-shadow mb-14 overflow-hidden rounded-2xl border border-black/[0.07] dark:border-white/[0.06]" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
          >
            <div className="grid divide-y divide-black/[0.06] dark:divide-white/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0">
              {t.howItWorks.flow.map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={BLUR_IN}
                  className="glass-card px-5 py-6 sm:px-8 sm:py-9"
                >
                  <p className="font-display mb-5 text-5xl font-medium text-gold">{item.step}</p>
                  <h3 className="mb-2 font-display text-lg font-semibold text-[#111811] dark:text-[#F0ECE2]">{item.title}</h3>
                  <p className="text-[15px] font-medium leading-relaxed text-[#4A5248] dark:text-[#A8B09E]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={BLUR_IN}
                className="glass-card rounded-2xl p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#F0EDE4] dark:bg-secondary">
                  <f.icon className="h-5 w-5 text-[#1E3D28] dark:text-[#D4B96A]" />
                </div>
                <h4 className="mb-1.5 font-display text-sm font-semibold leading-snug text-[#111811] dark:text-[#F0ECE2]">{f.title}</h4>
                <p className="text-[14px] leading-[1.6] text-[#4A5248] dark:text-[#A8B09E]">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section id="problem" ref={problemRef} className="border-y border-border/40 py-14 md:py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Stats */}
            <motion.div
              variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            >
              <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-gold">{t.problem.sectionLabel}</motion.p>
              <motion.h2 variants={FADE_UP} className="mb-8 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl sm:mb-12">
                {t.problem.heading}
              </motion.h2>

              <div className="divide-y divide-border/50">
                {t.problem.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-8 py-6"
                  >
                    <span className="font-display min-w-[5rem] shrink-0 text-4xl font-extrabold tabular-nums leading-none">
                      <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isVisible={problemInView} />
                    </span>
                    <p className="text-[15px] font-medium leading-relaxed text-foreground/70 pt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Problem card */}
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, x: 28 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="mb-6 relative flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
                {cardInView && (
                  <>
                    <motion.span
                      className="absolute inset-0 rounded-xl bg-destructive/20"
                      animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                      transition={{ repeat: 2, duration: 1.6, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute inset-0 rounded-xl bg-destructive/15"
                      animate={{ scale: [1, 2.8], opacity: [0.35, 0] }}
                      transition={{ repeat: 2, duration: 1.6, ease: "easeOut", delay: 0.3 }}
                    />
                  </>
                )}
                <DollarSign className="relative h-5 w-5 text-destructive" />
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.18, duration: 0.45, ease: EASE }}
                className="mb-3 font-display text-2xl font-extrabold"
              >
                {t.problem.cardTitle}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.32, duration: 0.45, ease: EASE }}
                className="mb-6 text-[15px] font-medium leading-relaxed text-foreground/70"
              >
                {t.problem.cardBody}
              </motion.p>

              <motion.div
                className="mb-8 space-y-3"
                initial="hidden"
                animate={cardInView ? "show" : "hidden"}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.48 } } }}
              >
                {t.problem.cardPoints.map((point, i) => (
                  <motion.div key={i} variants={POINT_ITEM} className="flex items-center gap-3 text-[15px] font-medium text-foreground/70">
                    <motion.div
                      variants={DOT_ITEM}
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/60"
                    />
                    {point}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.05, duration: 0.5, ease: EASE }}
                className="rounded-xl border border-border/60 dark:border-white/[0.07] bg-muted dark:bg-secondary px-5 py-4"
              >
                <p className="text-sm font-semibold text-foreground/80 dark:text-[#F0ECE2]">{t.problem.cardFooter}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section id="guarantee" className="py-14 md:py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="mb-14"
          >
            <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-gold">{t.guarantee.sectionLabel}</motion.p>
            <motion.h2 variants={FADE_UP} className="max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
              {t.guarantee.heading}
            </motion.h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            {/* Benefit cards */}
            <motion.div
              variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {t.guarantee.benefits.map(({ title, points }, bi) => (
                <motion.div key={bi} variants={BLUR_IN} className="glass-card rounded-2xl p-7">
                  <h3 className="mb-4 font-display text-lg font-bold">{title}</h3>
                  <div className="space-y-3">
                    {points.map((p, pi) => (
                      <div key={pi} className="flex items-start gap-3 text-[15px] font-medium text-foreground/70">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                        {p}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Sticky promise card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="glass-card rounded-2xl p-8 lg:sticky lg:top-[88px]"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/10">
                  <Shield className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-gold">{t.guarantee.promise.badge}</p>
                  <p className="font-display text-base font-bold leading-snug">{t.guarantee.promise.title}</p>
                </div>
              </div>

              <p className="mb-8 text-[15px] font-medium leading-relaxed text-foreground/70">
                {t.guarantee.promise.body}
              </p>

              <div className="mb-8 space-y-3 border-t border-border/50 pt-6">
                {t.guarantee.promise.points.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[15px] font-medium text-foreground/70">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                    {item}
                  </div>
                ))}
              </div>

              <Link href="/compare">
                <Button className="w-full font-bold dark:bg-[#D4B96A] dark:text-[#0F1410] dark:hover:bg-[#D4B96A]/90 dark:shadow-none">
                  {t.guarantee.promise.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonial (Neuralyn scroll-reveal) ── */}
      <TestimonialSection />

      {/* ── CTA ── */}
      <section className="border-t border-border/40 py-14 md:py-24 lg:py-36">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 variants={FADE_UP} className="mb-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {t.cta.heading}
            </motion.h2>
            <motion.p variants={FADE_UP} className="mb-8 text-base font-medium leading-relaxed text-foreground/75 sm:text-lg sm:mb-10">
              {t.cta.body}
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/compare">
                <Button size="lg" className="shadow-xl shadow-primary/20 font-bold dark:bg-[#D4B96A] dark:text-[#0F1410] dark:hover:bg-[#D4B96A]/90 dark:shadow-none">
                  {t.cta.createAccount}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="glass" className="font-semibold">{t.cta.signIn}</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact / Footer ── */}
      <section className="border-t border-border/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Brand */}
            <motion.div variants={FADE_UP} className="sm:col-span-2 lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Globe2 className="h-3.5 w-3.5" />
                </div>
                <span className="font-brand text-3xl">Lerank</span>
              </div>
              <p className="max-w-[280px] text-[15px] font-medium leading-relaxed text-foreground/65">
                {t.footer.brandDesc}
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div variants={FADE_UP}>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">{t.footer.contact}</p>
              <div className="space-y-2">
                {[
                  { href: "mailto:ownailab@gmail.com", label: "lerank@mail.com", icon: Mail },
                  { href: "tel:+998946270932", label: "+998 (94) 627-09-32", icon: Phone },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50 transition-colors group-hover:border-border group-hover:bg-muted">
                      <Icon className="h-3.5 w-3.5 text-sage/70 group-hover:text-sage transition-colors" />
                    </div>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={FADE_UP}>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">{t.footer.followUs}</p>
              <div className="space-y-2">
                {[
                  { href: "https://t.me/Leranking", label: "Telegram", icon: TelegramIcon },
                  { href: "https://instagram.com/le_ranking", label: "Instagram", icon: InstagramIcon },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50 transition-colors group-hover:border-border group-hover:bg-muted">
                      <Icon className="h-3.5 w-3.5 text-sage/70 group-hover:text-sage transition-colors" />
                    </div>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm font-medium text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-primary-foreground">
              <Globe2 className="h-3 w-3" />
            </div>
            <span className="font-semibold text-foreground">Lerank</span>
          </div>
          <p className="text-center">{t.footer.copyright}</p>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}
