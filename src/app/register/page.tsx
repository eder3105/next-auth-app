'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiAlertCircle, FiArrowRight, FiLock, FiMail, FiUser } from 'react-icons/fi';
import AuthShell from '@/components/AuthShell';
import Field from '@/components/Field';

// Nivel de seguridad de la contraseña (0 a 4)
function strength(pw: string) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const LEVELS = [
  { label: 'Muy débil', color: 'bg-red-500' },
  { label: 'Débil', color: 'bg-orange-500' },
  { label: 'Aceptable', color: 'bg-amber-500' },
  { label: 'Buena', color: 'bg-lime-500' },
  { label: 'Fuerte', color: 'bg-emerald-500' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    setLoading(false);

    if (res.ok) {
      router.push('/signIn?registered=1');
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'No se pudo registrar');
    }
  };

  const level = strength(form.password);

  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle="Regístrate en segundos. Tu contraseña se guarda cifrada con bcrypt."
      heading="Únete y protege tu cuenta desde el primer día."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Nombre completo"
          icon={FiUser}
          name="name"
          placeholder="Juan Pérez"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
        <Field
          label="Correo electrónico"
          icon={FiMail}
          name="email"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <div>
          <Field
            label="Contraseña"
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
          />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition ${i < level ? LEVELS[level].color : 'bg-slate-200'}`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-500">Seguridad: {LEVELS[level].label}</p>
            </div>
          )}
        </div>
        <Field
          label="Confirmar contraseña"
          icon={FiLock}
          name="confirm"
          type="password"
          placeholder="Repite tu contraseña"
          value={form.confirm}
          onChange={handleChange}
          required
          autoComplete="new-password"
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
          {loading ? 'Creando cuenta...' : (
            <>
              Crear cuenta <FiArrowRight />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{' '}
        <Link href="/signIn" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Inicia sesión
        </Link>
      </p>
    </AuthShell>
  );
}
