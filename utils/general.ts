import { DueStatus, ProcessStatus } from "@/app/generated/prisma";
import { ServerActionResult } from "@/schemas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function parseName(firstName: string | undefined, lastName: string | undefined) {
  return !firstName || !lastName ? "Unassigned" : firstName + " " + lastName.charAt(0) + ".";
}

export function getDate(date: Date | null) {
  return date
    ? date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "TBD";
}

export function parseStatus(dueStatus: DueStatus | ProcessStatus) {
  if (dueStatus === "TBD") return dueStatus;

  return dueStatus
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getActionItemDueStatusBadgeColor(status: DueStatus) {
  if (status === "NEW") return "text-teal-800 bg-teal-100";
  else if (status === "UPCOMING") return "text-violet-800 bg-violet-100";
  else if (status === "DUE_SOON") return "text-orange-800 bg-orange-100";
  else if (status === "COMPLETED") return "text-green-800 bg-green-100";
  else if (status === "OVERDUE") return "text-red-800 bg-red-100";
  else if (status === "TBD") return "text-stone-800 bg-stone-100";
  else return "text-gray-800 bg-gray-100";
}

export function getActionItemCardAccentColor(status: DueStatus) {
  if (status === "NEW") return "bg-teal-300";
  else if (status === "UPCOMING") return "bg-violet-300";
  else if (status === "DUE_SOON") return "bg-orange-300";
  else if (status === "COMPLETED") return "bg-green-300";
  else if (status === "OVERDUE") return "bg-red-300";
  else if (status === "TBD") return "bg-stone-300";
  else return "bg-gray-300";
}

export function createServerAction<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>
) {
  return async (...args: TArgs): Promise<ServerActionResult<TReturn>> => {
    try {
      const result = await fn(...args);
      return { success: true, data: result };
    } catch (err) {
      // FIXME: "instanceof Error" too generic
      const isServerActionError = err instanceof Error;
      const error = isServerActionError ? err.message : "Something went wrong. Please try again.";
      const source = isServerActionError ? "action" : "server";
      console.error("[Server action error] ", error);
      return {
        success: false,
        error,
        source,
      };
    }
  };
}

export async function customFetch<TData, TReturn>(
  url: string,
  data: TData,
  options?: RequestInit
): Promise<{ result: TReturn | null; status: boolean }> {
  try {
    const response = await fetch(
      url,
      options ?? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return { result, status: response.ok };
  } catch (err) {
    console.error("[Fetch error] ", err);
    return { result: null, status: false };
  }
}
