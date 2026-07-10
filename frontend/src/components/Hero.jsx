import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Braces
} from 'lucide-react';

// CountUp Component
const CountUp = ({ to, duration = 1.2, delay = 0, isDecimal = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let timeoutId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeProgress * to);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    timeoutId = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [to, duration, delay]);

  return <span>{isDecimal ? count.toFixed(1) : Math.floor(count)}</span>;
};

const WORDS = ['days', 'hours', 'minutes'];

const FLOATING_ICONS = [
  { Icon: Code2, top: '10%', left: '5%', color: 'text-blue-400', size: 32, delay: 0 },
  { Icon: Terminal, top: '25%', right: '8%', color: 'text-green-400', size: 40, delay: 0.2 },
  { Icon: Box, top: '60%', left: '8%', color: 'text-purple-400', size: 36, delay: 0.4 },
  { Icon: Cloud, top: '75%', right: '10%', color: 'text-sky-400', size: 28, delay: 0.6 },
  { Icon: Database, top: '15%', right: '25%', color: 'text-orange-400', size: 34, delay: 0.8 },
  { Icon: Cpu, top: '80%', left: '25%', color: 'text-red-400', size: 38, delay: 1.0 },
  { Icon: Layers, top: '40%', left: '2%', color: 'text-yellow-400', size: 30, delay: 1.2 },
  { Icon: LayoutTemplate, top: '35%', right: '2%', color: 'text-pink-400', size: 36, delay: 1.4 },
  { Icon: Globe, top: '5%', left: '30%', color: 'text-indigo-400', size: 32, delay: 1.6 },
  { Icon: Command, top: '90%', right: '35%', color: 'text-emerald-400', size: 34, delay: 1.8 },
  { Icon: Activity, top: '50%', right: '15%', color: 'text-rose-400', size: 28, delay: 2.0 },
  { Icon: Zap, top: '85%', left: '12%', color: 'text-amber-400', size: 40, delay: 2.2 },
  { Icon: Braces, top: '12%', left: '18%', color: 'text-cyan-400', size: 32, delay: 2.4 },
];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full overflow-hidden py-14 md:py-20 flex justify-center items-center">
      
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto w-full h-full hidden md:block z-0">
        {FLOATING_ICONS.map((item, idx) => (
          <motion.div
            key={idx}
            className={`absolute flex items-center justify-center rounded-xl bg-white/5 border border-white/10 ${item.color} backdrop-blur-sm`}
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right,
              width: item.size + 16,
              height: item.size + 16
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-8, 8, -8],
              opacity: 1
            }}
            transition={{
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
              },
              opacity: { duration: 1, delay: item.delay }
            }}
          >
            <item.Icon size={item.size * 0.6} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      {/* Mobile Floating Background Icons (Subset) */}
      <div className="absolute inset-0 pointer-events-none w-full h-full block md:hidden z-0">
        {FLOATING_ICONS.slice(0, 4).map((item, idx) => (
          <motion.div
            key={`mobile-${idx}`}
            className={`absolute flex items-center justify-center rounded-xl bg-white/5 border border-white/10 ${item.color} backdrop-blur-sm`}
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right,
              width: item.size + 12,
              height: item.size + 12
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [-6, 6, -6],
              opacity: 1
            }}
            transition={{
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
              },
              opacity: { duration: 1, delay: item.delay }
            }}
          >
            <item.Icon size={item.size * 0.5} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[640px] mx-auto px-4 text-center flex flex-col items-center"
      >
        {/* Eyebrow Badge */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          <Sparkles size={16} />
          <span>12 templates shipped this month</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-medium text-white mb-6 leading-tight"
        >
          Ship your next project <br className="hidden sm:block" />
          <span className="text-gray-400">in </span>
          <span className="inline-flex relative w-[130px] md:w-[150px] justify-center text-primary font-bold">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute"
              >
                {WORDS[wordIndex]},
              </motion.span>
            </AnimatePresence>
            <span className="opacity-0">{WORDS[0]},</span> {/* Invisible spacer */}
          </span>
          <br className="hidden sm:block" />
          <span className="text-gray-400">not weeks</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-base text-gray-400 max-w-[420px] mb-8 leading-relaxed"
        >
          High-quality, ready-to-use project templates and applications built with modern web technologies to accelerate your development.
        </motion.p>

        {/* CTA Row */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto mb-12"
        >
          <a 
            href="#projects" 
            className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto text-center"
          >
            Browse projects
          </a>
          <a 
            href="#" 
            className="flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto"
          >
            <Play size={18} className="fill-white/80 text-white/80" />
            Watch demo
          </a>
        </motion.div>

        {/* Stat Row */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 w-full max-w-[420px]"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center backdrop-blur-sm">
            <span className="text-2xl md:text-3xl font-bold text-white">
              <CountUp to={45} delay={0.5} />
            </span>
            <span className="text-xs text-gray-500 mt-1">Templates</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center backdrop-blur-sm">
            <span className="text-2xl md:text-3xl font-bold text-white">
              <CountUp to={1250} delay={0.5} />+
            </span>
            <span className="text-xs text-gray-500 mt-1">Buyers</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center backdrop-blur-sm">
            <span className="text-2xl md:text-3xl font-bold text-white">
              <CountUp to={4.9} delay={0.5} isDecimal={true} />
            </span>
            <span className="text-xs text-gray-500 mt-1">Avg rating</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
