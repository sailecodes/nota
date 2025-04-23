import { DueStatus, ProcessStatus } from "@/app/generated/prisma";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@/app/generated/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMeetingStatusBadgeColor(status: ProcessStatus) {
  if (status === "TRANSCRIBING") return "bg-violet-100 text-violet-800";
  else if (status === "SUMMARIZING") return "bg-blue-100 text-blue-800";
  else if (status === "COMPLETED") return "bg-green-100 text-green-800";
  else if (status === "FAILED") return "bg-red-100 text-red-800";
  else return "bg-gray-100 text-gray-800";
}

export function getMeetingSkeletonColor(status: ProcessStatus) {
  if (status === "TRANSCRIBING") return "bg-violet-200/50";
  else if (status === "SUMMARIZING") return "bg-blue-200/50";
  else return "bg-gray-200/50";
}

export function parseName(firstName: string, lastName: string) {
  return firstName + " " + lastName.charAt(0) + ".";
}

export function getDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function parseActionItemDueStatus(dueStatus: DueStatus) {
  return dueStatus
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
