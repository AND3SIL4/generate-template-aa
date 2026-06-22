import { HistoryItem } from "@/lib/interfaces/history-interface";

export const mockHistory: HistoryItem[] = [
  {
    id: "1",
    projectName: "Invoice_Processing_Bot",
    customer: "Keralty",
    phases: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    projectName: "Employee_Onboarding",
    customer: "General Customer",
    phases: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    projectName: "Data_Migration_Tool",
    customer: "Enterprise",
    phases: 6,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "4",
    projectName: "Report_Generator",
    customer: "Keralty",
    phases: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: "5",
    projectName: "Email_Automation",
    customer: "General Customer",
    phases: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
  },
];
