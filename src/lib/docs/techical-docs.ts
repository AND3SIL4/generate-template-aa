import { Code, Shield, Terminal } from "lucide-react";

export const technicalDocsContent = [
  {
    id: "architecture",
    title: "Template Architecture",
    icon: Code,
    sections: [
      {
        title: "Folder Structure",
        content: `ProjectName/
|___ Phase/
    ├── Main
    ├── Funciones
        |___ TaskPlantilla
    ├── Parametros
        |___ ConfigPlantilla
    └── Historias
        |___ TaskPlantilla`,
      },
      {
        title: "Naming Conventions",
        content:
          "- Tasks: PascalCase (e.g., ProcessInvoice.atmx)\n- Variables: camelCase with prefix (e.g., str_InputPath, int_Counter)\n- Subfolders: PascalCase matching phase names\n- Error handlers: ErrorHandler_[PhaseName].atmx",
      },
    ],
  },
  {
    id: "variables",
    title: "Variable Standards",
    icon: Terminal,
    sections: [
      {
        title: "Type Prefixes",
        content:
          "- str: String variables\n- int: Number/Integer variables\n- bool: Boolean variables\n- dict: Dictionary variables\n- list: List variables\n- dte: DateTime variables\n- rec: Record variables\n- tbl: Table variables",
      },
      {
        title: "Scope Guidelines",
        content:
          "Global Variables: Configuration, paths, credentials\nLocal Variables: Loop counters, temporary values\nInput Variables: Parameters passed between tasks\nOutput Variables: Return values from tasks",
      },
    ],
  },
  {
    id: "error-handling",
    title: "Error Handling",
    icon: Shield,
    sections: [
      {
        title: "Try-Catch Structure",
        content:
          "Every major operation should be wrapped in a try-catch block. The template includes:\n- Centralized error handler task\n- Error logging with timestamp and details\n- Graceful degradation options\n- Recovery procedures",
      },
      {
        title: "Logging Standards",
        content:
          "Log levels:\n- INFO: Normal operations\n- WARN: Non-critical issues\n- ERROR: Failures requiring attention\n- DEBUG: Detailed troubleshooting info\n\nAll logs include timestamp, task name, and relevant context.",
      },
    ],
  },
];
