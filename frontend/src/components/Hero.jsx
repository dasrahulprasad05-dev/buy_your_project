import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Sparkles,
  Play,
  Code2,
  Terminal,
  Box,
  Cloud,
  Database,
  Cpu,
  Layers,
  LayoutTemplate,
  Globe,
  Command,
  Activity,
  Zap,
  Braces,
  Server,
  Package,
  Shield,
  ArrowRight,
} from "lucide-react";

// ─────────────────────────────────────────────
// CountUp
// ─────────────────────────────────────────────
const CountUp = ({
  to,
  duration = 1.2,
  delay = 0,
  isDecimal = false,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let timeoutId;
    let raf = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1
      );
      const easeProgress =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * to);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(to);
    };

    timeoutId = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(raf);
    };
  }, [to, duration, delay]);

  return (
    <span>{isDecimal ? count.toFixed(1) : Math.floor(count)}</span>
  );
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const WORDS = ["days", "hours", "minutes"];

const FLOATING_ORBS = [
  { Icon: Code2, top: "12%", left: "6%", accent: "#60a5fa", size: 48, delay: 0 },
  { Icon: Terminal, top: "22%", right: "7%", accent: "#4ade80", size: 54, delay: 0.2 },
  { Icon: Box, top: "58%", left: "5%", accent: "#c084fc", size: 50, delay: 0.4 },
  { Icon: Cloud, top: "72%", right: "9%", accent: "#38bdf8", size: 44, delay: 0.55 },
  { Icon: Database, top: "14%", right: "22%", accent: "#fb923c", size: 48, delay: 0.7 },
  { Icon: Cpu, top: "78%", left: "22%", accent: "#f87171", size: 52, delay: 0.9 },
  { Icon: Layers, top: "42%", left: "2%", accent: "#facc15", size: 46, delay: 1.05 },
  { Icon: LayoutTemplate, top: "36%", right: "3%", accent: "#f472b6", size: 50, delay: 1.2 },
  { Icon: Globe, top: "6%", left: "28%", accent: "#818cf8", size: 46, delay: 1.35 },
  { Icon: Command, top: "88%", right: "30%", accent: "#34d399", size: 48, delay: 1.5 },
  { Icon: Activity, top: "50%", right: "14%", accent: "#fb7185", size: 42, delay: 1.65 },
  { Icon: Zap, top: "82%", left: "12%", accent: "#fbbf24", size: 54, delay: 1.8 },
  { Icon: Braces, top: "18%", left: "16%", accent: "#22d3ee", size: 46, delay: 1.95 },
  { Icon: Server, top: "64%", right: "18%", accent: "#a78bfa", size: 44, delay: 2.1 },
  { Icon: Package, top: "30%", left: "12%", accent: "#2dd4bf", size: 42, delay: 2.25 },
  { Icon: Shield, top: "68%", left: "30%", accent: "#94a3b8", size: 44, delay: 2.4 },
];

// ─────────────────────────────────────────────
// Single floating orb (ball + icon + neon)
// ─────────────────────────────────────────────
const TechOrb = ({
  Icon,
  top,
  left,
  right,
  accent,
  size,
  delay,
}) => {
  return (
    <motion.div
      className="absolute z-0 flex items-center justify-center rounded-full cursor-pointer"
      style={{
        top,
        left,
        right,
        width: size,
        height: size,
        background: `radial-gradient(circle at 32% 28%, ${accent}66, ${accent}22 50%, transparent 72%)`,
        border: `1px solid ${accent}55`,
        boxShadow: `0 0 18px ${accent}40, inset 0 0 14px ${accent}28`,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [-10, 10, -10],
        x: [0, 6, 0],
      }}
      whileHover={{
        scale: 1.2,
        boxShadow: `0 0 32px ${accent}80, inset 0 0 18px ${accent}50`,
        zIndex: 40,
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: {
          duration: 4.5 + delay * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        x: {
          duration: 5.5 + delay * 0.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.3,
        },
      }}
    >
      {/* Soft outer bloom */}
      <div
        className="absolute inset-[-6px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent}28 0%, transparent 70%)`,
          filter: "blur(4px)",
        }}
      />
      <Icon
        size={Math.round(size * 0.42)}
        strokeWidth={1.5}
        style={{
          color: accent,
          filter: `drop-shadow(0 0 8px ${accent})`,
        }}
      />
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef(null);

  // Mouse-driven parallax / tilt on main content
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 80, damping: 20 });
  const springY = useSpring(my, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const contentX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const contentY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[90vh] overflow-hidden py-16 md:py-24 flex justify-center items-center"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient light blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] w-[320px] h-[320px] rounded-full opacity-20 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[30%] right-[5%] w-[280px] h-[280px] rounded-full opacity-15 blur-[70px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Desktop floating orbs */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto w-full h-full hidden md:block z-0">
        <div className="relative w-full h-full pointer-events-auto">
          {FLOATING_ORBS.map((item, idx) => (
            <TechOrb key={idx} {...item} />
          ))}
        </div>
      </div>

      {/* Mobile floating orbs (fewer) */}
      <div className="absolute inset-0 pointer-events-none w-full h-full block md:hidden z-0">
        {FLOATING_ORBS.slice(0, 5).map((item, idx) => (
          <TechOrb
            key={`m-${idx}`}
            {...item}
            size={Math.round(item.size * 0.78)}
          />
        ))}
      </div>

      {/* Main content — slight 3D tilt follows mouse */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          rotateX,
          rotateY,
          x: contentX,
          y: contentY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 max-w-[680px] mx-auto px-4 text-center flex flex-col items-center"
      >
        {/* Glass panel behind content for depth */}
        <div
          className="absolute -inset-6 md:-inset-10 rounded-3xl pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,10,18,0.75) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow badge */}
        <motion.div
          variants={itemVariants}
          className="relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-7 border border-primary/30 bg-primary/10 text-primary"
          style={{
            boxShadow:
              "0 0 24px rgba(59,130,246,0.25), inset 0 0 12px rgba(59,130,246,0.08)",
          }}
        >
          <span
            className="absolute inset-0 rounded-full opacity-40 blur-md pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
            }}
          />
          <Sparkles size={15} className="relative z-10" />
          <span className="relative z-10">
            12 templates shipped this month
          </span>
          <span
            className="relative z-10 w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
            style={{ boxShadow: "0 0 8px currentColor" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-[3.25rem] font-semibold text-white mb-6 leading-[1.15] tracking-tight"
        >
          Ship your next project
          <br className="hidden sm:block" />
          <span className="text-gray-400 font-medium">in </span>
          <span className="inline-flex relative w-[132px] md:w-[158px] justify-center align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute font-bold text-primary"
                style={{
                  textShadow:
                    "0 0 28px rgba(59,130,246,0.65), 0 0 60px rgba(59,130,246,0.25)",
                }}
              >
                {WORDS[wordIndex]},
              </motion.span>
            </AnimatePresence>
            {/* spacer keeps layout stable */}
            <span className="opacity-0 font-bold">{WORDS[0]},</span>
          </span>
          <br className="hidden sm:block" />
          <span className="text-gray-400 font-medium">not weeks</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-gray-400 max-w-[440px] mb-9 leading-relaxed"
        >
          High-quality, ready-to-use project templates and applications built
          with modern web technologies to accelerate your development.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto mb-12"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 bg-primary hover:bg-primaryHover text-white px-7 py-3 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto overflow-hidden"
            style={{
              boxShadow:
                "0 0 28px rgba(59,130,246,0.4), 0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            Browse projects
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 hover:bg-white/[0.06] text-white px-7 py-3 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
            style={{
              boxShadow: "0 0 0 transparent",
            }}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/15">
              <Play size={12} className="fill-white text-white ml-0.5" />
            </span>
            Watch demo
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-3 w-full max-w-[440px]"
        >
          {[
            {
              value: 45,
              label: "Templates",
              accent: "#60a5fa",
              isDecimal: false,
              suffix: "",
            },
            {
              value: 1250,
              label: "Buyers",
              accent: "#a78bfa",
              isDecimal: false,
              suffix: "+",
            },
            {
              value: 4.9,
              label: "Avg rating",
              accent: "#34d399",
              isDecimal: true,
              suffix: "",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-4 flex flex-col items-center border border-white/[0.08] bg-white/[0.03] backdrop-blur-md overflow-hidden group"
              style={{
                boxShadow: `inset 0 0 24px ${stat.accent}10, 0 0 20px ${stat.accent}12`,
              }}
            >
              {/* top neon edge */}
              <div
                className="absolute top-0 left-3 right-3 h-px opacity-70"
                style={{
                  background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)`,
                  boxShadow: `0 0 8px ${stat.accent}`,
                }}
              />
              <span
                className="text-2xl md:text-3xl font-bold text-white tabular-nums"
                style={{
                  textShadow: `0 0 20px ${stat.accent}70`,
                }}
              >
                <CountUp
                  to={stat.value}
                  delay={0.55}
                  isDecimal={stat.isDecimal}
                />
                {stat.suffix}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 mt-1.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
