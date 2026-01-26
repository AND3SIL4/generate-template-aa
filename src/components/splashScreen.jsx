import logo from "@images/logo-netapp.png";
import { useEffect, useState } from "react";
import ProgressStatusBar from "../shared/ui/progress";


const STAGES = [
    { message: "Starting application", delay: 80, progress: 30 },
    { message: "Loading dependencies", delay: 100, progress: 60 },
    { message: "Getting things ready", delay: 120, progress: 100 }
]

function SplashScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fadeOut, setFadeOut] = useState(false);

    // Configure the splash screen when using effect
    useEffect(() => {
        let currentStage = 0;

        const loadNextStage = () => {
            if (currentStage < STAGES.length) {
                const stage = STAGES[currentStage];
                setProgress(stage.progress);
                setMessage(stage.message);
                currentStage++;
                setTimeout(loadNextStage, stage.delay); // Load the next stage
            } else {
                setTimeout(() => {
                    setFadeOut(true);
                    onComplete(); // Change to the main page
                }, 1000);
            }
        }
        loadNextStage();
    }, [onComplete])

    return (
        <div className={`h-screen flex justify-center items-center flex-col gap-2 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <img src={logo} alt="Logo Net Applications" className=" w-96" />
            <p className="text-slate-400 animate-pulse">BYAAS (Build Your Automation Anywhere Scaffold)</p>
            <ProgressStatusBar progress={progress} message={message} />
        </div >
    )
}


export default SplashScreen;