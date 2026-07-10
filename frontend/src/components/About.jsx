import { motion } from "framer-motion";
import { Terminal, Code2, Zap, Layout } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative w-full py-24 overflow-hidden flex justify-center items-center">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-primary" />
            <span className="text-primary font-mono text-sm tracking-widest uppercase">About Me</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            I build so you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">launch fast.</span>
          </h2>
          
          <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
            <p>
              Hi, I’m Rahul — a full-stack developer obsessed with performance, clean code, and premium design. After building dozens of production-ready applications, I realized the hardest part of a startup isn't the idea—it's the setup.
            </p>
            <p>
              I created <strong>Buy Your Project</strong> to take the most complex, modern tech stacks and package them into stunning, ready-to-use templates. Every project here is handcrafted to help you skip the boring setup phase.
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { icon: Code2, label: "React & Next.js" },
              { icon: Terminal, label: "Node & Express" },
              { icon: Layout, label: "Tailwind CSS" },
              { icon: Zap, label: "Framer Motion" },
            ].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  <tech.icon size={16} />
                </div>
                <span className="font-medium text-sm">{tech.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Visual/Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Main Card */}
          <div className="relative z-20 bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/30">
                RD
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Rahul Developer</h3>
                <p className="text-primary text-sm font-mono mt-1">Full Stack Engineer</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                <span className="text-gray-400">Projects Shipped</span>
                <span className="text-white font-bold text-xl">12+</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                <span className="text-gray-400">Code Quality</span>
                <span className="text-emerald-400 font-bold text-xl">100%</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                <span className="text-gray-400">Client Satisfaction</span>
                <span className="text-amber-400 font-bold text-xl">5.0 ★</span>
              </div>
            </div>
          </div>
          
          {/* Decorative outline card behind */}
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-[2.5rem] -z-10 blur-xl opacity-50" />
          <div className="absolute top-8 -right-8 w-full h-full border border-white/10 rounded-3xl -z-10 bg-[#050508]/50 hidden sm:block" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
