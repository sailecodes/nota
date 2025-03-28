import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusBadgeColor(status: string) {
  if (status === "Processing") return "bg-yellow-100 text-yellow-800";
  else if (status === "Completed") return "bg-green-100 text-green-800";
  else return "bg-red-100 text-red-800";
}
