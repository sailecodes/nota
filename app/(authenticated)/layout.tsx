import { ReactNode } from "react";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
