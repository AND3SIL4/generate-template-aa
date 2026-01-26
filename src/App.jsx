import "./App.css";
import { useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater"


function App() {
  useEffect(() => {
    async function runUpdaterCheck() {
      try {
        const update = await check()
        if (update) {
          console.log(
            `Found a new version ${update.version} from ${update.date} with notes ${update.body}`
          );

          await update.downloadAndInstall((event) => {
            switch (event) {
              case "Started":
                contentLength = event.data.contentLength;
                console.log(`Started downloading ${contentLength} bytes`);
                break;
              case "Progress":
                downloaded += event.data.chunkLenght;
                console.log(`Downloaded ${downloaded} from ${contentLength}`);
                break;
              case "Finished":
                console.log("Download finished");
                break;
              default:
                break;
            }
          })

        }
      } catch (error) {
        console.error(error);
      }
    }

    runUpdaterCheck()
  }, [])


  return (
    <h1 className="text-yellow-600">Byaas project v0.1.2</h1>
  )
}


export default App;