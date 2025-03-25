import NavLinks from "@/components/home/nav-links";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

import Link from "next/link";
import { ReactNode } from "react";

export default function UnauthenticatedLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex flex-col min-h-screen max-w-7xl px-10 mx-auto">
      <nav className="flex items-center justify-between gap-5 py-5 mt-2">
        <Link
          href="/"
          className="flex-1 text-3xl font-bold">
          Nota
        </Link>
        <NavLinks />
        <div className="flex flex-1 items-center justify-end gap-2">
          <Link
            href="/login"
            className={buttonVariants({ size: "lg", variant: "ghost" })}>
            Log in
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({ size: "lg", className: "mr-5" })}>
            Get started
          </Link>
          <ModeToggle />
        </div>
      </nav>
      {children}
      <footer className="flex justify-between py-20 mt-auto">
        <div>
          <p className="text-5xl font-bold mb-5">Nota</p>
          <p className="text-muted-foreground">
            AI Platform for enthusiasts, teams, and enterprises.
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold">Want to connect?</p>
          {/* TODO: Implement connect feature with a form */}
        </div>
      </footer>
      <aside className="text-muted-foreground text-center py-5">© 2025 Elias IV Roman</aside>
    </main>
  );
}
