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
  Database, Server, Code2, Layout, Zap, Package, Globe, Shield, Activity, Cpu, Terminal, Cloud, Braces, Binary, ExternalLink
} from "lucide-react";

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
  },
  {
    id: 3,
    title: "Rahul Developer",
    tagline: "My personal developer portfolio, showcasing projects and skills",
    highlight: "Fully responsive, dark-themed portfolio built from scratch",
    stats: [
      { label: "Projects", value: 8, suffix: "+" },
      { label: "Performance", value: 99, suffix: " score" },
    ],
    cta: "rahul-developer.vercel.app",
    accent: "#d946ef",
  },
  {
    id: 4,
    title: "Nexus Student Management",
    tagline: "Full student management system for tracking records, attendance, and grades",
    highlight: "Handles admin, teacher, and student roles with separate dashboards",
    stats: [
      { label: "Roles", value: 3, suffix: "" },
      { label: "Updates", value: 100, suffix: "ms" },
    ],
    cta: "nexus-student-management.vercel.app",
    accent: "#f97316",
  },
  {
    id: 5,
    title: "Rahul College Annual Function",
    tagline: "Event site built for a college's annual function — schedule, registration, and updates",
    highlight: "Includes an auto-seeding backend with loading states for smooth setup",
    stats: [
      { label: "Live events", value: 12, suffix: "+" },
      { label: "Users", value: 500, suffix: "+" },
    ],
    cta: "rahul-college-anual-function.vercel.app",
    accent: "#6366f1",
  },
  {
    id: 6,
    title: "Naure Sip Premium",
    tagline: "Platform for a fruit juice startup — browse and order fresh juices online",
    highlight: "End-to-end ordering flow with transactional email built in",
    stats: [
      { label: "Tracking", value: 24, suffix: "hr" },
      { label: "Alerts", value: 100, suffix: "%" },
    ],
    cta: "naure-sip-premium.vercel.app",
    accent: "#84cc16",
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
  },
];

const CardCountUp = ({ to, prefix = "", suffix = "", trigger }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) { setCount(0); return; }
    let startTimestamp = null, raf = 0;
    const duration = 900;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(ease * to);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(to);
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(step); }, 200);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to, trigger]);
  return <span>{prefix}{Math.floor(count)}{suffix}</span>;
};

const MagneticButton = ({ children, accent, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      href={`https://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white overflow-hidden group"
      style={{
        boxShadow: `0 0 20px ${accent}40`,
        border: `1px solid ${accent}50`,
      }}
    >
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300" style={{ background: accent }} />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.a>
  );
};

// ── Unified Premium Glass Variant ──

const VariantGlass = ({ project, isActive, index }) => (
  <div className="relative w-full h-full rounded-[2.5rem] bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] overflow-hidden flex flex-col p-10 transition-all duration-500 hover:bg-white/[0.04]">
    {/* Large ambient glowing orbs */}
    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 pointer-events-none" style={{ background: project.accent }} />
    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ background: project.accent }} />
    
    <div className="flex justify-between items-start mb-8 relative z-10">
      <div className="text-[13px] uppercase tracking-[0.4em] font-semibold text-white/50">0{index + 1} // Featured Project</div>
      <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <Zap size={28} style={{ color: project.accent }} />
      </div>
    </div>
    
    <h3 className="text-5xl font-semibold text-white mb-4 tracking-tight leading-tight relative z-10">{project.title}</h3>
    <p className="text-xl text-gray-300 font-light leading-relaxed mb-auto max-w-xl relative z-10">{project.tagline}</p>
    
    <div className="grid grid-cols-2 gap-8 mb-10 mt-6 relative z-10">
      {project.stats.map((stat, i) => (
        <div key={i} className="flex flex-col">
          <div className="text-5xl font-light text-white mb-2 tracking-tighter"><CardCountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} trigger={isActive} /></div>
          <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
    
    <div className="flex items-center justify-between mt-4 relative z-10">
      <div className="text-lg text-gray-300 max-w-[300px] border-l-2 pl-5 py-1" style={{ borderColor: project.accent }}>{project.highlight}</div>
      <MagneticButton accent={project.accent} href={project.cta}>Launch Project <ExternalLink size={20}/></MagneticButton>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Project Card (Desktop)
// ─────────────────────────────────────────────
const ProjectCard = ({ project, index, scrollYProgress }) => {
  const total = PROJECTS.length;
  const start = index / total;
  const end = (index + 1) / total;
  const center = (start + end) / 2;
  const pad = 0.05;
  
  // Immersive 3D entry from deep Z-axis
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, start - pad*2), start, center, end, Math.min(1, end + pad)],
    [0.4, 0.7, 1, 0.9, 0.85]
  );
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - pad*2), start, center, end, Math.min(1, end + pad)],
    [0, 0.3, 1, 0.5, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - pad*2), start, center, end, Math.min(1, end + pad)],
    [600, 200, 0, -80, -150]
  );
  const rotateXScroll = useTransform(
    scrollYProgress,
    [Math.max(0, start - pad*2), start, center, end, Math.min(1, end + pad)],
    [45, 20, 0, -5, -10]
  );
  const zIndex = useTransform(scrollYProgress, [start, center, end], [1, 50, 1]);

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => setIsActive(v >= start - 0.02 && v < end + 0.02));
  }, [scrollYProgress, start, end]);

  // Mouse Parallax & Tilt
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 150, damping: 20 });
  const springY = useSpring(my, { stiffness: 150, damping: 20 });
  
  // Parallax layers
  const contentZ = useTransform(springX, [-10, 10], [-20, 20]);
  const contentX = useTransform(springY, [-10, 10], [15, -15]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    mx.set(-((y - cy) / cy) * 12);
    my.set(((x - cx) / cx) * 12);
  };

  const handleMouseLeave = () => { mx.set(0); my.set(0); };
  const finalRotateX = useTransform([rotateXScroll, springX], ([rx, sx]) => rx + sx);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ scale, opacity, y, zIndex, rotateX: finalRotateX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={`absolute inset-0 m-auto w-full max-w-[1000px] h-[580px] ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <motion.div 
        className="w-full h-full relative" 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
      >
        <motion.div style={{ x: contentX, y: contentZ }} className="w-full h-full shadow-2xl rounded-[2.5rem]">
          <VariantGlass project={project} isActive={isActive} index={index} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────
const Projects3D = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * PROJECTS.length), PROJECTS.length - 1);
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* ── Desktop: Immersive 3D Scroll (No Laptop) ── */}
      <div id="projects-3d" ref={containerRef} className="hidden lg:block relative w-full bg-[#030305]" style={{ height: `${PROJECTS.length * 100}vh` }}>
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1800px" }}>
          
          {/* Background atmosphere */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <motion.div 
               className="w-[800px] h-[800px] rounded-full blur-[140px] opacity-20"
               animate={{ background: PROJECTS[activeIndex]?.accent || '#3b82f6', scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute top-12 left-0 right-0 text-center z-[100] pointer-events-none">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black text-white mb-2 tracking-tight uppercase"
            >
              My Projects Stack
            </motion.h2>
            <p className="text-white/50 text-base font-medium tracking-widest uppercase">Scroll to explore</p>
          </div>

          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-[100]">
            {PROJECTS.map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}
                      className="text-[12px] uppercase font-bold text-white/70 tracking-wider"
                    >
                      0{i+1}
                    </motion.span>
                  )}
                </AnimatePresence>
                <div
                  className="rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: activeIndex === i ? 14 : 8,
                    height: activeIndex === i ? 14 : 8,
                    background: activeIndex === i ? p.accent : "rgba(255,255,255,0.1)",
                    boxShadow: activeIndex === i ? `0 0 24px ${p.accent}` : "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Render Cards in a 3D Context */}
          <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center transform-gpu">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: Scroll-Triggered Staggered Animations ── */}
      <div id="projects-mobile" className="block lg:hidden w-full py-24 px-6 bg-[#030305]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-tight">My Projects</h2>
          <p className="text-white/50 text-base font-medium uppercase tracking-widest">Tap to view live</p>
        </motion.div>
        
        <div className="flex flex-col gap-16">
          {PROJECTS.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                className="w-full relative group"
              >
                <div className="absolute -inset-2 rounded-[2.5rem] blur-xl opacity-30 transition-opacity duration-500" style={{ background: project.accent }} />
                
                <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
                  {/* Mobile unified premium card */}
                  <div className="bg-[#111] border border-white/10 p-8 sm:p-10 flex flex-col h-full relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[60px] opacity-20" style={{ background: project.accent }} />
                    <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-[60px] opacity-20" style={{ background: project.accent }} />
                    
                    <div className="flex justify-between items-center mb-8 relative z-10">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full" style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }} />
                        <span className="text-[12px] uppercase font-bold tracking-widest text-white/70">Project 0{index + 1}</span>
                      </div>
                      <Zap size={24} style={{ color: project.accent }} />
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-4 leading-tight relative z-10">{project.title}</h3>
                    <p className="text-lg text-gray-400 mb-8 leading-relaxed relative z-10">{project.tagline}</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/5">
                          <div className="text-3xl font-bold text-white mb-1">{stat.prefix}{stat.value}{stat.suffix}</div>
                          <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-start gap-3 text-sm text-gray-300 border-l-2 pl-4 py-1 mb-8 relative z-10" style={{ borderLeftColor: project.accent }}>
                      {project.highlight}
                    </div>
                    
                    <a
                      href={`https://${project.cta}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-xl text-base font-bold text-white text-center transition-all active:scale-95 flex items-center justify-center gap-2 relative z-10"
                      style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}50` }}
                    >
                      View Live Project <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Projects3D;
