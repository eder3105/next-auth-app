import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Avatar from '@/components/Avatar';
import { providerInfo } from '@/components/providers';
import { FiArrowRight, FiCheckCircle, FiClock, FiKey, FiLogIn, FiShield, FiUser } from 'react-icons/fi';

const SECURITY = [
  'Inicio de sesión con Google (OAuth 2.0)',
  'Inicio de sesión con GitHub (OAuth 2.0)',
  'Registro con contraseña cifrada (bcrypt)',
  'Bloqueo de 5 minutos tras 3 intentos fallidos',
  'Rutas /dashboard y /profile protegidas',
  'Usuarios almacenados en MongoDB Atlas',
];

const GLASS = 'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const provider = providerInfo(user?.provider);
  const firstName = user?.name?.split(' ')[0] ?? 'usuario';
  const expires = session?.expiresAt
    ? new Date(session.expiresAt * 1000).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
    : '—';

  const stats = [
    { icon: FiLogIn, label: 'Método de acceso', value: provider.label, color: 'from-indigo-500 to-violet-600' },
    { icon: FiCheckCircle, label: 'Estado de la sesión', value: 'Activa', color: 'from-emerald-500 to-teal-600' },
    { icon: FiClock, label: 'La sesión expira el', value: expires, color: 'from-amber-500 to-orange-600' },
    { icon: FiKey, label: 'Tipo de sesión', value: 'JWT', color: 'from-fuchsia-500 to-pink-600' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Bienvenida */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/70 via-violet-600/60 to-fuchsia-600/60 p-8 text-white shadow-2xl shadow-fuchsia-500/20 backdrop-blur-md sm:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-cyan-400/25 blur-2xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <Avatar name={user?.name} image={user?.image} size={72} className="ring-4 ring-white/30" />
            <div>
              <p className="text-sm font-medium text-indigo-200">Dashboard</p>
              <h1 className="text-3xl font-bold sm:text-4xl">¡Hola, {firstName}!</h1>
              <p className="mt-1 text-indigo-100">Has iniciado sesión correctamente. Bienvenido a tu panel.</p>
            </div>
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-white px-5 py-2.5 font-semibold text-indigo-700 shadow-md transition hover:bg-indigo-50 sm:self-center"
          >
            Ver mi perfil <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className={`${GLASS} p-5 transition hover:border-white/20 hover:bg-white/10`}>
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-sm text-slate-400">{label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Seguridad */}
        <div className={`${GLASS} p-6 lg:col-span-2`}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <FiShield className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-white">Seguridad de la aplicación</h2>
              <p className="text-sm text-slate-400">Funciones implementadas en este laboratorio</p>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SECURITY.map((item) => (
              <li key={item} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-slate-200">
                <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Cuenta */}
        <div className={`${GLASS} p-6`}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              <FiUser className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold text-white">Tu cuenta</h2>
          </div>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-slate-400">Nombre</dt>
              <dd className="mt-0.5 font-medium text-white">{user?.name ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Correo</dt>
              <dd className="mt-0.5 break-all font-medium text-white">{user?.email ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Proveedor</dt>
              <dd className="mt-1">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${provider.badge}`}>
                  {provider.label}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
