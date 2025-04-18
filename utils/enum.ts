// ===
// === Prisma Schema
// ===

export enum ProcessStatus {
  TRANSCRIBING = "TRANSCRIBING",
  SUMMARIZING = "SUMMARIZING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum DueStatus {
  TBD = "TBD",
  NEW = "NEW",
  UPCOMING = "UPCOMING",
  DUE_SOON = "DUE_SOON",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
}
