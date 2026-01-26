import { useEffect, useState } from "react";
import logo from "@images/logo-netapp.png"
import ProgressStatusBar from "../shared/ui/progress";

function SplashScreen({ onComplete }) {
    const [counter, setCounter] = useState(0);
    // Configure the splash screen when using effect
    useEffect(() => {
        setTimeout(() => {
            setCounter(prev => prev + 10);
        }, 1000)

    }, [onComplete, counter])

    return (
        <div className="h-screen flex justify-center items-center flex-col gap-4">
            <img src={logo} alt="Logo Net Applications" />
            <p>Powerded by AND3SIL4 at Net Applications</p>
            <ProgressStatusBar progress={counter} />
        </div>
    )
}


export default SplashScreen;