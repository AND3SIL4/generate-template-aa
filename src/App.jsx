import "./App.css";
import { useEffect, useState } from "react";
import { check } from "@tauri-apps/plugin-updater"
import SplashScreen from "./components/splashScreen";
import ScaffoldForm from "./components/scaffoldForm";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }


  // useEffect(() => {
  //   async function runUpdaterCheck() {
  //     try {
  //       const update = await check()
  //       if (update) {
  //         console.log(
  //           `Found a new version ${update.version} from ${update.date} with notes ${update.body}`
  //         );

  //         await update.downloadAndInstall((event) => {
  //           switch (event) {
  //             case "Started":
  //               contentLength = event.data.contentLength;
  //               console.log(`Started downloading ${contentLength} bytes`);
  //               break;
  //             case "Progress":
  //               downloaded += event.data.chunkLenght;
  //               console.log(`Downloaded ${downloaded} from ${contentLength}`);
  //               break;
  //             case "Finished":
  //               console.log("Download finished");
  //               break;
  //             default:
  //               break;
  //           }
  //         })

  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   runUpdaterCheck()
  // }, [])


  return (
    <ScaffoldForm />
  )
}


export default App;