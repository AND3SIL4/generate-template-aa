import { ExternalLink, FileText, Zap } from "lucide-react";

export const userGuideContent = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    sections: [
      {
        title: "What is BYAAS?",
        content:
          "BYAAS (Build Your Template Scaffold) is a template generator for Automation Anywhere bots. It creates standardized folder structures and boilerplate code following best practices, saving you hours of setup time.",
      },
      {
        title: "Creating Your First Template",
        content:
          "1. Enter a project name that describes your bot's purpose\n2. Select the customer/client this bot is for\n3. Add phases to structure your bot's workflow\n4. Click Generate to download your template\n5. Import the .zip file into your Control Room",
      },
      {
        title: "Understanding Phases",
        content:
          "Phases represent different modules or stages in your bot workflow. Common phases include:\n- Initialization: Setup variables, open applications\n- Processing: Main business logic\n- Validation: Data verification\n- Cleanup: Close applications, generate reports",
      },
    ],
  },
  {
    id: "features",
    title: "Features Overview",
    icon: FileText,
    sections: [
      {
        title: "Template Generation",
        content:
          "Generate complete bot templates with proper folder structure, including subfolders for tasks, variables, error handling, and documentation. And finally update records in database which sotored a historical",
      },
      {
        title: "Phase Management",
        content:
          "Add, remove, and confirm phases to match your workflow. Each phase creates a dedicated subfolder with appropriate boilerplate code.",
      },
      {
        title: "Customer Profiles",
        content:
          "Different customers may have different naming conventions, specific tasks or requirements. Select the appropriate customer to apply their specific configurations.",
      },
    ],
  },
  {
    id: "importing",
    title: "Importing to Control Room",
    icon: ExternalLink,
    sections: [
      {
        title: "Import Process",
        content:
          "1. Log into your Automation Anywhere Control Room\n2. Navigate to Bots > My Bots\n3. Click Import and select the generated .zip file\n4. Choose the destination folder\n5. Click Import to complete",
      },
      {
        title: "Post-Import Steps",
        content:
          "After importing, review the generated structure and customize:\n- Update variable values for your environment\n- Configure credentials in the Credential Vault\n- Modify error handling as needed\n- Update logging paths\n- Update packages before start working",
      },
    ],
  },
];
