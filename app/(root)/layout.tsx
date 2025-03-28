import NavLinks from "@/components/home/nav-links";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

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
        <div className="flex flex-1 items-center justify-end">
          <SignedOut>
            <div className="flex items-center gap-2 mr-7">
              <SignInButton>
                <Button
                  size="lg"
                  variant="ghost"
                  className="cursor-pointer">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  size="lg"
                  className="cursor-pointer">
                  Get started
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard/overview"
              className={buttonVariants({ size: "lg", className: "mr-4" })}>
              View dashboard
            </Link>
          </SignedIn>
          <ModeToggle />
        </div>
      </nav>
      {children}
      <footer className="flex justify-between py-20 mt-auto">
        <div className="max-w-[350px]">
          <p className="text-3xl font-bold mb-4">Nota</p>
          <p className="text-muted-foreground text-sm">
            AI Platform with a mission to deliver structured, actionable meeting summaries to everyone.
          </p>
        </div>
      </footer>
      <aside className="text-muted-foreground text-center text-xs py-5">
        © 2025 Elias IV Roman. All rights reserved.
      </aside>
    </main>
  );
}
