import { z } from "zod";
import { actionItemSchema, geminiResponseSchema } from "./zodSchemas";

export type GeminiResponse = z.infer<typeof geminiResponseSchema>;

export type ActionItem = z.infer<typeof actionItemSchema>;

export type ProcessStatus = "TRANSCRIBING" | "SUMMARIZING" | "COMPLETED" | "FAILED";

export type DueStatus = "NEW" | "UPCOMING" | "DUE_SOON" | "COMPLETED" | "OVERDUE" | "NO_DUE_DATE";
