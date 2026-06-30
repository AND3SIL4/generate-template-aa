import { bestPracticesContent } from "@/lib/docs/best-practices";
import { technicalDocsContent } from "@/lib/docs/techical-docs";
import { userGuideContent } from "@/lib/docs/userguide-docs";
import { Book, ChevronRight, Code, Lightbulb, Search } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Documentation</h2>
          <p className="text-muted-foreground">
            Everything you need to create professional bot templates
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="user-guide" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-none lg:flex">
          <TabsTrigger value="user-guide" className="gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">User Guide</span>
            <span className="sm:hidden">Guide</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="gap-2">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Technical Docs</span>
            <span className="sm:hidden">Technical</span>
          </TabsTrigger>
          <TabsTrigger value="best-practices" className="gap-2">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Best Practices</span>
            <span className="sm:hidden">Practices</span>
          </TabsTrigger>
        </TabsList>

        {/* User Guide Tab */}
        <TabsContent value="user-guide" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {userGuideContent.map((section) => (
              <Card
                key={section.id}
                className="group border-border/50 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <section.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {section.sections.length} topics
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/50">
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <Accordion type="single" collapsible className="w-full">
                  {userGuideContent.map((category) => (
                    <div
                      key={category.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <div className="flex items-center gap-3 bg-muted/30 px-6 py-3">
                        <category.icon className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{category.title}</span>
                      </div>
                      {category.sections.map((section, idx) => (
                        <AccordionItem
                          key={idx}
                          value={`${category.id}-${idx}`}
                          className="border-0"
                        >
                          <AccordionTrigger className="cursor-pointer px-6 py-3 hover:bg-primary/50 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              <span>{section.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="rounded-lg bg-muted/30 p-4">
                              <p className="whitespace-pre-line text-sm text-muted-foreground">
                                {section.content}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </div>
                  ))}
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Docs Tab */}
        <TabsContent value="technical" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {technicalDocsContent.map((section) => (
              <Card
                key={section.id}
                className="group border-border/50 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground transition-colors group-hover:bg-accent">
                      <section.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {section.sections.length} sections
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/50">
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <Accordion type="single" collapsible className="w-full">
                  {technicalDocsContent.map((category) => (
                    <div
                      key={category.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <div className="flex items-center gap-3 bg-muted/30 px-6 py-3">
                        <category.icon className="h-4 w-4 text-accent" />
                        <span className="font-semibold">{category.title}</span>
                      </div>
                      {category.sections.map((section, idx) => (
                        <AccordionItem
                          key={idx}
                          value={`${category.id}-${idx}`}
                          className="border-0"
                        >
                          <AccordionTrigger className="cursor-pointer px-6 py-3 hover:bg-primary/50 hover:no-underline">
                            <div className="flex items-center gap-2">
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              <span>{section.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="rounded-lg bg-card p-4 font-mono text-sm">
                              <pre className="whitespace-pre-wrap text-muted-foreground">
                                {section.content}
                              </pre>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </div>
                  ))}
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Best Practices Tab */}
        <TabsContent value="best-practices" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {bestPracticesContent.map((category) => (
              <Card
                key={category.id}
                className="border-border/50 transition-all hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {category.title}
                      </CardTitle>
                      <CardDescription>
                        {category.items.length} guidelines
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Badge
                          variant="outline"
                          className="mt-0.5 h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-xs"
                        >
                          {idx + 1}
                        </Badge>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Documentation;
