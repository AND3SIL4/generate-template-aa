import { Code, Lightbulb, Shield, Zap } from "lucide-react";

export const bestPracticesContent = [
  {
    id: "design",
    title: "Design Principles",
    icon: Lightbulb,
    items: [
      "Modular Design: Break complex processes into reusable tasks",
      "Single Responsibility: Each task should do one thing well",
      "Fail Fast: Validate inputs early in the process",
      "Idempotency: Tasks should be safe to run multiple times",
      "Documentation: Comment complex logic and decision points",
    ],
  },
  {
    id: "performance",
    title: "Performance Tips",
    icon: Zap,
    items: [
      "Minimize screen scraping - use APIs when available",
      "Use bulk operations instead of row-by-row processing",
      "Cache frequently accessed data in variables",
      "Close applications and release resources promptly",
      "Use asynchronous operations where appropriate",
    ],
  },
  {
    id: "security",
    title: "Security Guidelines",
    icon: Shield,
    items: [
      "Never hardcode credentials - use Credential Vault",
      "Encrypt sensitive data in transit and at rest",
      "Implement proper access controls for bot runners",
      "Log security-relevant events for auditing",
      "Regularly rotate credentials and API keys",
    ],
  },
  {
    id: "maintenance",
    title: "Maintainability",
    icon: Code,
    items: [
      "Use meaningful names for all components",
      "Keep consistent formatting and structure",
      "Version control your bot code",
      "Create runbooks for common issues",
      "Document dependencies and prerequisites",
    ],
  },
];
