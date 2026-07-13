import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Code2,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Zap,
  Database,
  Terminal,
  Cpu,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

// ─────────────────────────────────────────────
// Floating neon orbs (background)
// ─────────────────────────────────────────────
const ORBS = [
  { Icon: Code2, top: "12%", left: "8%", accent: "#60a5fa", size: 52, delay: 0 },
  { Icon: Terminal, top: "18%", right: "10%", accent: "#4ade80", size: 48, delay: 0.3 },
  { Icon: Database, bottom: "20%", left: "6%", accent: "#c084fc", size: 50, delay: 0.6 },
  { Icon: Cpu, bottom: "16%", right: "8%", accent: "#f472b6", size: 46, delay: 0.9 },
  { Icon: Shield, top: "45%", left: "3%", accent: "#22d3ee", size: 44, delay: 1.1 },
  { Icon: Zap, top: "50%", right: "4%", accent: "#fbbf24", size: 48, delay: 1.3 },
];

const TechOrb = ({
  Icon,
  top,
  left,
  right,
  bottom,
  accent,
  size,
  delay,
}) => (
  <motion.div
    className="absolute hidden md:flex items-center justify-center rounded-full pointer-events-none"
    style={{
      top,
      left,
      right,
      bottom,
      width: size,
      height: size,
      background: `radial-gradient(circle at 32% 28%, ${accent}55, ${accent}18 55%, transparent 72%)`,
      border: `1px solid ${accent}50`,
      boxShadow: `0 0 20px ${accent}40, inset 0 0 12px ${accent}25`,
    }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{
      opacity: 0.9,
      scale: 1,
      y: [-8, 8, -8],
    }}
    transition={{
      opacity: { duration: 0.8, delay },
      scale: { duration: 0.8, delay },
      y: {
        duration: 4.5 + delay * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    }}
  >
    <Icon
      size={Math.round(size * 0.4)}
      strokeWidth={1.5}
      style={{
        color: accent,
        filter: `drop-shadow(0 0 8px ${accent})`,
      }}
    />
  </motion.div>
);

// ─────────────────────────────────────────────
// Input field
// ─────────────────────────────────────────────
const Field = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = true,
  rightSlot,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-1.5"
      >
        {label}
      </label>
      <div
        className="relative group rounded-xl transition-all duration-300"
        style={{
          boxShadow: focused
            ? "0 0 0 1px rgba(59,130,246,0.55), 0 0 24px rgba(59,130,246,0.2)"
            : "0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none"
          size={17}
          style={{ color: focused ? "#60a5fa" : "#6b7280" }}
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-[#050508]/90 border-0 rounded-xl py-3 pl-11 pr-11 text-white text-sm placeholder:text-gray-600 focus:outline-none transition-colors"
          autoComplete={
            type === "password"
              ? "current-password"
              : type === "email"
              ? "email"
              : "name"
          }
        />
        {rightSlot}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Password Strength Helper
// ─────────────────────────────────────────────
const getPasswordStrength = (pass) => {
  if (!pass) return { score: 0, label: '', color: 'bg-gray-600/50' };
  let score = 0;
  if (pass.length >= 8) score += 1;
  if (/[A-Z]/.test(pass)) score += 1;
  if (/[0-9]/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;
  
  switch(score) {
    case 0:
    case 1: return { score, label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
    case 2: return { score, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
    case 3: return { score, label: 'Good', color: 'bg-blue-400', text: 'text-blue-400' };
    case 4: return { score, label: 'Strong', color: 'bg-emerald-400', text: 'text-emerald-400' };
    default: return { score: 0, label: '', color: 'bg-gray-600/50', text: 'text-gray-500' };
  }
};

// ─────────────────────────────────────────────
// Login page
// ─────────────────────────────────────────────
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password } : { name, email, password };
      
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Save token to localStorage (optional)
        localStorage.setItem('token', data.token);
        navigate("/");
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin((v) => !v);
    setName("");
    setError("");
  };
  
  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-[90vh] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[640px] h-[360px] rounded-full opacity-30 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.55) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[5%] left-[10%] w-[300px] h-[300px] rounded-full opacity-20 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[35%] right-[8%] w-[260px] h-[260px] rounded-full opacity-15 blur-[70px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid fade */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 15%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 15%, transparent 70%)",
        }}
      />

      {/* Floating tech orbs */}
      {ORBS.map((orb, i) => (
        <TechOrb key={i} {...orb} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Outer glow bloom */}
        <div
          className="absolute -inset-4 rounded-[32px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />

        {/* Glass card */}
        <div
          className="relative bg-[#0a0a10]/85 backdrop-blur-2xl border border-white/[0.09] rounded-3xl overflow-hidden"
          style={{
            boxShadow:
              "0 0 0 1px rgba(59,130,246,0.08), 0 25px 50px -12px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.08)",
          }}
        >
          {/* Top neon edge */}
          <div
            className="absolute top-0 left-0 right-0 h-px z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)",
              boxShadow: "0 0 12px rgba(59,130,246,0.6)",
            }}
          />

          {/* Soft gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/5 pointer-events-none" />

          <div className="relative z-10 p-8 md:p-9">
            {/* Header */}
            <div className="text-center mb-8">
              {!isForgotPassword ? (
                <Link
                  to="/"
                  className="inline-flex items-center justify-center relative mb-5 group"
                >
                  <span
                    className="absolute inset-0 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(59,130,246,0.5), transparent 70%)",
                    }}
                  />
                  <span
                    className="relative flex items-center justify-center w-14 h-14 rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-transform group-hover:scale-105"
                    style={{
                      boxShadow:
                        "0 0 24px rgba(59,130,246,0.3), inset 0 0 12px rgba(59,130,246,0.1)",
                    }}
                  >
                    <Code2 size={28} strokeWidth={1.75} />
                  </span>
                </Link>
              ) : (
                <div className="inline-flex items-center justify-center relative mb-5">
                  <span className="relative flex items-center justify-center w-14 h-14 rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                    <Lock size={28} strokeWidth={1.75} />
                  </span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {isForgotPassword ? (
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                      Reset Password
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-[280px] mx-auto">
                      Enter your email and we'll send you instructions to reset your password.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={isLogin ? "login" : "signup"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.16em] font-semibold text-primary border border-primary/25 bg-primary/10 mb-3">
                      <Sparkles size={12} />
                      {isLogin ? "Member access" : "Join the stack"}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                      {isLogin ? "Welcome back" : "Create account"}
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-[280px] mx-auto">
                      {isLogin
                        ? "Enter your details to access your dashboard."
                        : "Sign up to purchase premium templates."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form */}
            {!resetSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="popLayout" initial={false}>
                  {!isLogin && !isForgotPassword && (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <Field
                        id="name"
                        label="Full Name"
                        value={name}
                        onChange={setName}
                        placeholder="Rahul Developer"
                        icon={User}
                        required={!isLogin}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="hello@example.com"
                  icon={Mail}
                />

                <AnimatePresence mode="popLayout">
                  {!isForgotPassword && (
                    <motion.div
                      key="password-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1">
                        <div className="flex justify-between items-center mb-1.5">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                          >
                            Password
                          </label>
                          {isLogin && (
                            <Link
                              to="/forgot-password"
                              className="text-xs text-primary hover:text-blue-400 transition-colors"
                            >
                              Forgot password?
                            </Link>
                          )}
                        </div>
                        <Field
                          id="password"
                          label=""
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={setPassword}
                          placeholder="••••••••"
                          icon={Lock}
                          rightSlot={
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                              tabIndex={-1}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          }
                        />
                        
                        {/* Password Strength Indicator (Only on Signup) */}
                        {!isLogin && password.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 flex flex-col gap-1.5"
                          >
                            <div className="flex gap-1.5 h-1.5">
                              {[1, 2, 3, 4].map((level) => (
                                <div 
                                  key={level} 
                                  className={`flex-1 rounded-full transition-colors duration-300 ${
                                    strength.score >= level ? strength.color : 'bg-gray-700/50'
                                  }`} 
                                />
                              ))}
                            </div>
                            <div className="flex justify-between items-center px-1">
                              <span className={`text-xs font-medium ${strength.text}`}>
                                {strength.label}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative flex items-center justify-center gap-2 bg-primary hover:bg-primaryHover text-white py-3.5 rounded-xl font-medium transition-all duration-300 overflow-hidden mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    boxShadow:
                      "0 0 28px rgba(59,130,246,0.4), 0 4px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {isForgotPassword ? "Send Reset Link" : isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
                <p className="text-gray-400 text-sm mb-6">
                  We've sent a password reset link to <br/>
                  <span className="text-white font-medium">{email}</span>
                </p>
                <button
                  onClick={() => {
                    setIsForgotPassword(false);
                    setResetSent(false);
                    setIsLogin(true);
                  }}
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 rounded-xl font-medium transition-colors"
                >
                  Back to login
                </button>
              </motion.div>
            )}

            {/* Social Logins & Toggles */}
            <AnimatePresence>
              {!isForgotPassword && !resetSent && (
                <motion.div
                  key="socials-and-toggle"
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {/* Divider */}
                  <div className="my-7 flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent flex-1" />
                    <span>or continue with</span>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent flex-1" />
                  </div>

                  {/* Google */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-white py-3 rounded-xl text-sm font-medium transition-all duration-300"
                  >
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" aria-hidden>
                      <path
                        fill="#EA4335"
                        d="M12 5.04c1.6 0 3.07.56 4.24 1.66l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.73 7.22 9.13 5.04 12 5.04z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.16c-.27 1.33-1.07 2.46-2.26 3.22l3.52 2.73C21.27 18.7 23 15.77 23 12.27z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09A6.97 6.97 0 0 1 5.45 12c0-.73.13-1.43.36-2.09L2.18 7.07A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.52-2.73c-.98.66-2.24 1.05-3.76 1.05-2.87 0-5.27-2.18-6.16-5.11l-3.66 2.84C3.99 20.53 7.7 23 12 23z"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  {/* Toggle mode */}
                  <p className="text-center text-sm text-gray-400 mt-7">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-primary font-semibold hover:text-blue-400 transition-colors underline-offset-2 hover:underline"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back to login from forgot password */}
            {isForgotPassword && !resetSent && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="inline-flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to login
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-gray-600 mt-5 flex items-center justify-center gap-1.5">
          <Shield size={12} className="text-gray-600" />
          Secured mock auth · Your data stays local for now
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
