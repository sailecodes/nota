import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type MeetingStatus = "Processing" | "Completed" | "Failed";

export function getMeetingStatusBadgeColor(status: MeetingStatus) {
  if (status === "Processing") return "bg-yellow-100 text-yellow-800";
  else if (status === "Completed") return "bg-green-100 text-green-800";
  else return "bg-red-100 text-red-800";
}

export type ActionItemStatus = "New" | "Upcoming" | "Due soon" | "Overdue" | "Completed";

export function getActionItemStatusBadgeColor(status: ActionItemStatus) {
  if (status === "New") return "text-teal-800 bg-teal-100";
  else if (status === "Upcoming") return "text-indigo-800 bg-indigo-100";
  else if (status === "Due soon") return "text-orange-800 bg-orange-100";
  else if (status === "Overdue") return "text-red-800 bg-red-100";
  else if (status === "Completed") return "text-green-800 bg-green-100";
  else return "text-gray-800 bg-gray-100";
}

export function getActionItemCardAccentColor(status: ActionItemStatus) {
  if (status === "New") return "bg-teal-300";
  else if (status === "Upcoming") return "bg-indigo-300";
  else if (status === "Due soon") return "bg-orange-300";
  else if (status === "Overdue") return "bg-red-300";
  else if (status === "Completed") return "bg-green-300";
  else return "bg-gray-300";
}
