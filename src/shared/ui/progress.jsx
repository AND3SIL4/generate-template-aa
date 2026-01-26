function ProgressStatusBar({
    progress,
    message,
    showPercentage = true,
    className = ""
}) {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className={`w-80 max-w-full ${className}`}>
            {/* Barra */}
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full
                       transition-all duration-300 ease-out
                       shadow-lg shadow-purple-500/50"
                    style={{ width: `${clampedProgress}%` }}
                />
            </div>

            {message && (
                <p className="text-slate-300 text-sm mt-4 font-medium">
                    {message}
                </p>
            )}

            {showPercentage && (
                <p className="text-slate-400 text-xs mt-2">
                    {clampedProgress}%
                </p>
            )}
        </div>
    );
}

export default ProgressStatusBar;