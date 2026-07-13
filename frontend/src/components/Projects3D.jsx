import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Database,
  Server,
  Code2,
  Layout,
  Zap,
  Package,
  Globe,
  Shield,
  Activity,
  Cpu,
  Terminal,
  Cloud,
  Braces,
  Binary,
} from "lucide-react";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "Buy Your Project",
    tagline: "A marketplace for premium, ready-to-use developer templates",
    highlight: "Built the whole storefront, checkout, and admin flow myself",
    stats: [
      { label: "Templates", value: 8, suffix: "" },
      { label: "Price", value: 99, prefix: "$", suffix: "+" },
    ],
    cta: "buy-your-project.vercel.app",
    accent: "#06b6d4",
    gradient: "from-cyan-500/30 via-blue-500/10 to-transparent",
    border: "border-cyan-400/40",
    glow: "0 0 40px rgba(6,182,212,0.45), 0 0 80px rgba(6,182,212,0.15)",
  },
  {
    id: 2,
    title: "Arogya Sahayak",
    tagline: "AI health assistant that helps users check symptoms and get guidance",
    highlight: "Includes fallback handling for critical cases like heart attack detection",
    stats: [
      { label: "Symptom triage", value: 24, suffix: "/7" },
      { label: "LLM Powered", value: 100, suffix: "%" },
    ],
    cta: "arogya-sahayak-ten.vercel.app",
    accent: "#10b981",
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    border: "border-emerald-400/40",
    glow: "0 0 40px rgba(16,185,129,0.45), 0 0 80px rgba(16,185,129,0.15)",
  },
  {
    id: 3,
    title: "Rahul Devloper",
    tagline: "My personal developer portfolio, showcasing projects and skills",
    highlight: "Fully responsive, dark-themed portfolio built from scratch",
    stats: [
      { label: "Projects", value: 8, suffix: "+" },
      { label: "Performance", value: 99, suffix: " score" },
    ],
    cta: "rahul-devloper.vercel.app",
    accent: "#d946ef",
    gradient: "from-fuchsia-500/30 via-purple-500/10 to-transparent",
    border: "border-fuchsia-400/40",
    glow: "0 0 40px rgba(217,70,239,0.45), 0 0 80px rgba(217,70,239,0.15)",
  },
  {
    id: 4,
    title: "Nexus Student Management",
    tagline: "Full student management system for tracking records, attendance, and grades",
    highlight: "Handles admin, teacher, and student roles with separate dashboards",
    stats: [
      { label: "Roles", value: 3, suffix: "" },
      { label: "Real-time updates", value: 100, suffix: "ms" },
    ],
    cta: "nexus-student-management.vercel.app",
    accent: "#f97316",
    gradient: "from-orange-500/30 via-red-500/10 to-transparent",
    border: "border-orange-400/40",
    glow: "0 0 40px rgba(249,115,22,0.45), 0 0 80px rgba(249,115,22,0.15)",
  },
  {
    id: 5,
    title: "Rahul College Annual Function",
    tagline: "Event site built for a college's annual function — schedule, registration, and updates",
    highlight: "Includes an auto-seeding backend with loading states for smooth setup",
    stats: [
      { label: "Live events", value: 12, suffix: "+" },
      { label: "Registrations", value: 500, suffix: "+" },
    ],
    cta: "rahul-college-anual-function.vercel.app",
    accent: "#6366f1",
    gradient: "from-indigo-500/30 via-violet-500/10 to-transparent",
    border: "border-indigo-400/40",
    glow: "0 0 40px rgba(99,102,241,0.45), 0 0 80px rgba(99,102,241,0.15)",
  },
  {
    id: 6,
    title: "Naure Sip Premium",
    tagline: "Platform for a fruit juice startup — browse and order fresh juices online",
    highlight: "End-to-end ordering flow with transactional email built in",
    stats: [
      { label: "Order tracking", value: 24, suffix: "hr" },
      { label: "Email alerts", value: 100, suffix: "%" },
    ],
    cta: "naure-sip-premium.vercel.app",
    accent: "#84cc16",
    gradient: "from-lime-500/30 via-green-500/10 to-transparent",
    border: "border-lime-400/40",
    glow: "0 0 40px rgba(132,204,22,0.45), 0 0 80px rgba(132,204,22,0.15)",
  },
  {
    id: 7,
    title: "Unified Marketplace",
    tagline: "On-demand home services marketplace — book a plumber, electrician, and more",
    highlight: "Connects users with local service providers in a few clicks",
    stats: [
      { label: "Categories", value: 15, suffix: "+" },
      { label: "Booking", value: 1, suffix: " click" },
    ],
    cta: "unifiedmarketplace-eight.vercel.app",
    accent: "#f43f5e",
    gradient: "from-rose-500/30 via-pink-500/10 to-transparent",
    border: "border-rose-400/40",
    glow: "0 0 40px rgba(244,63,94,0.45), 0 0 80px rgba(244,63,94,0.15)",
  },
  {
    id: 8,
    title: "Campus Flow",
    tagline: "Comprehensive student management system for seamless campus operations",
    highlight: "Features an optimized dashboard with global loading states",
    stats: [
      { label: "Modules", value: 5, suffix: "+" },
      { label: "Efficiency", value: 99, suffix: "%" },
    ],
    cta: "campus-flow-sand-five.vercel.app",
    accent: "#3b82f6",
    gradient: "from-blue-500/30 via-sky-500/10 to-transparent",
    border: "border-blue-400/40",
    glow: "0 0 40px rgba(59,130,246,0.45), 0 0 80px rgba(59,130,246,0.15)",
  },
  {
    id: 9,
    title: "Rahul Gym",
    tagline: "Modern gym website for fitness tracking and membership management",
    highlight: "Includes secure authentication and a dedicated member dashboard",
    stats: [
      { label: "Plans", value: 3, suffix: "+" },
      { label: "Members", value: 200, suffix: "+" },
    ],
    cta: "rahul-gym-jade.vercel.app",
    accent: "#eab308",
    gradient: "from-yellow-500/30 via-amber-500/10 to-transparent",
    border: "border-yellow-400/40",
    glow: "0 0 40px rgba(234,179,8,0.45), 0 0 80px rgba(234,179,8,0.15)",
  },
  {
    id: 10,
    title: "ABIT Annual Function",
    tagline: "Event management platform for organizing the college annual function",
    highlight: "Streamlines scheduling, updates, and student registrations",
    stats: [
      { label: "Events", value: 15, suffix: "+" },
      { label: "Attendees", value: 800, suffix: "+" },
    ],
    cta: "abit-anual-function.vercel.app",
    accent: "#a855f7",
    gradient: "from-purple-500/30 via-fuchsia-500/10 to-transparent",
    border: "border-purple-400/40",
    glow: "0 0 40px rgba(168,85,247,0.45), 0 0 80px rgba(168,85,247,0.15)",
  },
];

const POOL_ICONS = [
  Database,
  Server,
  Code2,
  Layout,
  Zap,
  Package,
  Globe,
  Shield,
  Activity,
  Cpu,
  Terminal,
  Cloud,
  Braces,
  Binary,
];

// Deterministic-ish pick so SSR + client match per card
function pickIcons(seed, count = 5) {
  // Use the index for sorting instead of .name since .name is undefined on forwardRef in production
  const withIndex = POOL_ICONS.map((Icon, idx) => ({ Icon, idx }));
  const shuffled = withIndex.sort(
    (a, b) => ((seed * 17 + a.idx) % 11) - ((seed * 13 + b.idx) % 11)
  );
  return shuffled.slice(0, count).map(obj => obj.Icon);
}

// ─────────────────────────────────────────────
// CountUp
// ─────────────────────────────────────────────
const CardCountUp = ({
  to,
  prefix = "",
  suffix = "",
  trigger,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }

    let startTimestamp = null;
    let raf = 0;
    const duration = 900;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(ease * to);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(to);
    };

    const t = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, 200);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [to, trigger]);

  return (
    <span>
      {prefix}
      {Math.floor(count)}
      {suffix}
    </span>
  );
};

// ─────────────────────────────────────────────
// Floating tech orbs around a card
// ─────────────────────────────────────────────
const FloatingOrbs = ({
  accent,
  active,
  seed,
}) => {
  const orbs = useMemo(() => {
    const icons = pickIcons(seed, 5);
    // Positions around the card (percent relative to parent)
    const slots = [
      { top: "8%", left: "-6%" },
      { top: "22%", right: "-8%" },
      { bottom: "28%", left: "-10%" },
      { bottom: "12%", right: "-6%" },
      { top: "48%", left: "-12%" },
    ];
    return icons.map((Icon, i) => ({
      Icon,
      ...slots[i],
      size: 36 + ((seed + i * 7) % 16),
      delay: i * 0.35,
      duration: 3.2 + (i % 3) * 0.6,
      amp: 8 + (i % 4) * 3,
    }));
  }, [seed]);

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute z-20 pointer-events-none flex items-center justify-center rounded-full"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle at 30% 30%, ${accent}55, ${accent}18 55%, transparent 70%)`,
            border: `1px solid ${accent}55`,
            boxShadow: active
              ? `0 0 16px ${accent}66, inset 0 0 12px ${accent}33`
              : `0 0 6px ${accent}22`,
          }}
          animate={
            active
              ? {
                  y: [-orb.amp, orb.amp, -orb.amp],
                  x: [0, (i % 2 === 0 ? 6 : -6), 0],
                  scale: [1, 1.08, 1],
                  opacity: [0.55, 1, 0.55],
                }
              : { y: 0, x: 0, scale: 0.85, opacity: 0.25 }
          }
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        >
          <orb.Icon
            size={Math.round(orb.size * 0.45)}
            style={{ color: accent, filter: `drop-shadow(0 0 6px ${accent})` }}
          />
        </motion.div>
      ))}
    </>
  );
};

// ─────────────────────────────────────────────
// Project Card
// ─────────────────────────────────────────────
const ProjectCard = ({
  project,
  index,
  scrollYProgress,
}) => {
  const total = PROJECTS.length;

  // Non-overlapping ranges so cards appear one after another
  // Each card owns ~1/total of the scroll, with a short fade pad
  const pad = 0.04;
  const start = index / total;
  const end = (index + 1) / total;
  const center = (start + end) / 2;
  const inStart = Math.max(0, start);
  const inEnd = Math.min(1, end);
  const fadeIn = Math.min(1, start + pad);
  const fadeOut = Math.max(0, end - pad);

  // Rise from laptop (below) → center → exit upward slightly
  const scale = useTransform(
    scrollYProgress,
    [inStart, fadeIn, center, fadeOut, inEnd],
    [0.55, 0.92, 1, 0.92, 0.55]
  );
  const opacity = useTransform(
    scrollYProgress,
    [inStart, fadeIn, fadeOut, inEnd],
    [0, 1, 1, 0]
  );
  // Strong Y so it feels like it comes out of the laptop base
  const y = useTransform(
    scrollYProgress,
    [inStart, fadeIn, center, fadeOut, inEnd],
    [220, 40, 0, -40, -180]
  );
  const rotateXScroll = useTransform(
    scrollYProgress,
    [inStart, fadeIn, center, fadeOut, inEnd],
    [35, 12, 0, -8, -28]
  );
  const zIndex = useTransform(scrollYProgress, [start, center, end], [1, 60, 1]);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setIsActive(v >= start && v < end);
    });
    return unsub;
  }, [scrollYProgress, start, end]);

  // Mouse tilt (smooth springs)
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 180, damping: 18 });
  const springY = useSpring(my, { stiffness: 180, damping: 18 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const maxTilt = 10;
    mx.set(-((y - cy) / cy) * maxTilt);
    my.set(((x - cx) / cx) * maxTilt);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Combine scroll rotateX + mouse tilt
  const finalRotateX = useTransform(
    [rotateXScroll, springX],
    ([rx, sx]) => rx + sx
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        scale,
        opacity,
        y,
        zIndex,
        rotateX: finalRotateX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
      className={`absolute inset-0 m-auto w-full max-w-2xl h-[440px] ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Outer glow bloom when active */}
      <div
        className="absolute -inset-6 rounded-[28px] transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(ellipse at center, ${project.accent}33 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />

      {/* Floating tech orbs */}
      <FloatingOrbs accent={project.accent} active={isActive} seed={project.id * 31} />

      {/* Card shell */}
      <div
        className={`relative w-full h-full rounded-2xl bg-[#08080c]/95 border ${project.border} overflow-hidden flex flex-col transition-[box-shadow] duration-500`}
        style={{
          boxShadow: isActive
            ? project.glow
            : "0 0 0 transparent",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Neon edge line (top) */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            opacity: isActive ? 1 : 0.3,
            boxShadow: `0 0 12px ${project.accent}`,
          }}
        />

        {/* Soft gradient wash */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} pointer-events-none`}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-7 md:p-8">
          {/* Header */}
          <div className="mb-5">
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  key="header"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-block w-2 h-2 rounded-full animate-pulse"
                      style={{
                        background: project.accent,
                        boxShadow: `0 0 10px ${project.accent}`,
                      }}
                    />
                    <span
                      className="text-[11px] uppercase tracking-[0.2em] font-semibold"
                      style={{ color: project.accent }}
                    >
                      Project 0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed max-w-lg">
                    {project.tagline}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <div className="mb-5">
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {project.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl px-4 py-3 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                      style={{
                        boxShadow: isActive
                          ? `inset 0 0 20px ${project.accent}10`
                          : undefined,
                      }}
                    >
                      <div
                        className="text-xl md:text-2xl font-bold tabular-nums"
                        style={{
                          color: "#fff",
                          textShadow: `0 0 20px ${project.accent}88`,
                        }}
                      >
                        <CardCountUp
                          to={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          trigger={isActive}
                        />
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Highlight */}
          <div className="mb-auto">
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="highlight"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.28, duration: 0.4 }}
                  className="flex items-start gap-2.5 text-sm text-gray-300 pl-3 border-l-2"
                  style={{ borderLeftColor: project.accent }}
                >
                  <Zap
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{
                      color: project.accent,
                      filter: `drop-shadow(0 0 6px ${project.accent})`,
                    }}
                  />
                  <span className="leading-snug">{project.highlight}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="pt-5 mt-4 border-t border-white/[0.06]">
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.35 }}
                  className="flex items-center justify-between gap-4"
                >
                  <a
                    href={`https://${project.cta}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white border transition-all duration-300"
                    style={{
                      borderColor: `${project.accent}66`,
                      background: `${project.accent}18`,
                      boxShadow: `0 0 20px ${project.accent}33`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${project.accent}33`;
                      e.currentTarget.style.boxShadow = `0 0 28px ${project.accent}55`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${project.accent}18`;
                      e.currentTarget.style.boxShadow = `0 0 20px ${project.accent}33`;
                    }}
                  >
                    View project
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <span className="hidden sm:block text-[11px] text-gray-600 font-mono truncate max-w-[180px]">
                    {project.cta}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────
const Projects3D = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * PROJECTS.length),
        PROJECTS.length - 1
      );
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* ── Desktop: sticky 3D scroll ── */}
      <div
        id="projects-3d"
        ref={containerRef}
        className="hidden md:block relative w-full"
        style={{ height: `${PROJECTS.length * 100}vh` }}
      >
        <div
          className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{ perspective: "1400px" }}
        >
          {/* Title */}
          <div className="absolute top-8 left-0 right-0 text-center z-50 pointer-events-none">
            <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">
              My Projects Stack
            </h2>
            <p className="text-gray-500 text-sm">Scroll to pull projects from the machine</p>
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent mx-auto mt-3"
            />
          </div>

          {/* Progress dots */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 z-50">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? 10 : 6,
                  height: activeIndex === i ? 10 : 6,
                  background:
                    activeIndex === i ? p.accent : "rgba(255,255,255,0.15)",
                  boxShadow:
                    activeIndex === i ? `0 0 12px ${p.accent}` : "none",
                  marginLeft: activeIndex === i ? -2 : 0,
                }}
              />
            ))}
          </div>

          {/* ── Laptop frame ── */}
          {/* Screen bezel */}
          <div className="relative w-full max-w-[880px] z-10 flex flex-col items-center">
            {/* Top bezel / camera bar */}
            <div className="w-[92%] h-5 bg-gradient-to-b from-[#1a1a1f] to-[#121218] rounded-t-xl border border-b-0 border-white/[0.08] flex items-center justify-center z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600 shadow-[0_0_4px_#333]" />
            </div>

            {/* Screen area — cards emerge here */}
            <div
              className="relative w-[92%] h-[480px] bg-[#050508] border-x border-white/[0.08] overflow-visible flex items-center justify-center"
              style={{
                boxShadow:
                  "inset 0 0 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Screen scanline / glass tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-30" />

              {/* Soft bottom fade so cards “enter” from screen bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050508] to-transparent z-20 pointer-events-none" />

              {PROJECTS.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

            {/* Bottom bezel */}
            <div className="w-[92%] h-3 bg-[#121218] border border-t-0 border-white/[0.08] z-20" />

            {/* Hinge / base lip */}
            <div className="w-[96%] h-2 bg-gradient-to-b from-[#2a2a32] to-[#1a1a22] rounded-b-sm z-10" />

            {/* Laptop base */}
            <div className="w-[800px] max-w-full h-5 bg-gradient-to-b from-[#1e1e26] to-[#14141a] rounded-b-2xl border border-t-0 border-white/[0.06] flex justify-center items-start pt-1.5 shadow-2xl -mt-px">
              <div className="w-28 h-1 rounded-full bg-gray-700/80" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile fallback ── */}
      <div id="projects-mobile" className="block md:hidden w-full py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          My Projects Stack
        </h2>
        <p className="text-center text-gray-500 text-sm mb-10">
          Tap a card to open the live project
        </p>
        <div className="flex flex-col gap-6">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`relative w-full rounded-2xl bg-[#0a0a0f] border ${project.border} overflow-hidden p-6`}
              style={{ boxShadow: project.glow }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} pointer-events-none`}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: project.accent,
                      boxShadow: `0 0 8px ${project.accent}`,
                    }}
                  />
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] font-semibold"
                    style={{ color: project.accent }}
                  >
                    Project 0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  {project.tagline}
                </p>

                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {project.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.08]"
                    >
                      <div className="text-lg font-bold text-white">
                        {stat.prefix}
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-start gap-2 text-xs text-gray-300 border-l-2 pl-2.5 mb-5"
                  style={{ borderLeftColor: project.accent }}
                >
                  <Zap
                    size={13}
                    className="shrink-0 mt-0.5"
                    style={{ color: project.accent }}
                  />
                  {project.highlight}
                </div>

                <a
                  href={`https://${project.cta}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full px-5 py-3 rounded-lg text-sm font-medium text-white border"
                  style={{
                    borderColor: `${project.accent}55`,
                    background: `${project.accent}18`,
                    boxShadow: `0 0 18px ${project.accent}28`,
                  }}
                >
                  View project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects3D;
