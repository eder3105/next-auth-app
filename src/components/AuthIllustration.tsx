import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiCheck, FiKey, FiLock } from 'react-icons/fi';
import { IoFingerPrint } from 'react-icons/io5';

// Burbujas que orbitan alrededor del escudo (posiciones en % sobre el círculo)
const ORBIT = [
  { x: 50, y: 12, delay: '0s', el: <FcGoogle className="h-7 w-7" />, bg: 'bg-white' },
  { x: 88, y: 50, delay: '1.2s', el: <FaGithub className="h-7 w-7 text-white" />, bg: 'bg-slate-900 ring-white/20' },
  { x: 50, y: 88, delay: '2.4s', el: <IoFingerPrint className="h-7 w-7 text-cyan-300" />, bg: 'bg-cyan-500/20' },
  { x: 12, y: 50, delay: '3.6s', el: <FiKey className="h-6 w-6 text-amber-300" />, bg: 'bg-amber-500/20' },
];

// Ilustración animada del panel izquierdo de login / registro
export default function AuthIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px]">
      {/* Halo de luz */}
      <div className="animate-glow absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 blur-3xl" />

      {/* Anillos que giran */}
      <svg viewBox="0 0 400 400" className="animate-spin-slow absolute inset-0 h-full w-full">
        <circle cx="200" cy="200" r="150" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 10" />
        <circle cx="200" cy="200" r="190" fill="none" stroke="url(#ring)" strokeWidth="1" strokeDasharray="60 30" />
        <circle cx="200" cy="10" r="4" fill="#22d3ee" />
        <circle cx="390" cy="200" r="3" fill="#e879f9" />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e879f9" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      <svg viewBox="0 0 400 400" className="animate-spin-reverse absolute inset-0 h-full w-full">
        <circle cx="200" cy="200" r="105" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="305" cy="200" r="3" fill="#a5b4fc" />
      </svg>

      {/* Escudo con candado */}
      <div className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-float drop-shadow-[0_20px_40px_rgba(168,85,247,0.55)]">
          <svg viewBox="0 0 200 220" className="h-auto w-full">
            <defs>
              <linearGradient id="shield" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#c084fc" />
                <stop offset="0.5" stopColor="#6366f1" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
              <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="white" stopOpacity="0.45" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M100 8 L182 40 V104 C182 160 147 196 100 214 C53 196 18 160 18 104 V40 Z" fill="url(#shield)" />
            <path d="M100 22 L168 49 V104 C168 151 139 182 100 198 C61 182 32 151 32 104 V49 Z" fill="#1e1b4b" fillOpacity="0.55" />
            <path d="M100 8 L182 40 V80 C140 70 60 90 18 120 V40 Z" fill="url(#shine)" />
            <path d="M78 100 V84 a22 22 0 0 1 44 0 V100" fill="none" stroke="white" strokeWidth="11" strokeLinecap="round" />
            <rect x="66" y="98" width="68" height="56" rx="12" fill="white" />
            <circle cx="100" cy="120" r="8" fill="#6366f1" />
            <rect x="96" y="122" width="8" height="18" rx="4" fill="#6366f1" />
          </svg>
        </div>
      </div>

      {/* Burbujas en órbita */}
      {ORBIT.map(({ x, y, delay, el, bg }) => (
        <div key={`${x}-${y}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <div
            className={`animate-float flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl ring-1 ring-white/30 backdrop-blur-md ${bg}`}
            style={{ animationDelay: delay }}
          >
            {el}
          </div>
        </div>
      ))}

      {/* Tarjetas flotantes */}
      <div className="absolute -left-6 top-[3%]">
        <div className="animate-float flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2 shadow-2xl backdrop-blur-md" style={{ animationDelay: '0.6s' }}>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
            <FiCheck className="h-4 w-4" strokeWidth={3} />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-white">Sesión iniciada</p>
            <p className="text-[10px] text-indigo-200">hace 2 segundos</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-8 top-[16%]">
        <div className="animate-float flex items-center gap-2 rounded-xl border border-red-300/30 bg-red-500/15 px-3 py-2 shadow-2xl backdrop-blur-md" style={{ animationDelay: '1.8s' }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
          </span>
          <p className="text-xs font-medium text-red-100">3 intentos → bloqueo 5 min</p>
        </div>
      </div>

      <div className="absolute -right-6 bottom-[4%]">
        <div className="animate-float rounded-xl border border-white/20 bg-slate-950/60 px-3 py-2 shadow-2xl backdrop-blur-md" style={{ animationDelay: '2.8s' }}>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-fuchsia-300">
            <FiLock className="h-3 w-3" /> bcrypt
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-cyan-200">$2b$10$N9qo8uLOick…</p>
        </div>
      </div>

      <div className="absolute -left-4 bottom-[12%]">
        <div className="animate-float rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white shadow-xl backdrop-blur-md" style={{ animationDelay: '3.2s' }}>
          🔐 JWT · OAuth 2.0
        </div>
      </div>
    </div>
  );
}
