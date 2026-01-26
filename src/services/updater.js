import { check } from "@tauri-apps/plugin-updater";

// Function to check for update
export async function checkUpdate() {
    return await check();
}