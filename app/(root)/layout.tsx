import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export default function UnauthenticatedLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex flex-col h-screen px-10">
      <nav className="flex items-center py-5">
        <p className="text-4xl font-bold mr-5">Nota</p>
        <div className="grow">
          <Link href="/#pricing">Pricing</Link>
        </div>
        <div className="flex gap-2">
          <Button className="cursor-pointer">Login</Button>
          <Button
            variant="secondary"
            className="cursor-pointer">
            Signup
          </Button>
        </div>
      </nav>
      {children}
      <footer className="flex justify-between py-20 mt-auto">
        <div>
          <p className="text-5xl font-bold mb-2">Nota</p>
          <p className="">AI Platform for blah blah blah</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Want to connect?</p>
          {/* TODO: Implement connect feature with a form */}
        </div>
      </footer>
      <aside className="text-center py-5">© 2025 Elias IV Roman</aside>
    </main>
  );
}
