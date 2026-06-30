import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/top-navbar";
import TemplateGenerator from "@/components/template-generator";
import Documentation from "@/components/documentation";
import TemplateHistory from "@/components/template-history";

function HomePage() {
  // Manage the selected view in all the application
  const [activeView, setActiveView] = useState<"generator" | "docs" | "history">("generator");

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-4 md:p-6">
          {/* Configure and render the main components */}
          {activeView === "generator" && <TemplateGenerator />}
          {activeView === "docs" && <Documentation />}
          {activeView === "history" && <TemplateHistory />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage;