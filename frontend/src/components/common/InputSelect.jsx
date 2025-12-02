function InputSelect({ label, error, options = [], className = "", ...props }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block" htmlFor={props.id}>
          {label}
        </label>
      )}

      <select
        className={`outline-0 w-full border border-gray-300 rounded-md bg-white px-3 py-2 ${className}`}
        {...props}
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </option>
        ))}
      </select>

      {error && (
        <div className="flex items-center text-red-500 mt-1 text-sm">
          <TbAlertCircle size={16} className="me-1" /> {error}
        </div>
      )}
    </div>
  );
}

export default InputSelect;
