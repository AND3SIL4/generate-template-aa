function Input({ type = 'text', placeholder, onChange, value }) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full
                appearance-none
                bg-transparent
                border-0
                border-b-2
                border-gray-300
                outline-none
                focus:border-blue-500
                focus:ring-0
                transition-colors
                duration-200
                p-2
            "
    />
  );
}

export default Input;
