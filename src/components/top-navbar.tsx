import { cn } from "@/lib/utils";
import MaterialIcon from "./material-icon";
import { JSX } from "react";
import { BotIcon, HistoryIcon, LightbulbIcon, LucideLibraryBig } from "lucide-react";

// Create interface and type of the params passed in this component
type View = "generator" | "docs" | "history";

interface NavbarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

// Create the dynamic content of the navbar
const menuItems: { id: View; label: string; icon: JSX.Element }[] = [
  { id: "generator", label: "Generator", icon: <BotIcon /> },
  { id: "docs", label: "Documentation", icon: <LucideLibraryBig /> },
  { id: "history", label: "Historical", icon: <HistoryIcon /> },
];

const Navbar = ({ activeView, setActiveView }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-1 border border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Branding section in navbar */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <MaterialIcon icon={<LightbulbIcon />} filled className="text-[22px]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight">Byaas</span>
            <span className="text-xs text-muted-foreground">
              Bot Template Studio
            </span>
          </div>
        </div>
        {/* Main navbar section */}
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card p-1 md:flex">
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <MaterialIcon
                  icon={item.icon}
                  filled={isActive}
                  className="text-[20px]"
                />{" "}
                {item.label}
              </button>
            );
          })}
        </nav>
        {/* Status pill */}
        <div
          className="hidden items-center gap-2 rounded-full border border-border
        bg-card px-3 py-1.5 text-xs text-muted-foreground md:flex"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          Active
        </div>
      </div>
    </header>
  );
};

export default Navbar;
