import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Provider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalaxyBackground from "@/components/GalaxyBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyAuthApp · Autenticación con NextAuth",
  description: "Login con Google, GitHub y credenciales usando NextAuth y MongoDB Atlas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          {/* Fondo galaxia fijo detrás de todas las páginas */}
          <GalaxyBackground className="fixed inset-0 -z-10" />
          <div className="flex min-h-screen flex-col">
            <Navbar user={session?.user ?? null} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
