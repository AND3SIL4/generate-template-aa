import HomePage from "./pages/home-page";
import "./styles/global.css"
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster richColors position="bottom-center" closeButton />
      <HomePage />
    </>
  )
}


export default App;