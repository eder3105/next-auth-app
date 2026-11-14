import "next-auth";
import "next-auth/jwt";

// Se agrega "provider" para saber con qué método inició sesión el usuario
declare module "next-auth" {
  interface Session {
    expiresAt?: number; // fecha de vencimiento del JWT (segundos)
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
  }
}
