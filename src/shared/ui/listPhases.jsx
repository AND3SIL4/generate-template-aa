function PhaseList({ fases, onRemove }) {
    if (!fases.length) return null;

    return (
        <div className="w-full">
            <p className="mb-2 tracking-wide text-muted">Phases added</p>
            <div className="flex flex-wrap gap-2">
                {fases.map((fase, index) => (
                    <div
                        key={`${fase}-${index}`}
                        className="group flex items-center justify-between gap-2
                            rounded-full bg-slate-300 px-3 py-1.5 text-sm
                            shadow-sm transition hover:shadow-md min-w-36
                            cursor-pointer"
                    >
                        <span>{fase}</span>
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="opacity-0 group-hover:opacity-100 
                            text-slate-400 hover:text-red-500 transition
                            cursor-pointer"
                            aria-label={`Remove ${fase}`}
                        >✕</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PhaseList;
