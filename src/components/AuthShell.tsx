import { FiLock, FiShield, FiZap } from 'react-icons/fi';
import Logo from './Logo';
import AuthIllustration from './AuthIllustration';
import GalaxyBackground from './GalaxyBackground';

const FEATURES = [
  { icon: FiShield, text: 'Google y GitHub' },
  { icon: FiLock, text: 'Cifrado bcrypt' },
  { icon: FiZap, text: 'Anti fuerza bruta' },
];

// Diseño a dos columnas para las páginas de login y registro
export default function AuthShell({
  title,
  subtitle,
  heading = 'Tu cuenta, protegida en cada inicio de sesión.',
  children,
}: {
  title: string;
  subtitle: string;
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel ilustrado (solo en pantallas grandes) */}
      <aside className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <GalaxyBackground />

        <div className="relative">
          <Logo light />
        </div>

        <div className="relative px-6">
          <AuthIllustration />
        </div>

        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight xl:text-4xl">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-fuchsia-300 bg-clip-text text-transparent">
              {heading}
            </span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-indigo-200/80">
            Autenticación moderna con NextAuth, sesiones JWT y usuarios guardados en MongoDB Atlas.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {FEATURES.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-indigo-100 backdrop-blur"
              >
                <Icon className="h-3.5 w-3.5 text-fuchsia-300" /> {text}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Formulario */}
      <main className="relative flex items-center justify-center overflow-hidden bg-white px-4 py-12 sm:px-8">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-200/60 to-fuchsia-200/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-100/70 to-indigo-100/70 blur-3xl" />
        <div className="relative w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-2 text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
