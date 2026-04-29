function ProgressStatusBar({ progress, message, showPercentage = true }) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-80 max-w-full">
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-linear-to-r from-blue-500 to-green-500 rounded-full
                       transition-all duration-300 ease-out
                       shadow-lg shadow-purple-500/50"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      <div className="flex text-slate-300 text-xs mt-2 font-medium justify-between">
        {message && <span>{message}</span>}{' '}
        {showPercentage && <span>{clampedProgress}%</span>}
      </div>
    </div>
  );
}

export default ProgressStatusBar;
