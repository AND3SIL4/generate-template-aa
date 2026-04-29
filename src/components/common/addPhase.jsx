import { useState } from 'react';

function AddPhase({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleConfirm = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
    setOpen(false);
  };

  const handleCancel = () => {
    setValue('');
    setOpen(false);
  };

  return (
    <div className="w-full">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 cursor-pointer
                    text-sm text-blue-600 hover:text-blue-700 
                    hover:bg-blue-100 p-2 rounded-md"
        >
          <span className="text-lg leading-none">+</span>
          Add phase
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleConfirm();
              if (e.key === 'Escape') handleCancel();
            }}
            placeholder="Phase name"
            className="flex-1 appearance-none bg-transparent
                        border-0 border-b-2 border-gray-300 text-muted
                        outline-none focus:border-blue-500 max-w-72"
          />

          <button
            type="button"
            onClick={handleConfirm}
            className="text-green-300 hover:text-green-700
                        cursor-pointer"
          >
            ✓
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="text-red-300 hover:text-red-600 
                        cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default AddPhase;
