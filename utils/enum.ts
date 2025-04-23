// ===
// === Prisma Schema
// ===

export enum ESubscription {
  STARTER = "STARTER",
  TEAM = "TEAM",
  ORGANIZATION = "ORGANIZATION",
}

export enum ERoleType {
  MEMBER = "MEMBER",
  LEAD = "LEAD",
}

export enum EProcessStatus {
  TRANSCRIBING = "TRANSCRIBING",
  SUMMARIZING = "SUMMARIZING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum EDueStatus {
  TBD = "TBD",
  NEW = "NEW",
  UPCOMING = "UPCOMING",
  DUE_SOON = "DUE_SOON",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
}
