// En Next.js 16 "middleware.ts" pasó a llamarse "proxy.ts" (misma función).
// withAuth redirige a /signIn si el usuario no tiene sesión.
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/signIn" },
});

export const config = { matcher: ["/dashboard", "/profile"] };
