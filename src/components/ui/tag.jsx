function Tag({ text }) {
  return (
    <code
      className="
                inline-flex items-center
                rounded-md bg-slate-100
                px-1.5 py-0.5 text-xs font-mono
                text-slate-800 border border-slate-200
            "
    >
      {text}
    </code>
  );
}

export default Tag;
