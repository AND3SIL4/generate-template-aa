import { Toaster } from "sonner";
import HomePage from "./pages/home-page";
import "./styles/global.css";

const App = () => {
  return (
    <>
      <Toaster richColors position="bottom-center" closeButton />
      <HomePage />
    </>
  );
};

export default App;