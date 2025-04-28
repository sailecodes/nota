import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";

export default async function UnauthenticatedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  return (
    <main className="flex flex-col min-h-screen max-w-7xl px-10 mx-auto">
      <nav className="flex items-center justify-between gap-5 py-5 mt-2">
        <Link
          href="/"
          className="flex-1 text-3xl font-bold">
          Nota
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
          {!user && (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ size: "lg", variant: "ghost" })}>
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({ size: "lg" })}>
                Get started
              </Link>
            </>
          )}
          {user && (
            <Link
              href="/dashboard"
              className={buttonVariants({ size: "lg" })}>
              View dashboard
            </Link>
          )}
        </div>
      </nav>
      {children}
      <footer className="flex justify-between py-20 mt-auto">
        <div className="max-w-[350px]">
          <p className="text-3xl font-bold mb-4">Nota</p>
          <p className="text-muted-foreground text-sm">
            AI Platform with a mission to deliver structured, actionable meeting summaries to
            everyone.
          </p>
        </div>
      </footer>
      <aside className="text-muted-foreground text-center text-xs py-5">
        © 2025 Elias IV Roman. All rights reserved.
      </aside>
    </main>
  );
}
