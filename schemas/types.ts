export interface GeminiSummaryResponse {
  summary: string;
  actionItems: ActionItem[];
}

export interface ActionItem {
  action: string;
  assignee?: string;
  dueDate?: string;
}
