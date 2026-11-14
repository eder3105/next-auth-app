import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FiArrowRight, FiDatabase, FiKey, FiLock, FiShield, FiCheck } from 'react-icons/fi';
import AuthIllustration from '@/components/AuthIllustration';

const FEATURES = [
  {
    icon: FaGoogle,
    title: 'Login con Google',
    text: 'Inicia sesión en un clic con tu cuenta de Google mediante OAuth 2.0.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: FaGithub,
    title: 'Login con GitHub',
    text: 'Ideal para desarrolladores: accede con tu cuenta de GitHub.',
    color: 'from-slate-600 to-slate-800',
  },
  {
    icon: FiKey,
    title: 'Correo y contraseña',
    text: 'Registro propio con contraseñas cifradas usando bcrypt (10 rondas de salt).',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    icon: FiLock,
    title: 'Bloqueo por intentos',
    text: 'Tras 3 intentos fallidos la cuenta se bloquea 5 minutos para frenar ataques.',
    color: 'from-amber-500 to-red-500',
  },
  {
    icon: FiShield,
    title: 'Rutas protegidas',
    text: 'El dashboard y el perfil solo son accesibles con una sesión válida (JWT).',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: FiDatabase,
    title: 'MongoDB Atlas',
    text: 'Los usuarios registrados se guardan en una base de datos en la nube.',
    color: 'from-cyan-500 to-blue-600',
  },
];

const STEPS = [
  { n: '01', title: 'Crea tu cuenta', text: 'Regístrate con tu correo o usa Google / GitHub.' },
  { n: '02', title: 'Inicia sesión', text: 'NextAuth valida tus datos y crea una sesión segura.' },
  { n: '03', title: 'Accede al dashboard', text: 'Entra a tus páginas protegidas y a tu perfil.' },
];

const GLASS = 'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const loggedIn = !!session?.user;

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-indigo-200 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              NextAuth · Next.js 16 · MongoDB
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Autenticación{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                segura y moderna
              </span>{' '}
              para tu aplicación
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Inicia sesión con Google, GitHub o con tu correo. Contraseñas cifradas, bloqueo ante intentos
              sospechosos y rutas protegidas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {loggedIn ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:opacity-90"
                >
                  Ir a mi dashboard <FiArrowRight />
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:opacity-90"
                  >
                    Comenzar gratis <FiArrowRight />
                  </Link>
                  <Link
                    href="/signIn"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                  >
                    Ya tengo cuenta
                  </Link>
                </>
              )}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
              {['Cifrado con bcrypt', 'Sesiones JWT', 'OAuth 2.0'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <FiCheck className="text-emerald-400" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="px-8 sm:px-12">
            <AuthIllustration />
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-fuchsia-300">Funcionalidades</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Todo lo que necesitas para autenticar usuarios
            </h2>
            <p className="mt-4 text-slate-400">
              Implementado con NextAuth.js, proveedores OAuth y una base de datos en la nube.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text, color }) => (
              <div
                key={title}
                className={`${GLASS} group p-6 transition hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-fuchsia-500/10`}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">¿Cómo funciona?</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map(({ n, title, text }) => (
              <div key={n} className={`${GLASS} p-6`}>
                <span className="bg-gradient-to-br from-indigo-300 to-fuchsia-400 bg-clip-text text-5xl font-extrabold text-transparent">
                  {n}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-slate-400">{text}</p>
              </div>
            ))}
          </div>

          {!loggedIn && (
            <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/80 via-violet-600/80 to-fuchsia-600/80 px-6 py-12 text-center text-white shadow-2xl shadow-fuchsia-500/20 sm:px-12">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-2xl" />
              <h2 className="relative text-3xl font-bold">¿Listo para empezar?</h2>
              <p className="relative mt-3 text-indigo-100">Crea tu cuenta en segundos y prueba el sistema de autenticación.</p>
              <Link
                href="/register"
                className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
              >
                Crear mi cuenta <FiArrowRight />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
