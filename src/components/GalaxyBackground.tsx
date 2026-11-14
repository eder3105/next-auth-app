// Fondo tipo galaxia: manchas de color animadas, cuadrícula y estrellas.
// Las estrellas tienen posiciones fijas (no aleatorias) para que el servidor y el navegador coincidan.
const STARS = Array.from({ length: 50 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 61 + 7) % 100,
  size: i % 3 === 0 ? 3 : 2,
  delay: (i % 10) * 0.35,
}));

export default function GalaxyBackground({ className = 'absolute inset-0' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden bg-slate-950 ${className}`}>
      <div className="animate-blob absolute -left-20 -top-20 h-[28rem] w-[28rem] rounded-full bg-indigo-600/40 blur-3xl" />
      <div
        className="animate-blob absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/30 blur-3xl"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="animate-blob absolute -bottom-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl"
        style={{ animationDelay: '-9s' }}
      />
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {STARS.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  );
}
