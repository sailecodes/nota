import { z } from "zod";
import { actionItemSchema, geminiResponseSchema } from "./zodSchemas";

export type GeminiResponseType = z.infer<typeof geminiResponseSchema>;

export type ActionItemType = z.infer<typeof actionItemSchema>;

export type ServerActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; source: "action" | "server" };
