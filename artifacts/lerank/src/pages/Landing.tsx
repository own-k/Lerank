import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui-elements";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/hooks/use-language";
import { ArrowRight, CheckCircle, DollarSign, Globe2, Lock, Mail, MapPin, Phone, Shield, Target, TrendingUp, XCircle } from "lucide-react";

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
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const POINT_ITEM = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } },
};
const DOT_ITEM = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { duration: 0.22 } },
};

export default function Landing() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-80px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const features = t.howItWorks.features.map((f, i) => ({ ...f, icon: featureIcons[i] }));

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-auto premium-bg text-foreground">
      <div className="pointer-events-none fixed inset-0 premium-grid" />

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md" style={{ willChange: "transform", transform: "translateZ(0)" }}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 md:grid md:h-16 md:grid-cols-[1fr_auto_1fr]">
          {/* Left — logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground md:h-8 md:w-8">
              <Globe2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </div>
            <span className="font-brand text-2xl md:text-3xl">Lerank</span>
          </div>

          {/* Center — links (desktop only) */}
          <div className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            {([
              ["how-it-works", t.nav.howItWorks],
              ["problem", t.nav.theProblem],
              ["guarantee", t.nav.guarantee],
            ] as [string, string][]).map(([id, label]) => (
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
          <div className="flex items-center justify-end gap-2 md:gap-3">
            <LanguageToggle />
<Link href="/compare">
              <Button size="sm">
                {t.nav.getStarted}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative flex min-h-screen items-center pt-14 md:pt-16">
        <div className="pointer-events-none absolute left-[6%] top-[22%] h-96 w-96 rounded-full bg-primary/10 blur-[140px] hidden md:block" />
        <div className="pointer-events-none absolute right-[4%] bottom-[18%] h-64 w-64 rounded-full bg-primary/8 blur-[100px] hidden md:block" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_480px] lg:gap-16 lg:py-0"
        >
          {/* Left */}
          <motion.div variants={STAGGER} initial="hidden" animate="show">
            <motion.div
              variants={FADE_UP}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground/70"
            >
              <Lock className="h-3 w-3 text-primary" />
              {t.hero.badge}
            </motion.div>

            <motion.h1
              variants={FADE_UP}
              className="mb-5 font-display text-[2.4rem] font-bold leading-[1.06] tracking-tight sm:text-5xl sm:mb-6 lg:text-[4.25rem]"
            >
              {t.hero.heading1}
              <br />
              <span className="text-gradient">{t.hero.heading2}</span>
            </motion.h1>

            <motion.p
              variants={FADE_UP}
              className="mb-7 max-w-[480px] text-base leading-relaxed text-foreground/75 sm:text-lg sm:mb-8"
            >
              {t.hero.body}
            </motion.p>

            <motion.div variants={FADE_UP} className="flex flex-col gap-3 xs:flex-row sm:flex-row flex-wrap">
              <Link href="/compare">
                <Button size="lg" className="shadow-lg shadow-primary/20">
                  {t.hero.findConsultant}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline">
                  {t.hero.iAmConsultant}
                </Button>
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              variants={FADE_UP}
              className="mt-8 grid grid-cols-3 divide-x divide-border/50 border-t border-border/50 pt-6 sm:mt-10 sm:pt-8"
            >
              {t.heroStats.map(({ value, label }, i) => (
                <div key={i} className="flex flex-col gap-0.5 px-3 first:pl-0 last:pr-0 sm:px-6 sm:first:pl-0">
                  <span className="font-display text-xl font-bold text-foreground sm:text-2xl">{value}</span>
                  <span className="text-[11px] leading-tight text-muted-foreground sm:text-xs">{label}</span>
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
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold">{t.productCard.topMatch}</p>
                  <h3 className="mt-1 font-display text-xl font-bold leading-tight">Mr. Shojalil Kosimov</h3>
                </div>
                <motion.div
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4, ease: EASE }}
                  className="shrink-0 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t.productCard.matchPct}
                </motion.div>
              </motion.div>

              {/* Stats */}
              <div className="mb-5 grid grid-cols-3 gap-2.5">
                {[
                  { label: t.productCard.rating, value: "4.9" },
                  { label: t.productCard.students, value: "312" },
                  { label: t.productCard.success, value: "97%" },
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
                  {t.productCard.activeMilestones}
                </motion.p>
                <div className="space-y-2">
                  {t.productCard.milestoneItems.map(({ label, done }, i) => (
                    <motion.div
                      key={i}
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
                    {t.productCard.escrowBalance}
                  </div>
                  <span className="font-display font-bold text-gold">{t.productCard.escrowAmount}</span>
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
                  <span>{t.productCard.milestonesProgress}</span>
                  <span>68%</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-16 md:py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="mb-16"
          >
            <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-bold uppercase tracking-widest text-gold">{t.howItWorks.sectionLabel}</motion.p>
            <motion.h2 variants={FADE_UP} className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {t.howItWorks.heading}
            </motion.h2>
          </motion.div>

          {/* Steps */}
          <div className="mb-16 overflow-hidden rounded-2xl border border-border/50">
            <div className="grid divide-y divide-border/50 md:grid-cols-3 md:divide-x md:divide-y-0">
              {t.howItWorks.flow.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
                  className="bg-card px-5 py-6 sm:px-8 sm:py-9"
                >
                  <p className="font-display mb-5 text-5xl font-bold text-gold">{item.step}</p>
                  <h3 className="mb-2 font-display text-lg font-bold">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-foreground/70">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features — use index key so elements aren't remounted on lang change */}
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={FADE_UP}
                className="rounded-2xl border border-border/50 bg-card/70 p-6 transition-colors duration-200 hover:border-primary/30 hover:bg-card"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mb-1.5 font-display text-sm font-bold leading-snug">{f.title}</h4>
                <p className="text-[14px] leading-relaxed text-foreground/70">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section id="problem" ref={problemRef} className="border-y border-border/40 py-16 md:py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Stats */}
            <motion.div
              variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            >
              <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-bold uppercase tracking-widest text-gold">{t.problem.sectionLabel}</motion.p>
              <motion.h2 variants={FADE_UP} className="mb-8 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl sm:mb-12">
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
                    <span className="font-display min-w-[5rem] shrink-0 text-4xl font-bold tabular-nums leading-none">
                      <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isVisible={problemInView} />
                    </span>
                    <p className="text-[15px] leading-relaxed text-foreground/70 pt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Problem card — animated */}
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, x: 32 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-2xl border border-border/50 bg-card/80 p-8"
            >
              {/* Pulsing icon */}
              <div className="mb-6 relative flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
                {cardInView && (
                  <>
                    <motion.span
                      className="absolute inset-0 rounded-xl bg-destructive/20"
                      animate={{ scale: [1, 1.9], opacity: [0.45, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute inset-0 rounded-xl bg-destructive/15"
                      animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut", delay: 0.5 }}
                    />
                  </>
                )}
                <DollarSign className="relative h-5 w-5 text-destructive" />
              </div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.18, duration: 0.45, ease: EASE }}
                className="mb-3 font-display text-2xl font-bold"
              >
                {t.problem.cardTitle}
              </motion.h3>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.32, duration: 0.45, ease: EASE }}
                className="mb-6 text-[15px] leading-relaxed text-foreground/70"
              >
                {t.problem.cardBody}
              </motion.p>

              {/* Bullet points */}
              <motion.div
                className="mb-8 space-y-3"
                initial="hidden"
                animate={cardInView ? "show" : "hidden"}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.48 } } }}
              >
                {t.problem.cardPoints.map((point, i) => (
                  <motion.div key={i} variants={POINT_ITEM} className="flex items-center gap-3 text-[15px] text-foreground/70">
                    <motion.div
                      variants={DOT_ITEM}
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/60"
                    />
                    {point}
                  </motion.div>
                ))}
              </motion.div>

              {/* Solution footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.05, duration: 0.5, ease: EASE }}
                className="rounded-xl border border-primary/30 bg-primary/10 px-5 py-4"
                style={cardInView ? {} : undefined}
              >
                <motion.div
                  animate={cardInView ? { boxShadow: ["0 0 0px hsl(var(--primary)/0)", "0 0 18px hsl(var(--primary)/0.25)", "0 0 6px hsl(var(--primary)/0.1)"] } : {}}
                  transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
                  className="rounded-lg"
                >
                  <p className="text-sm font-semibold text-primary">{t.problem.cardFooter}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section id="guarantee" className="py-16 md:py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="mb-16"
          >
            <motion.p variants={FADE_UP} className="mb-2.5 text-xs font-bold uppercase tracking-widest text-gold">{t.guarantee.sectionLabel}</motion.p>
            <motion.h2 variants={FADE_UP} className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
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
                <motion.div key={bi} variants={FADE_UP} className="rounded-2xl border border-border/50 bg-card/80 p-7">
                  <h3 className="mb-4 font-display text-lg font-bold">{title}</h3>
                  <div className="space-y-3">
                    {points.map((p, pi) => (
                      <div key={pi} className="flex items-start gap-3 text-[15px] text-foreground/70">
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
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold">{t.guarantee.promise.badge}</p>
                  <p className="font-display text-base font-bold leading-snug">{t.guarantee.promise.title}</p>
                </div>
              </div>

              <p className="mb-8 text-[15px] leading-relaxed text-foreground/70">
                {t.guarantee.promise.body}
              </p>

              <div className="mb-8 space-y-3 border-t border-border/50 pt-6">
                {t.guarantee.promise.points.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[15px] text-foreground/70">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>

              <Link href="/compare">
                <Button className="w-full">
                  {t.guarantee.promise.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40 py-16 md:py-24 lg:py-36">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 variants={FADE_UP} className="mb-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {t.cta.heading}
            </motion.h2>
            <motion.p variants={FADE_UP} className="mb-8 text-base leading-relaxed text-foreground/75 sm:text-lg sm:mb-10">
              {t.cta.body}
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/compare">
                <Button size="lg" className="shadow-xl shadow-primary/20">
                  {t.cta.createAccount}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline">{t.cta.signIn}</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact / Footer ── */}
      <section className="border-t border-border/40 py-16">
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
              <p className="max-w-[280px] text-[15px] leading-relaxed text-foreground/65">
                {t.footer.brandDesc}
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div variants={FADE_UP}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.footer.contact}</p>
              <div className="space-y-2">
                {[
                  { href: "mailto:ownailab@gmail.com", label: "lerank@mail.com", icon: Mail },
                  { href: "tel:+998946270932", label: "+998 (94) 627-09-32", icon: Phone },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50 transition-colors group-hover:border-border group-hover:bg-muted">
                      <Icon className="h-3.5 w-3.5 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={FADE_UP}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.footer.followUs}</p>
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
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/50 transition-colors group-hover:border-border group-hover:bg-muted">
                      <Icon className="h-3.5 w-3.5 text-primary/70 group-hover:text-primary transition-colors" />
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
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
