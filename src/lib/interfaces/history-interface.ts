export interface HistoryItem {
  id: string;
  projectName: string;
  customer: string;
  phases: number;
  generatedAt: string; // ISO string, e.g., "2024-06-08T14:23:11.134Z"
}
