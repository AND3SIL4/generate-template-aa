import { customers, Phase } from "@/lib/template-generation";
import {
  CheckCircleIcon,
  Download,
  Package,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import Label from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";

const TemplateGenerator = () => {
  const [projectName, setProjectName] = useState("");
  const [customer, setCustomer] = useState("");
  const [phases, setPhases] = useState<Phase[]>([]);

  const isFormValid = projectName.trim() !== "" && customer.trim() !== "";

  const handleGenerate = () => {
    if (!isFormValid) return;

    const outputPath = "C:/Users/%userprofile%/Downloads/";

    // Retrieve a message after generate the template
    toast.success(
      <div className="flex gap-2 items-center">
        <CheckCircleIcon className="size-5" />
        Template Generated Successfully!
      </div>,
      {
        icon: null,
        description:
          "Your template is ready to import into Control Room. Click on the button to copy the output path",
        action: {
          label: "Copy",
          onClick: () => {
            navigator.clipboard.writeText(outputPath);
            toast.info(`Path '${outputPath}' copied to clipboard!`);
          },
        },
      },
    );

    // Clean up the form
    setProjectName("");
    setCustomer("");
    setPhases([]);
  };

  const addPhase = () => {
    const newPhase: Phase = {
      id: crypto.randomUUID(),
      name: "",
    };
    setPhases([...phases, newPhase]);
  };

  const updatePhase = (id: string, field: keyof Phase, value: string) => {
    setPhases(
      phases.map((phase) =>
        phase.id === id ? { ...phase, [field]: value } : phase,
      ),
    );
  };

  const removePhase = (id: string) => {
    setPhases(phases.filter((phase) => phase.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Hero section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-background p-6 md:p-8">
        <div className="urban-pattern absolute inset-0" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <Badge variant="secondary" className="font-mono text-xs">
              v3.0
            </Badge>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
            Generate Best Practice Templates
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Create production-ready{" "}
            <strong className="text-amber-600">Automation Anywhere</strong> bot
            templates with proper folder structure, error handling, and
            documentation. Simply fill out the form and get a{" "}
            <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-sm text-primary">
              .zip
            </code>{" "}
            file ready to import into your{" "}
            <strong className="text-amber-600">Control Room</strong>.
          </p>
        </div>
      </div>

      {/* Main form */}
      <Card className="border-border/50 shadow-lg">
        {/* Form header */}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Project Configuration
          </CardTitle>
          <CardDescription>
            Define your bot template settings and structure
          </CardDescription>
        </CardHeader>
        {/* Form main content */}
        <CardContent className="space-y-6">
          {/* Project name */}
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-sm font-medium">
              Project Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="projectName"
              placeholder="Enter the name of your project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="h-11 border-border/50 bg-background transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground">
              This will be used as the main folder name in your template
            </p>
          </div>

          {/* Customer Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Customer <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={customer}
              onValueChange={setCustomer}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {customers.map((c) => (
                <div key={c.id}>
                  <RadioGroupItem
                    value={c.id}
                    id={c.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={c.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-border/50 bg-card p-4 transition-all hover:bg-secondary/70 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <div className={`h-3 w-3 rounded-full ${c.color}`} />
                    <span className="font-medium">{c.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator className="my-6" />

          {/* Phases Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Template Phases</Label>
                <p className="text-xs text-muted-foreground">
                  Add modules to customize your template structure
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPhase}
                className="gap-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="h-4 w-4" />
                Add Phase
              </Button>
            </div>

            {phases.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 bg-muted/30 p-8 text-center">
                <Package className="h-10 w-10 text-muted-foreground/50" />
                <p className="mt-3 text-sm font-medium text-muted-foreground">
                  No phases added yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Click &quot;Add Phase&quot; to include modules in your
                  template
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {phases.map((phase, index) => (
                  <div
                    key={phase.id}
                    className="group relative rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          Phase {index + 1}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePhase(phase.id)}
                          className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Phase Name</Label>
                          <Input
                            placeholder="e.g., Data Extraction"
                            value={phase.name}
                            onChange={(e) =>
                              updatePhase(phase.id, "name", e.target.value)
                            }
                            className="h-9"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-6" />
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Card
        className={`border-2 transition-all ${isFormValid ? "border-primary/50 shadow-lg" : "border-border/50"}`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <h3 className="font-semibold">Ready to Generate?</h3>
              <p className="text-sm text-muted-foreground">
                {isFormValid
                  ? `Template "${projectName}" for ${customers.find((c) => c.id === customer)?.name} with ${phases.length} phase${phases.length !== 1 ? "s" : ""}`
                  : "Fill out the project name and select a customer to continue"}
              </p>
            </div>
            <Button
              size="lg"
              disabled={!isFormValid}
              onClick={handleGenerate}
              className="w-full gap-2 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Generate Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateGenerator;
