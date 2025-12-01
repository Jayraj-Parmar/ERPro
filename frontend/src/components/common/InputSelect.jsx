import { TbAlertCircle } from "react-icons/tb";
function InputSelect({
  label,
  type,
  className = "",
  iconStart,
  iconEnd,
  error,
  options = [],
  ...props
}) {
  return (
    <>
      <div>
        {label && (
          <label className="mb-1.5 block" htmlFor={props.id}>
            {label}
          </label>
        )}
        <div className="flex border-1 items-center rounded-md border-gray-300 bg-white">
          <div className="border-r-1 border-gray-300 py-1.5 px-3 w-3/5">
            {iconStart && (
              <span className="text-gray-500 text-lg pe-2">{iconStart}</span>
            )}
            <input
              type={type}
              className={`outline-0 w-full ${className}`}
              min={props.min}
              {...props}
            />
            {iconEnd && (
              <span className="ps-2 text-gray-500 text-lg">{iconEnd}</span>
            )}
          </div>
          <div className="py-1.5 px-1.5 w-2/5">
            <select className="outline-0 w-full" name="" id="">
              {options.map((op) => (
                <option key={op} value={op}>
                  {op.charAt(0).toUpperCase() + op.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && (
          <div className="flex items-center text-red-500 mt-1">
            <TbAlertCircle size={16} className="me-1" /> <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default InputSelect;
