import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui-elements";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, CheckCircle, DollarSign, Globe2, Lock, MapPin, Shield, Target, TrendingUp } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const features = [
  { icon: Shield, title: "Escrow Protection", desc: "Payment is held in escrow until each milestone is reviewed and approved by you." },
  { icon: Target, title: "Live Progress", desc: "Every deliverable is tracked in a shared dashboard with timestamped updates." },
  { icon: CheckCircle, title: "Verified Consultants", desc: "Every profile goes through a manual quality and consistency review before listing." },
  { icon: TrendingUp, title: "Precision Matching", desc: "Our ranking engine weighs GPA, budget, degree level, and target countries." },
];

const flow = [
  { step: "01", title: "Build your profile", desc: "Enter your academic background, budget, and destination countries. Takes under two minutes." },
  { step: "02", title: "Compare consultants", desc: "Browse ranked matches tailored to your profile. Filter by country, rating, and price." },
  { step: "03", title: "Hire with escrow", desc: "Fund milestones in escrow. Payment releases only after you approve each deliverable." },
];

const stats = [
  { value: 67, suffix: "%", label: "of students report communication blackouts during critical application phases." },
  { prefix: "$", value: 3, suffix: "k+", label: "paid upfront on average before any measurable output is delivered." },
  { value: 1, suffix: " in 4", label: "students feel they were oversold on admission outcomes." },
];

const heroStats = [
  { value: "2,400+", label: "Students matched" },
  { value: "94%", label: "Satisfaction rate" },
  { value: "$0", label: "Lost to disputes" },
];

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
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto premium-bg text-foreground">
      <div className="pointer-events-none fixed inset-0 premium-grid" />

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md" style={{ willChange: "transform", transform: "translateZ(0)" }}>
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6">
          {/* Left — logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe2 className="h-4 w-4" />
            </div>
            <span className="font-display text-xl font-bold">Lerank</span>
          </div>

          {/* Center — links */}
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {[["how-it-works", "How It Works"], ["problem", "The Problem"], ["guarantee", "Guarantee"]].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="transition-colors hover:text-foreground focus-visible:outline-none"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right — actions */}
          <div className="flex items-center justify-end gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Link href="/compare" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block">
              Sign In
            </Link>
            <Link href="/compare">
              <Button size="sm">
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative flex min-h-screen items-center pt-16">
        <div className="pointer-events-none absolute left-[6%] top-[22%] h-96 w-96 rounded-full bg-primary/10 blur-[140px] hidden md:block" />
        <div className="pointer-events-none absolute right-[4%] bottom-[18%] h-64 w-64 rounded-full bg-primary/8 blur-[100px] hidden md:block" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_480px] lg:gap-16 lg:py-0"
        >
          {/* Left */}
          <motion.div variants={STAGGER} initial="hidden" animate="show">
            <motion.div
              variants={FADE_UP}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground/70"
            >
              <Lock className="h-3 w-3 text-primary" />
              Escrow-protected consulting marketplace
            </motion.div>

            <motion.h1
              variants={FADE_UP}
              className="mb-6 font-display text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.25rem]"
            >
              Premium Guidance.
              <br />
              <span className="text-gradient">Real Accountability.</span>
            </motion.h1>

            <motion.p
              variants={FADE_UP}
              className="mb-8 max-w-[480px] text-lg leading-relaxed text-muted-foreground"
            >
              The trust-first marketplace for international students. Payments held in escrow until your consultant delivers verified milestones.
            </motion.p>

            <motion.div variants={FADE_UP} className="flex flex-wrap gap-3">
              <Link href="/compare">
                <Button size="lg" className="shadow-lg shadow-primary/20">
                  Find a Consultant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline">
                  I am a Consultant
                </Button>
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              variants={FADE_UP}
              className="mt-10 grid grid-cols-3 divide-x divide-border/50 border-t border-border/50 pt-8"
            >
              {heroStats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5 px-0 first:pr-6 [&:not(:first-child)]:px-6">
                  <span className="font-display text-2xl font-bold text-foreground">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — product preview */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: EASE }}
            whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE } }}
            className="hidden cursor-default lg:block"
            style={{ willChange: "transform" }}
          >
            <div className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-2xl transition-[border-color] duration-300 hover:border-primary/30">
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100 [background:radial-gradient(600px_circle_at_50%_-40px,hsl(var(--primary)/0.06),transparent_70%)]" />

              {/* Card header */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="mb-5 flex items-start justify-between gap-3"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold">Your Top Match</p>
                  <h3 className="mt-1 font-display text-xl font-bold leading-tight">Dr. Sarah Okonkwo</h3>
                </div>
                <motion.div
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4, ease: EASE }}
                  className="shrink-0 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  96% match
                </motion.div>
              </motion.div>

              {/* Stats */}
              <div className="mb-5 grid grid-cols-3 gap-2.5">
                {[
                  { label: "Rating", value: "4.9" },
                  { label: "Students", value: "312" },
                  { label: "Success", value: "97%" },
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + i * 0.08, duration: 0.4, ease: EASE }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                    style={{ willChange: "transform" }}
                    className="rounded-xl border border-border/50 bg-muted py-3 text-center"
                  >
                    <p className="font-display text-lg font-bold leading-tight">{value}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Countries */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="mb-5 flex items-center gap-2 text-sm text-muted-foreground"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span>USA · UK · Canada · Australia</span>
              </motion.div>

              {/* Milestones */}
              <div className="mb-5">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Active Milestones
                </motion.p>
                <div className="space-y-2">
                  {[
                    { label: "Statement of Purpose — Draft 1", done: true },
                    { label: "University Shortlist (8 schools)", done: true },
                    { label: "Application Review — Round 1", done: false },
                  ].map(({ label, done }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.85 + i * 0.1, duration: 0.4, ease: EASE }}
                      className="group/m flex items-center gap-3"
                    >
                      <CheckCircle className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover/m:scale-110 ${done ? "text-emerald-500" : "text-border"}`} />
                      <span className={`text-sm transition-colors duration-200 ${done ? "line-through text-muted-foreground/70" : "text-foreground group-hover/m:text-primary"}`}>
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Escrow */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.45, ease: EASE }}
                className="rounded-xl border border-primary/20 bg-primary/8 px-4 py-3.5 transition-colors duration-200 hover:border-primary/30 hover:bg-primary/12"
              >
                <div className="flex items-center justify-between text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-primary" />
                    Escrow balance
                  </div>
                  <span className="font-display font-bold text-gold">$1,200 protected</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-primary/15">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                  <span>2 of 3 milestones funded</span>
                  <span>68%</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="mb-16"
          >
            <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-bold uppercase tracking-widest text-gold">How It Works</motion.p>
            <motion.h2 variants={FADE_UP} className="max-w-xl font-display text-4xl font-bold leading-tight md:text-5xl">
              A three-step process built around your protection
            </motion.h2>
          </motion.div>

          {/* Steps */}
          <div className="mb-16 overflow-hidden rounded-2xl border border-border/50">
            <div className="grid divide-y divide-border/50 md:grid-cols-3 md:divide-x md:divide-y-0">
              {flow.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
                  className="bg-card px-8 py-9"
                >
                  <p className="font-display mb-5 text-5xl font-bold text-gold">{item.step}</p>
                  <h3 className="mb-2 font-display text-lg font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features */}
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={FADE_UP}
                className="rounded-2xl border border-border/50 bg-card/70 p-6 transition-colors duration-200 hover:border-primary/30 hover:bg-card"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mb-1.5 font-display text-base font-bold">{f.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section id="problem" ref={problemRef} className="border-y border-border/40 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Stats */}
            <motion.div
              variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            >
              <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-bold uppercase tracking-widest text-gold">The Problem</motion.p>
              <motion.h2 variants={FADE_UP} className="mb-12 font-display text-4xl font-bold leading-tight md:text-5xl">
                Traditional consulting runs on blind trust
              </motion.h2>

              <div className="divide-y divide-border/50">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-8 py-6"
                  >
                    <span className="font-display min-w-[5rem] shrink-0 text-4xl font-bold tabular-nums leading-none">
                      <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isVisible={problemInView} />
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground pt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Problem card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
              className="rounded-2xl border border-border/50 bg-card/80 p-8"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
                <DollarSign className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold">The incentive is misaligned</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                When a consultant is paid upfront, the financial incentive to maintain quality disappears. Students have no leverage once payment is made.
              </p>
              <div className="mb-8 space-y-3">
                {[
                  "No refund if expectations aren't met",
                  "No transparency on work in progress",
                  "No accountability after payment clears",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/50" />
                    {point}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-primary/25 bg-primary/8 px-5 py-4">
                <p className="text-sm font-semibold text-primary">Lerank escrow keeps the incentive aligned from start to finish.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section id="guarantee" className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="mb-16"
          >
            <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-bold uppercase tracking-widest text-gold">The Guarantee</motion.p>
            <motion.h2 variants={FADE_UP} className="max-w-xl font-display text-4xl font-bold leading-tight md:text-5xl">
              Milestone escrow. Both sides protected.
            </motion.h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            {/* Benefit cards */}
            <motion.div
              variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {[
                {
                  title: "For students",
                  points: [
                    "Pay per milestone, not upfront in full",
                    "Dispute any deliverable before releasing funds",
                    "Full refund for incomplete milestones",
                  ],
                },
                {
                  title: "For consultants",
                  points: [
                    "Guaranteed payment upon approval",
                    "Clear milestone scope prevents scope creep",
                    "Automated release — no chasing invoices",
                  ],
                },
              ].map(({ title, points }) => (
                <motion.div key={title} variants={FADE_UP} className="rounded-2xl border border-border/50 bg-card/80 p-7">
                  <h3 className="mb-4 font-display text-lg font-bold">{title}</h3>
                  <div className="space-y-3">
                    {points.map((p) => (
                      <div key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
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
              className="rounded-2xl border border-border/50 bg-card/80 p-8 lg:sticky lg:top-[88px]"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold">Lerank Promise</p>
                  <p className="font-display text-base font-bold leading-snug">Escrow guarantee</p>
                </div>
              </div>

              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                Every payment on Lerank is held in a regulated escrow account. Funds are released only when you explicitly approve a milestone. We do not take sides — we enforce the agreement.
              </p>

              <div className="mb-8 space-y-3 border-t border-border/50 pt-6">
                {[
                  "Regulated payment processing",
                  "Dispute resolution within 48h",
                  "Automatic refund for unstarted milestones",
                  "Zero fees on disputed refunds",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>

              <Link href="/compare">
                <Button className="w-full">
                  Start with Escrow Protection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40 py-28 lg:py-36">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 variants={FADE_UP} className="mb-4 font-display text-5xl font-bold leading-tight md:text-6xl">
              Apply with confidence.
            </motion.h2>
            <motion.p variants={FADE_UP} className="mb-10 text-lg leading-relaxed text-muted-foreground">
              Create your free account, compare ranked consultants, and pay only for verified, delivered work.
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/compare">
                <Button size="lg" className="shadow-xl shadow-primary/20">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline">Sign In</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact / Footer ── */}
      <section className="border-t border-border/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
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
                <span className="font-display text-lg font-bold">Lerank</span>
              </div>
              <p className="max-w-[280px] text-sm leading-relaxed text-muted-foreground">
                Trust-first admissions consulting marketplace. We protect students and consultants through milestone-based escrow payments.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div variants={FADE_UP}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact</p>
              <div className="space-y-2">
                {[
                  { href: "mailto:hello@lerank.com", label: "hello@lerank.com" },
                  { href: "tel:+15551234567", label: "+1 (555) 123-4567" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50 transition-colors group-hover:border-border group-hover:bg-muted">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                    </div>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={FADE_UP}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Follow Us</p>
              <div className="space-y-2">
                {[
                  { href: "https://t.me/lerank", label: "Telegram" },
                  { href: "https://instagram.com/lerank", label: "Instagram" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50 transition-colors group-hover:border-border group-hover:bg-muted">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                    </div>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-primary-foreground">
              <Globe2 className="h-3 w-3" />
            </div>
            <span className="font-semibold text-foreground">Lerank</span>
          </div>
          <p>© 2026 Lerank. Trust-first admissions marketplace.</p>
        </div>
      </footer>
    </div>
  );
}
