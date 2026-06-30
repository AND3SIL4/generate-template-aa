import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockHistory } from "@/lib/history";
import { HistoryItem } from "@/lib/interfaces/history-interface";
import {
  ArrowDownCircleIcon,
  Clock,
  FolderOpen,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AutomationAnywhereIcon from "./icons/automation-anywhere-icon";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const TemplateHistory = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);

  const filteredHistory = history.filter((item) => {
    const machesSearch = item.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return machesSearch;
  });

  const redownload = () => {
    toast.info("Template ready to use", {
      icon: null,
      description: (
        <div className="flex items-center gap-1">
          <FolderOpen className="h-4 w-4 text-shadow-green-700" />
          <span>Template download successfully, check your folder!</span>
        </div>
      ),
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Template Generator History ({history.length.toString()})
          </h2>
          <p className="text-muted-foreground">
            View and manage our previously generated templates
          </p>
        </div>
      </div>

      {/* Filters section */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search old templates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Clock />
            <h3 className="mt-4 text-lg font-semibold">No templates found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {history.length === 0
                ? "Generated templates will appear here"
                : "Try adjusting your search values"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <Card
              key={item.id}
              className="px-5 group border-border/50 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <AutomationAnywhereIcon />
                {/* Template information history */}
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="truncate font-semibold">{item.projectName}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{item.customer}</Badge>
                    <Badge variant="outline">
                      {item.phases} phase{item.phases !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                    <Clock className="h-3 w-3" />
                    Generated At{" "}
                    {item.generatedAt
                      ? new Date(item.generatedAt).toLocaleString()
                      : "Unknown time"}
                  </span>
                </div>

                {/* Downloading old template action */}
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => redownload()}
                    className="hidden sm:flex"
                  >
                    <ArrowDownCircleIcon />
                    Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default TemplateHistory;
