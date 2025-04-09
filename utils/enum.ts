// ===
// === Prisma Schema
// ===

export enum ProcessingStatus {
  TRANSCRIBING,
  SUMMARIZING,
  EXTRACTING,
  COMPLETED,
  FAILED,
}

export enum DueStatus {
  TBD,
  NEW,
  UPCOMING,
  DUE_SOON,
  COMPLETED,
  OVERDUE,
}
