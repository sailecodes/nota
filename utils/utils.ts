import { DueStatus, ProcessStatus } from "@/schemas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMeetingStatusBadgeColor(status: ProcessStatus) {
  if (status === "TRANSCRIBING") return "bg-violet-100 text-violet-800";
  else if (status === "SUMMARIZING") return "bg-blue-100 text-blue-800";
  else if (status === "EXTRACTING") return "bg-cyan-100 text-cyan-800";
  else if (status === "COMPLETED") return "bg-green-100 text-green-800";
  else if (status === "FAILED") return "bg-red-100 text-red-800";
  else return "bg-gray-100 text-gray-800";
}

export function getMeetingSkeletonColor(status: ProcessStatus) {
  if (status === "TRANSCRIBING") return "bg-violet-200/50";
  else if (status === "SUMMARIZING") return "bg-blue-200/50";
  else if (status === "EXTRACTING") return "bg-cyan-200/50";
  else return "bg-gray-200/50";
}

export function getUploader(firstName: string, lastName: string) {
  return firstName + " " + lastName.charAt(0) + ".";
}

export function getDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getActionItemStatusBadgeColor(status: DueStatus) {
  if (status === "NEW") return "text-teal-800 bg-teal-100";
  else if (status === "UPCOMING") return "text-violet-800 bg-violet-100";
  else if (status === "DUE_SOON") return "text-orange-800 bg-orange-100";
  else if (status === "COMPLETED") return "text-green-800 bg-green-100";
  else if (status === "OVERDUE") return "text-red-800 bg-red-100";
  else if (status === "NO_DUE_DATE") return "text-stone-800 bg-stone-100";
  else return "text-gray-800 bg-gray-100";
}

export function getActionItemCardAccentColor(status: DueStatus) {
  if (status === "NEW") return "bg-teal-300";
  else if (status === "UPCOMING") return "bg-violet-300";
  else if (status === "DUE_SOON") return "bg-orange-300";
  else if (status === "COMPLETED") return "bg-green-300";
  else if (status === "OVERDUE") return "bg-red-300";
  else if (status === "NO_DUE_DATE") return "bg-stone-300";
  else return "bg-gray-300";
}
