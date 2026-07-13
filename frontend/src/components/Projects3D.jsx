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
  Database, Server, Code2, Layout, Zap, Package, Globe, Shield, Activity, Cpu, Terminal, Cloud, Braces, Binary, ExternalLink, ArrowRight
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
    title: "Rahul Devloper",
    tagline: "My personal developer portfolio, showcasing projects and skills",
    highlight: "Fully responsive, dark-themed portfolio built from scratch",
    stats: [
      { label: "Projects", value: 8, suffix: "+" },
      { label: "Performance", value: 99, suffix: " score" },
    ],
    cta: "rahul-devloper.vercel.app",
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

const POOL_ICONS = [Database, Server, Code2, Layout, Zap, Package, Globe, Shield, Activity, Cpu, Terminal, Cloud, Braces, Binary];
function pickIcons(seed, count = 5) {
  const withIndex = POOL_ICONS.map((Icon, idx) => ({ Icon, idx }));
  const shuffled = withIndex.sort((a, b) => ((seed * 17 + a.idx) % 11) - ((seed * 13 + b.idx) % 11));
  return shuffled.slice(0, count).map(obj => obj.Icon);
}

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
      className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white overflow-hidden group"
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

// ── Variants ──

const VariantGlass = ({ project, isActive, index }) => (
  <div className="relative w-full h-full rounded-[2rem] bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] overflow-hidden flex flex-col p-8 transition-all duration-500 hover:bg-white/[0.04]">
    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[80px] opacity-30 pointer-events-none" style={{ background: project.accent }} />
    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-[80px] opacity-20 pointer-events-none" style={{ background: project.accent }} />
    
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-400">0{index + 1} // Glass Edition</div>
      <Zap size={20} style={{ color: project.accent }} />
    </div>
    
    <h3 className="text-4xl font-light text-white mb-3 tracking-wide relative z-10">{project.title}</h3>
    <p className="text-gray-400 font-light leading-relaxed mb-auto max-w-md relative z-10">{project.tagline}</p>
    
    <div className="grid grid-cols-2 gap-4 mb-8 mt-4 relative z-10">
      {project.stats.map((stat, i) => (
        <div key={i} className="flex flex-col">
          <div className="text-3xl font-extralight text-white mb-1"><CardCountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} trigger={isActive} /></div>
          <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
    
    <div className="flex items-center justify-between mt-4 relative z-10">
      <div className="text-sm text-gray-400 max-w-[200px] border-l pl-3" style={{ borderColor: project.accent }}>{project.highlight}</div>
      <MagneticButton accent={project.accent} href={project.cta}>Launch <ExternalLink size={16}/></MagneticButton>
    </div>
  </div>
);

const VariantNeon = ({ project, isActive, index }) => (
  <div className="relative w-full h-full bg-[#030303] border-2 overflow-hidden flex flex-col p-8 group" style={{ borderColor: `${project.accent}50`, boxShadow: isActive ? `0 0 30px ${project.accent}30, inset 0 0 20px ${project.accent}20` : 'none' }}>
    <div className="absolute top-0 left-0 w-full h-1" style={{ background: project.accent, filter: `drop-shadow(0 0 10px ${project.accent})` }} />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }} />
    
    <div className="flex items-center gap-3 mb-6 relative z-10">
      <div className="px-2 py-1 text-xs font-mono font-bold text-black" style={{ background: project.accent }}>SYS_{index+1}</div>
      <div className="text-xs font-mono text-gray-500 uppercase">Status: Online</div>
    </div>
    
    <h3 className="text-3xl font-mono font-bold text-white mb-4 uppercase tracking-tighter shadow-sm relative z-10" style={{ textShadow: `0 0 10px ${project.accent}80` }}>{project.title}</h3>
    <p className="text-gray-400 font-mono text-sm leading-relaxed mb-auto border-l-2 pl-4 relative z-10" style={{ borderColor: `${project.accent}50` }}>{project.tagline}</p>
    
    <div className="flex gap-4 mb-8 relative z-10">
      {project.stats.map((stat, i) => (
        <div key={i} className="flex-1 bg-white/[0.02] border border-white/[0.05] p-3">
          <div className="text-xs font-mono text-gray-500 mb-2">{stat.label}</div>
          <div className="text-xl font-mono font-bold" style={{ color: project.accent }}><CardCountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} trigger={isActive} /></div>
        </div>
      ))}
    </div>
    
    <div className="flex justify-between items-end relative z-10">
      <div className="text-xs font-mono text-gray-500 max-w-[200px]">> {project.highlight}</div>
      <a href={`https://${project.cta}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 font-mono font-bold text-sm uppercase transition-all hover:scale-105" style={{ background: project.accent, color: '#000', boxShadow: `0 0 15px ${project.accent}` }}>Execute</a>
    </div>
  </div>
);

const VariantBrutalist = ({ project, isActive, index }) => (
  <div className="relative w-full h-full bg-[#111] overflow-hidden flex flex-col transition-transform duration-500 border border-white/5 p-8 group">
    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full mix-blend-screen opacity-20 pointer-events-none transition-transform group-hover:scale-150 duration-700" style={{ background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)` }} />
    
    <div className="text-[120px] font-black leading-none opacity-5 absolute -top-4 -left-4 pointer-events-none select-none">0{index+1}</div>
    
    <div className="relative z-10 flex flex-col h-full">
      <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">{project.title}</h3>
      <p className="text-lg text-white/70 font-medium max-w-sm mb-auto">{project.tagline}</p>
      
      <div className="w-full h-px bg-white/10 my-6" />
      
      <div className="flex justify-between items-end mb-6">
        <div className="flex gap-8">
          {project.stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-black text-white tracking-tighter"><CardCountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} trigger={isActive} /></div>
              <div className="text-sm text-white/50 font-bold uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="text-sm font-medium text-white/80">{project.highlight}</div>
        <a href={`https://${project.cta}`} target="_blank" rel="noopener noreferrer" className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:rotate-45 hover:scale-110" style={{ background: project.accent, color: '#000' }}>
          <ArrowRight size={24} />
        </a>
      </div>
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

  const variantType = index % 3;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ scale, opacity, y, zIndex, rotateX: finalRotateX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={`absolute inset-0 m-auto w-full max-w-[900px] h-[500px] ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <motion.div 
        className="w-full h-full relative" 
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
      >
        <motion.div style={{ x: contentX, y: contentZ }} className="w-full h-full shadow-2xl rounded-[2rem]">
          {variantType === 0 && <VariantGlass project={project} isActive={isActive} index={index} />}
          {variantType === 1 && <VariantNeon project={project} isActive={isActive} index={index} />}
          {variantType === 2 && <VariantBrutalist project={project} isActive={isActive} index={index} />}
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
      <div id="projects-3d" ref={containerRef} className="hidden md:block relative w-full bg-[#030305]" style={{ height: `${PROJECTS.length * 100}vh` }}>
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1800px" }}>
          
          {/* Background atmosphere */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <motion.div 
               className="w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
               animate={{ background: PROJECTS[activeIndex]?.accent || '#3b82f6', scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute top-12 left-0 right-0 text-center z-[100] pointer-events-none">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-white mb-2 tracking-tight uppercase"
            >
              My Projects Stack
            </motion.h2>
            <p className="text-white/50 text-sm font-medium tracking-widest uppercase">Scroll to explore</p>
          </div>

          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[100]">
            {PROJECTS.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}
                      className="text-[10px] uppercase font-bold text-white/70"
                    >
                      0{i+1}
                    </motion.span>
                  )}
                </AnimatePresence>
                <div
                  className="rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: activeIndex === i ? 12 : 6,
                    height: activeIndex === i ? 12 : 6,
                    background: activeIndex === i ? p.accent : "rgba(255,255,255,0.1)",
                    boxShadow: activeIndex === i ? `0 0 20px ${p.accent}` : "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Render Cards in a 3D Context */}
          <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center transform-gpu">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: Scroll-Triggered Staggered Animations ── */}
      <div id="projects-mobile" className="block md:hidden w-full py-20 px-5 bg-[#030305]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-white mb-3 uppercase tracking-tight">My Projects</h2>
          <p className="text-white/50 text-sm font-medium uppercase tracking-widest">Tap to view live</p>
        </motion.div>
        
        <div className="flex flex-col gap-12">
          {PROJECTS.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className="w-full relative group"
              >
                <div className="absolute -inset-1 rounded-[2rem] blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" style={{ background: project.accent }} />
                
                <div className="relative w-full overflow-hidden rounded-[2rem] shadow-xl">
                  {/* Mobile unified card for best readability */}
                  <div className="bg-[#111] border border-white/10 p-6 flex flex-col h-full relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[50px] opacity-20" style={{ background: project.accent }} />
                    
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <span className="w-2 h-2 rounded-full" style={{ background: project.accent, boxShadow: `0 0 10px ${project.accent}` }} />
                      <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: project.accent }}>Project 0{index + 1}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed relative z-10">{project.tagline}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-xl font-bold text-white mb-1">{stat.prefix}{stat.value}{stat.suffix}</div>
                          <div className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-start gap-2 text-xs text-gray-300 border-l-2 pl-3 mb-6 relative z-10" style={{ borderLeftColor: project.accent }}>
                      <Zap size={14} className="shrink-0 mt-0.5" style={{ color: project.accent }} />
                      {project.highlight}
                    </div>
                    
                    <a
                      href={`https://${project.cta}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-white text-center transition-all active:scale-95 block relative z-10"
                      style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}50` }}
                    >
                      View Live Project
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
