import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { findUserByEmail, updateUser, MAX_ATTEMPTS, LOCK_TIME_MS } from "./users";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Ingresa tu correo y contraseña");
        }

        const user = await findUserByEmail(credentials.email);
        if (!user) throw new Error("Credenciales inválidas");

        // ¿La cuenta está bloqueada?
        if (user.lockUntil && user.lockUntil > Date.now()) {
          const min = Math.ceil((user.lockUntil - Date.now()) / 60000);
          throw new Error(`Cuenta bloqueada por demasiados intentos. Intenta en ${min} minuto(s)`);
        }

        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) {
          const attempts = user.failedAttempts + 1;
          if (attempts >= MAX_ATTEMPTS) {
            await updateUser(user.id, { failedAttempts: 0, lockUntil: Date.now() + LOCK_TIME_MS });
            throw new Error(
              `Cuenta bloqueada por ${LOCK_TIME_MS / 60000} minutos tras ${MAX_ATTEMPTS} intentos fallidos`
            );
          }
          await updateUser(user.id, { failedAttempts: attempts, lockUntil: null });
          throw new Error(`Contraseña incorrecta. Te quedan ${MAX_ATTEMPTS - attempts} intento(s)`);
        }

        // Login correcto: se reinicia el contador
        await updateUser(user.id, { failedAttempts: 0, lockUntil: null });
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    // Guarda el proveedor usado (google, github o credentials) para mostrarlo en la interfaz
    async jwt({ token, account }) {
      if (account) token.provider = account.provider;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.provider = token.provider;
      // En componentes de servidor NextAuth no envía "expires", así que se toma del JWT
      if (typeof token.exp === "number") session.expiresAt = token.exp;
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/signIn" },
  secret: process.env.NEXTAUTH_SECRET,
};
