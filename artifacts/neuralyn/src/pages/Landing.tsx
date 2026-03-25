import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ─── Word component for scroll-driven color/opacity reveal ──────────────── */
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
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["hsl(0 0% 35%)", "hsl(0 0% 100%)"],
  );

  return (
    <motion.span style={{ opacity, color }} className="mr-[0.3em]">
      {word}
    </motion.span>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero text content: fade and slide up over first 50% of scroll
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Dashboard image: slower parallax
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-col"
    >
      {/* ── Navbar ── */}
      <nav className="relative z-50 flex items-center justify-between px-8 md:px-28 py-4 flex-shrink-0">
        {/* Left: logo + brand + nav links */}
        <div className="flex items-center gap-12 md:gap-20">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Neuralyn logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Neuralyn
            </span>
          </div>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Home
            </a>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
              <ChevronDown className="w-4 h-4" />
            </button>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Reviews
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Right: Sign In */}
        <button className="bg-foreground text-background rounded-lg text-sm font-semibold px-5 py-2 hover:opacity-80 transition-opacity">
          Sign In
        </button>
      </nav>

      {/* ── Hero Content (parallax group) ── */}
      <motion.div
        style={{ y: heroTextY, opacity: heroTextOpacity }}
        className="relative z-10 flex flex-col items-center text-center mt-16 md:mt-20 px-4 flex-shrink-0"
      >
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="liquid-glass inline-flex items-center gap-2 px-3 py-2 rounded-lg mb-6"
        >
          <span className="bg-foreground text-background rounded-md text-sm font-medium px-2 py-0.5">
            New
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            Say Hello to Corewave v3.2
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-medium leading-tight md:leading-[1.15] tracking-[-2px] mb-3 text-foreground"
        >
          Your Insights.
          <br />
          One Clear{" "}
          <span className="font-serif italic font-normal">Overview.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg font-normal leading-6 opacity-90 mb-8 max-w-lg"
          style={{ color: "hsl(var(--hero-subtitle))" }}
        >
          Neuralyn helps teams track metrics, goals,
          <br />
          and progress with precision.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-foreground text-background rounded-full px-8 py-3.5 text-base font-medium"
          >
            Get Started for Free
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── Dashboard + Video Area ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative mt-10 flex-1 flex-shrink-0"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          aspectRatio: "16/9",
        }}
      >
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
        />

        {/* Dashboard image with parallax */}
        <motion.img
          src="/hero-dashboard.svg"
          alt="Neuralyn dashboard"
          style={{ y: dashboardY, mixBlendMode: "luminosity" }}
          className="absolute inset-0 m-auto max-w-5xl w-[90%] rounded-2xl"
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-30"
          style={{
            background:
              "linear-gradient(to top, hsl(0 0% 0%), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

/* ─── Testimonial Section ────────────────────────────────────────────────── */
const TESTIMONIAL_TEXT =
  "Neuralyn revolutionized how we handle financial insights using smart analytics. We are now driving better outcomes quicker than we ever imagined! Neuralyn revolutionized how we handle financial insights using smart analytics.";

function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const words = TESTIMONIAL_TEXT.split(" ");

  return (
    <section className="min-h-screen flex items-center py-24 md:py-32 px-8 md:px-28">
      <div
        ref={containerRef}
        className="max-w-3xl mx-auto flex flex-col items-start gap-10"
      >
        {/* Quote symbol */}
        <img
          src="/quote-symbol.svg"
          alt=""
          aria-hidden="true"
          className="w-14 h-10 object-contain"
        />

        {/* Testimonial text — scroll-driven word reveal */}
        <div className="text-4xl md:text-5xl font-medium leading-[1.2] flex flex-wrap">
          {words.map((word, i) => (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              start={i / words.length}
              end={(i + 1) / words.length}
            />
          ))}
          {/* Closing quote */}
          <span className="text-muted-foreground ml-2">&rdquo;</span>
        </div>

        {/* Author row */}
        <div className="flex items-center gap-4">
          <img
            src="/testimonial-avatar.svg"
            alt="Brooklyn Simmons"
            className="w-14 h-14 rounded-full border-[3px] border-foreground object-cover"
          />
          <div>
            <p className="text-base font-semibold leading-7 text-foreground">
              Brooklyn Simmons
            </p>
            <p className="text-sm font-normal leading-5 text-muted-foreground">
              Product Manager
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Landing() {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <TestimonialSection />
    </main>
  );
}
