import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export default function UnauthenticatedLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="px-10 py-5">
      <nav className="flex items-center">
        <h1 className="text-4xl font-bold mr-5">Nota</h1>
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
      <footer></footer>
    </main>
  );
}
