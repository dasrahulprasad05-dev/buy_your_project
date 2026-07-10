import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Terminal,
  Code2,
  Zap,
  Layout,
  Rocket,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Flame,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Particle Field + Cursor Trail
───────────────────────────────────────────── */
const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef([]);
  const trail = useRef([]);
  const raf = useRef(null);

  const initParticles = useCallback((w, h) => {
    const count = Math.min(70, Math.floor((w * h) / 18000));
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.45 + 0.15,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      initParticles(w, h);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      trail.current.push({
        x: mouse.current.x,
        y: mouse.current.y,
        life: 1,
      });
      if (trail.current.length > 18) trail.current.shift();
    };

    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // particles
      for (const p of particles.current) {
        // mild attraction to cursor
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 160, 255, ${p.alpha})`;
        ctx.fill();
      }

      // connection lines near cursor
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(100, 140, 255, ${0.08 * (1 - d / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // cursor trail glow
      for (let i = 0; i < trail.current.length; i++) {
        const t = trail.current[i];
        t.life -= 0.045;
        if (t.life <= 0) continue;
        const radius = 10 + i * 0.6;
        const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, radius);
        g.addColorStop(0, `rgba(99, 140, 255, ${0.22 * t.life})`);
        g.addColorStop(1, "rgba(99, 140, 255, 0)");
        ctx.beginPath();
        ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
      trail.current = trail.current.filter((t) => t.life > 0);

      // soft cursor core
      if (mouse.current.x > 0) {
        const g = ctx.createRadialGradient(
          mouse.current.x,
          mouse.current.y,
          0,
          mouse.current.x,
          mouse.current.y,
          80
        );
        g.addColorStop(0, "rgba(99, 140, 255, 0.12)");
        g.addColorStop(1, "rgba(99, 140, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-[1]"
      aria-hidden
    />
  );
};

/* ─────────────────────────────────────────────
   Mini Timeline
───────────────────────────────────────────── */
const timeline = [
  {
    year: "01",
    icon: Flame,
    title: "The Frustration",
    desc: "Rewriting auth, checkout & dashboards for every single project. Same pain. Every time.",
    accent: "from-orange-500/20 to-red-500/10",
    iconColor: "text-orange-400",
    border: "border-orange-500/20",
  },
  {
    year: "02",
    icon: Lightbulb,
    title: "The Realization",
    desc: "After 12+ production apps, the truth hit hard: the idea isn’t hard — surviving setup is.",
    accent: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    year: "03",
    icon: Rocket,
    title: "The Solution",
    desc: "Buy Your Project — premium templates so you launch in days, not months.",
    accent: "from-primary/25 to-blue-500/10",
    iconColor: "text-primary",
    border: "border-primary/25",
  },
];

/* ─────────────────────────────────────────────
   Main About
───────────────────────────────────────────── */
const About = () => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12), transparent 55%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const techStack = [
    { icon: Code2, label: "React & Next.js" },
    { icon: Terminal, label: "Node & Express" },
    { icon: Layout, label: "Tailwind CSS" },
    { icon: Zap, label: "Framer Motion" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  const scrollToProducts = (e) => {
    e.preventDefault();
    const el =
      document.getElementById("products") ||
      document.getElementById("projects") ||
      document.getElementById("templates");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "products";
    }
  };

  return (
    <section
      id="about"
      className="relative w-full py-28 md:py-36 overflow-hidden flex justify-center items-center"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.26, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[520px] h-[520px] bg-primary/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-blue-500/15 rounded-full blur-[120px]"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Particle field sits above ambient, below content */}
      <div className="absolute inset-0 z-[1]">
        <ParticleField />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* ================= LEFT ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={item} className="flex items-center gap-3 mb-7">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[2px] bg-gradient-to-r from-primary to-blue-400"
            />
            <span className="text-primary font-mono text-sm tracking-[0.25em] uppercase">
              About Me
            </span>
          </motion.div>

          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl lg:text-[3.35rem] font-bold text-white mb-6 leading-[1.15]"
          >
            I got tired of{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">
                rewriting
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-primary to-blue-400 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>{" "}
            the same code.
            <br />
            <span className="text-white/90">So I built the shortcut.</span>
          </motion.h2>

          <motion.div
            variants={item}
            className="space-y-5 text-gray-400 text-lg leading-relaxed"
          >
            <p>
              Hi, I’m{" "}
              <span className="text-white font-semibold">Rahul</span> — a
              full-stack developer who got tired of rewriting the same{" "}
              <span className="text-white/90">authentication, checkout,</span>{" "}
              and <span className="text-white/90">dashboard logic</span> for
              every new project.
            </p>
            <p>
              After shipping{" "}
              <span className="text-primary font-semibold">
                12+ production apps
              </span>{" "}
              (from healthcare AI to e-commerce startups), one truth became
              impossible to ignore:
            </p>
          </motion.div>

          {/* Quote */}
          <motion.div
            variants={item}
            className="relative my-8 p-5 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-500" />
            <p className="text-white text-lg md:text-xl font-medium leading-snug pl-3">
              “The hardest part of launching a startup isn’t the idea —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                it’s surviving the setup phase.
              </span>
              ”
            </p>
          </motion.div>

          <motion.p
            variants={item}
            className="text-gray-400 text-lg leading-relaxed mb-10"
          >
            That’s why I created{" "}
            <strong className="text-white">Buy Your Project</strong>. I package
            the most complex, modern stacks into stunning, ready-to-use
            templates — so you can{" "}
            <span className="text-white font-medium">
              skip the boring setup and launch in days, not months.
            </span>
          </motion.p>

          {/* ── Mini Timeline ── */}
          <motion.div variants={item} className="relative mb-10 pl-2">
            {/* vertical line */}
            <div className="absolute left-[23px] top-3 bottom-3 w-px bg-gradient-to-b from-orange-400/50 via-amber-400/40 to-primary/60" />

            <div className="space-y-5">
              {timeline.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: 0.15 + i * 0.15,
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                  }}
                  whileHover={{ x: 4 }}
                  className="relative flex gap-4 group"
                >
                  {/* node */}
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.accent} border ${step.border} flex items-center justify-center backdrop-blur-sm shadow-lg`}
                    >
                      <step.icon size={18} className={step.iconColor} />
                    </motion.div>
                    {/* pulse ring on last step */}
                    {i === timeline.length - 1 && (
                      <span className="absolute inset-0 rounded-2xl border border-primary/40 animate-ping opacity-30" />
                    )}
                  </div>

                  {/* content card */}
                  <div
                    className={`flex-1 rounded-2xl border ${step.border} bg-white/[0.025] group-hover:bg-white/[0.05] p-4 transition-colors backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                        Chapter {step.year}
                      </span>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>
                    <h4 className="text-white font-semibold text-[15px] mb-1">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={item} className="grid grid-cols-2 gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -2 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-colors cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <tech.icon size={15} />
                </div>
                <span className="font-medium text-sm text-gray-300">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= RIGHT: 3D CARD ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, type: "spring" }}
          className="relative flex justify-center lg:justify-end"
          style={{ perspective: 1200 }}
        >
          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-2 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c0c12]/90 border border-white/10 backdrop-blur-md shadow-xl"
          >
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-xs text-gray-300 font-medium">
              Production Ready
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="absolute bottom-12 -left-6 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c0c12]/90 border border-white/10 backdrop-blur-md shadow-xl"
          >
            <Rocket size={14} className="text-primary" />
            <span className="text-xs text-gray-300 font-medium">
              Launch Faster
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute top-1/3 -right-4 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c0c12]/90 border border-white/10 backdrop-blur-md shadow-xl"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs text-gray-300 font-medium">
              Premium UI
            </span>
          </motion.div>

          <div className="absolute -inset-6 bg-gradient-to-br from-primary/25 via-blue-500/15 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-60 -z-10" />
          <div className="absolute top-10 -right-6 w-[95%] h-[95%] border border-white/10 rounded-3xl bg-[#050508]/40 -z-10 hidden sm:block" />

          {/* Main 3D Card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative z-20 w-full max-w-md bg-[#0a0a0f]/90 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* dynamic glare */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none z-0"
              style={{ background: glareBackground }}
            />

            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/25 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/15 rounded-full blur-3xl -z-10" />

            {/* Avatar */}
            <div
              className="relative flex items-center gap-4 mb-8"
              style={{ transform: "translateZ(40px)" }}
            >
              <motion.div
                animate={
                  hovered
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(99,140,255,0.45)",
                          "0 0 0 14px rgba(99,140,255,0)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.2, repeat: Infinity }}
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/40"
              >
                RD
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0a0a0f]" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Rahul Developer
                </h3>
                <p className="text-primary text-sm font-mono mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Full Stack Engineer
                </p>
              </div>
            </div>

            {/* Stats */}
            <div
              className="relative space-y-3"
              style={{ transform: "translateZ(30px)" }}
            >
              {[
                {
                  label: "Projects Shipped",
                  value: "12+",
                  color: "text-white",
                },
                {
                  label: "Code Quality",
                  value: "100%",
                  color: "text-emerald-400",
                },
                {
                  label: "Client Satisfaction",
                  value: "5.0 ★",
                  color: "text-amber-400",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 flex justify-between items-center hover:border-white/20 transition-colors"
                >
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span
                    className={`${stat.color} font-bold text-xl tracking-tight`}
                  >
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA → products section */}
            <motion.a
              href="#products"
              onClick={scrollToProducts}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative mt-6 flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/10 border border-primary/25 cursor-pointer group no-underline"
              style={{ transform: "translateZ(50px)" }}
            >
              <div>
                <p className="text-white text-sm font-semibold">
                  Ready to skip setup?
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Browse templates →
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.a>

            {/* shine sweep */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-12"
                animate={{ x: ["-100%", "350%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
