'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiLock, FiMail } from 'react-icons/fi';
import AuthShell from '@/components/AuthShell';
import Field from '@/components/Field';

// useSearchParams necesita estar dentro de <Suspense>
export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mensaje de éxito cuando viene desde el registro (/signIn?registered=1)
  const registered = params.has('registered') && !dismissed;

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleGithubSignIn = async () => {
    await signIn('github', { callbackUrl: '/dashboard' });
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDismissed(true);
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok && !result.error) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setError(result?.error ?? 'Error al iniciar sesión');
    }
  };

  return (
    <AuthShell title="Iniciar sesión" subtitle="Bienvenido de nuevo. Ingresa a tu cuenta para continuar.">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-sm"
        >
          <FcGoogle className="h-5 w-5" />
          Google
        </button>
        <button
          onClick={handleGithubSignIn}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
        >
          <FaGithub className="h-5 w-5" />
          GitHub
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />o con tu correo<span className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleCredentialsSignIn} className="space-y-4">
        {registered && (
          <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
            Cuenta creada correctamente. Ya puedes iniciar sesión.
          </div>
        )}
        <Field
          label="Correo electrónico"
          icon={FiMail}
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Field
          label="Contraseña"
          icon={FiLock}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Ingresando...' : (
            <>
              Iniciar sesión <FiArrowRight />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Regístrate gratis
        </Link>
      </p>
    </AuthShell>
  );
}
