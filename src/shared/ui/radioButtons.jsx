function RadioButtons({ items, val, name, onChange }) {
    return (
        <div className="flex gap-5 w-full p-2">
            {items.map(({ id, value, label }) => (
                <div className="flex gap-1" key={id}>
                    <input
                        className="cursor-pointer"
                        type="radio"
                        name={name}
                        id={id}
                        value={value}
                        onChange={onChange}
                        checked={val === value}
                    />
                    <label className="flex cursor-pointer justify-center text-muted" htmlFor={id}>{label}</label>
                </div>
            ))}
        </div>
    )
}

export default RadioButtons;