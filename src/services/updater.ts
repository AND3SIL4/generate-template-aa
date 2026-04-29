import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

// Check for updates
export async function checkUpdate(onError) {
  try {
    const update = await check();
    return update || null;
  } catch (error) {
    console.error('Error checking for updates', error);
    onError?.(error);
    return null;
  }
}

// Download + install with progress callback
export async function downloadAndInstall(onProgress, onComplete, onError) {
  try {
    const update = await check();
    if (!update) {
      onComplete?.();
      return;
    }

    let downloaded = 0;
    let total = 0;

    await update.downloadAndInstall((event) => {
      if (event.event === 'Started') {
        total = event.data.contentLength || 0;
        onProgress?.({ percent: 0, downloaded: 0, total });
      }

      if (event.event === 'Progress') {
        downloaded += event.data.chunkLength;
        const percent = total > 0 ? Math.round((downloaded / total) * 100) : 0;
        onProgress?.({ percent, downloaded, total });
      }

      if (event.event === 'Finished') {
        onComplete?.();
      }
    });
  } catch (error) {
    console.error('Error during download/install', error);
    onError?.(error);
  }
}

export async function forceRelaunch() {
  try {
    await relaunch();
  } catch (error) {
    console.error('Error relaunching app', error);
  }
}
