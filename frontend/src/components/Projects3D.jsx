import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Database, Server, Code2, Layout, Zap, Package, Globe, Shield, Activity, Cpu } from 'lucide-react';

// --- Data ---
const PROJECTS = [
  {
    id: 1,
    title: "Buy Your Project",
    tagline: "A marketplace for premium, ready-to-use developer templates",
    highlight: "Built the whole storefront, checkout, and admin flow myself",
    stats: [
      { label: "Templates", value: 8, suffix: "" },
      { label: "Price", value: 99, prefix: "$", suffix: "+" }
    ],
    cta: "buy-your-project.vercel.app",
    color: "from-blue-500/40 to-cyan-500/40",
    borderColor: "border-cyan-500/50",
    glowColor: "shadow-[0_0_30px_rgba(6,182,212,0.3)]"
  },
  {
    id: 2,
    title: "Arogya Sahayak",
    tagline: "AI health assistant that helps users check symptoms and get guidance",
    highlight: "Includes fallback handling for critical cases like heart attack detection",
    stats: [
      { label: "Symptom triage", value: 24, suffix: "/7" },
      { label: "LLM Powered", value: 100, suffix: "%" }
    ],
    cta: "arogya-sahayak-ten.vercel.app",
    color: "from-teal-500/40 to-emerald-500/40",
    borderColor: "border-emerald-500/50",
    glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.3)]"
  },
  {
    id: 3,
    title: "Rahul Devloper",
    tagline: "My personal developer portfolio, showcasing projects and skills",
    highlight: "Fully responsive, dark-themed portfolio built from scratch",
    stats: [
      { label: "Projects", value: 8, suffix: "+" },
      { label: "Performance", value: 99, suffix: " score" }
    ],
    cta: "rahul-devloper.vercel.app",
    color: "from-purple-500/40 to-fuchsia-500/40",
    borderColor: "border-fuchsia-500/50",
    glowColor: "shadow-[0_0_30px_rgba(217,70,239,0.3)]"
  },
  {
    id: 4,
    title: "Nexus Student Management",
    tagline: "Full student management system for tracking records, attendance, and grades",
    highlight: "Handles admin, teacher, and student roles with separate dashboards",
    stats: [
      { label: "Roles", value: 3, suffix: "" },
      { label: "Real-time updates", value: 100, suffix: "ms" }
    ],
    cta: "nexus-student-management.vercel.app",
    color: "from-orange-500/40 to-red-500/40",
    borderColor: "border-orange-500/50",
    glowColor: "shadow-[0_0_30px_rgba(249,115,22,0.3)]"
  },
  {
    id: 5,
    title: "Rahul College Annual Function",
    tagline: "Event site built for a college's annual function — schedule, registration, and updates",
    highlight: "Includes an auto-seeding backend with loading states for smooth setup",
    stats: [
      { label: "Live events", value: 12, suffix: "+" },
      { label: "Registrations", value: 500, suffix: "+" }
    ],
    cta: "rahul-college-anual-function.vercel.app",
    color: "from-indigo-500/40 to-violet-500/40",
    borderColor: "border-indigo-500/50",
    glowColor: "shadow-[0_0_30px_rgba(99,102,241,0.3)]"
  },
  {
    id: 6,
    title: "Naure Sip Premium",
    tagline: "Platform for a fruit juice startup — browse and order fresh juices online",
    highlight: "End-to-end ordering flow with transactional email built in",
    stats: [
      { label: "Order tracking", value: 24, suffix: "hr" },
      { label: "Email alerts", value: 100, suffix: "%" }
    ],
    cta: "naure-sip-premium.vercel.app",
    color: "from-lime-500/40 to-green-500/40",
    borderColor: "border-lime-500/50",
    glowColor: "shadow-[0_0_30px_rgba(132,204,22,0.3)]"
  },
  {
    id: 7,
    title: "Unified Marketplace",
    tagline: "On-demand home services marketplace — book a plumber, electrician, and more for repairs",
    highlight: "Connects users with local service providers in a few clicks",
    stats: [
      { label: "Categories", value: 15, suffix: "+" },
      { label: "Booking", value: 1, suffix: " click" }
    ],
    cta: "unifiedmarketplace-eight.vercel.app",
    color: "from-rose-500/40 to-pink-500/40",
    borderColor: "border-rose-500/50",
    glowColor: "shadow-[0_0_30px_rgba(244,63,94,0.3)]"
  }
];

const POOL_ICONS = [Database, Server, Code2, Layout, Zap, Package, Globe, Shield, Activity, Cpu];

// CountUp Component
const CardCountUp = ({ to, prefix = "", suffix = "", trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }
    
    let startTimestamp = null;
    let timeoutId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / 1000, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeProgress * to);
      if (progress < 1) window.requestAnimationFrame(step);
      else setCount(to);
    };

    timeoutId = setTimeout(() => window.requestAnimationFrame(step), 300);
    return () => clearTimeout(timeoutId);
  }, [to, trigger]);

  return <span>{prefix}{Math.floor(count)}{suffix}</span>;
};


// 3D Card Component
const ProjectCard = ({ project, index, scrollYProgress }) => {
  const total = PROJECTS.length;
  // Make the ranges slightly overlapping so cards fade nicely
  const start = index / total;
  const end = (index + 1) / total;
  const center = (start + end) / 2;

  // Animate values based on scroll distance to center
  const scale = useTransform(scrollYProgress, [start - 0.05, center, end + 0.05], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [start - 0.05, center, end + 0.05], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [start - 0.05, center, end + 0.05], [150, 0, -150]);
  const zIndex = useTransform(scrollYProgress, [start, center, end], [0, 50, 0]);
  const rotateXScroll = useTransform(scrollYProgress, [start - 0.05, center, end + 0.05], [20, 0, -20]);

  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // Active window is slightly smaller than the full range
      if (v > start && v < end) setIsActive(true);
      else setIsActive(false);
    });
    return unsub;
  }, [scrollYProgress, start, end]);

  // Mouse tilt
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Limits
    const maxTilt = 8; 
    setRotateX(-((y - centerY) / centerY) * maxTilt);
    setRotateY(((x - centerX) / centerX) * maxTilt);
  };
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Combine transforms
  const finalRotateX = useTransform(() => rotateXScroll.get() + rotateX);
  
  // Random icons assigned once per component mount
  const [icons] = useState(() => {
    const shuffled = [...POOL_ICONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map((Icon, i) => ({
      Icon,
      top: `${10 + Math.random() * 80}%`,
      left: `${i % 2 === 0 ? Math.random() * 20 : 70 + Math.random() * 20}%`,
      delay: Math.random() * 2,
    }));
  });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        scale, opacity, y, zIndex,
        rotateX: finalRotateX,
        rotateY: rotateY,
      }}
      className={`absolute inset-0 m-auto w-full max-w-2xl h-[420px] p-2 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className={`relative w-full h-full rounded-2xl bg-[#0a0a0a] border ${project.borderColor} ${isActive ? project.glowColor : ''} overflow-hidden p-8 flex flex-col justify-between transition-shadow duration-500`}>
        
        {/* Glow Background */}
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${project.color} opacity-20`} />

        {/* Floating Icons */}
        {icons.map((ic, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 z-0 pointer-events-none"
            style={{ top: ic.top, left: ic.left }}
            animate={isActive ? { y: [-10, 10, -10] } : { y: 0 }}
            transition={{ duration: 4, repeat: Infinity, delay: ic.delay, ease: "easeInOut" }}
          >
            <ic.Icon size={40} />
          </motion.div>
        ))}

        <div className="relative z-10">
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-lg mb-8">{project.tagline}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mb-6"
              >
                {project.stats.map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-md">
                    <div className="text-2xl font-bold text-white">
                      <CardCountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} trigger={isActive} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isActive && (
              <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 }}
                 className="flex items-center gap-3 text-sm text-gray-300 border-l-2 pl-3"
                 style={{ borderLeftColor: 'rgba(255,255,255,0.4)' }}
              >
                <Zap size={16} className="text-yellow-400" />
                {project.highlight}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7 }}
              className="relative z-10"
            >
              <a 
                href={`https://${project.cta}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-6 py-3 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors shadow-lg`}
              >
                View details &rarr;
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

const Projects3D = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * PROJECTS.length), PROJECTS.length - 1);
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Desktop 3D Scroll Version */}
      <div id="projects-3d" ref={containerRef} className="hidden md:block relative w-full" style={{ height: `${PROJECTS.length * 100}vh` }}>
        
        {/* Sticky Container */}
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1500px" }}>
          
          <div className="absolute top-10 text-center z-50">
            <h2 className="text-3xl font-bold text-white mb-2">My Projects Stack</h2>
            <p className="text-gray-400 text-sm">Keep scrolling to explore</p>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-10 bg-white/30 mx-auto mt-4"
            />
          </div>

          {/* Progress Rail */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            {PROJECTS.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-primary scale-150 shadow-[0_0_10px_#3b82f6]' : 'bg-white/20'}`} 
              />
            ))}
          </div>

          {/* Laptop Base (Stylized) */}
          <div className="absolute bottom-[5vh] w-[800px] h-[25px] bg-gray-800 rounded-b-3xl rounded-t-sm shadow-2xl border-t border-gray-700/50 flex justify-center pt-1 z-0">
             <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
          </div>

          {/* Screen bounds for emergence illusion */}
          <div className="relative w-full max-w-4xl h-[600px] z-10 flex items-center justify-center">
            {PROJECTS.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>

        </div>
      </div>

      {/* Mobile Stack Version (Fallback) */}
      <div id="projects-mobile" className="block md:hidden w-full py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-10">My Projects Stack</h2>
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className={`relative w-full rounded-2xl bg-[#0a0a0a] border ${project.borderColor} overflow-hidden p-6 flex flex-col justify-between`}>
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${project.color} opacity-20`} />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{project.tagline}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="text-xl font-bold text-white">{stat.prefix}{stat.value}{stat.suffix}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-300 border-l-2 pl-2 mb-6" style={{ borderLeftColor: 'rgba(255,255,255,0.4)' }}>
                  <Zap size={14} className="text-yellow-400 shrink-0" />
                  {project.highlight}
                </div>

                <a 
                  href={`https://${project.cta}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full px-6 py-3 rounded-lg font-medium text-white bg-white/10 border border-white/20"
                >
                  View details &rarr;
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
