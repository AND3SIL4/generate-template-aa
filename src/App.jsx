import { useEffect, useState } from "react";
import { toast } from "sonner";
import "./App.css";
import ScaffoldForm from "./components/scaffoldForm";
import SplashScreen from "./components/splashScreen";
import { checkUpdate } from "./services/updater";


function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(true);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const updateAvailable = await checkUpdate();
        setHasUpdate(updateAvailable);
      } catch (error) {
        console.error("Error checking for updates", error);
      } finally {
        setIsCheckingUpdate(false);
      }
    }

    checkForUpdates();
  }, [])

  useEffect(() => {
    if (!isCheckingUpdate && hasUpdate) {
      toast.info(`There is an update available v${hasUpdate.version}`);
    }
  }, [hasUpdate, isCheckingUpdate])

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