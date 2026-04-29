import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import './App.css';
import ScaffoldForm from './components/scaffoldForm';
import SplashScreen from './components/splashScreen';
import {
  checkUpdate,
  downloadAndInstall,
  forceRelaunch,
} from './services/updater';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function initCheck() {
      const update = await checkUpdate((error) => {
        toast.error('Could not check for updates', {
          description: error?.message || 'Please try again later',
        });
      });

      setUpdateInfo(update);

      if (update) {
        toast.info(`New version available: v${update.version}`, {
          id: 'update-available',
          duration: Infinity,
          action: {
            label: 'Download and install',
            onClick: startDownload,
          },
        });
      }
    }

    initCheck();
  }, []);

  const startDownload = () => {
    toast.dismiss('update-available');
    setIsDownloading(true);
    setProgress(0);

    const toastId = toast.loading('Downloading update... 0%');

    downloadAndInstall(
      // onProgress
      ({ percent }) => {
        setProgress(percent);
        toast.loading(`Downloading update... ${percent}%`, { id: toastId });
      },
      // onComplete
      () => {
        toast.success('Update installed', {
          description: 'Restarting in 3 seconds...',
          duration: 4000,
        });
        setTimeout(forceRelaunch, 3000);
      },
      // onError
      (error) => {
        toast.error('Update failed', {
          description: error?.message || 'Please try again later',
        });
        setIsDownloading(false);
      },
    );
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (isDownloading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <h2>Installing update</h2>
        <div
          style={{
            width: '320px',
            height: '24px',
            background: '#333',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#0ea5e9',
              transition: 'width 0.25s ease-out',
            }}
          />
        </div>
        <p>{progress}% – Please wait</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <ScaffoldForm />
    </div>
  );
}

export default App;
