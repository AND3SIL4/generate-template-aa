import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/top-navbar";

function HomePage() {
  // Manage the selecte view in all the application
  const [activeView, setActiveView] = useState<"generator" | "docs" | "history">("generator");

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto">
        main
      </main>
      <Footer />
    </div>
  )
}

export default HomePage;