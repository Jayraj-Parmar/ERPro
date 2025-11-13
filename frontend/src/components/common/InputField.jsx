import { TbAlertCircle } from "react-icons/tb";
function InputField({
  label,
  type,
  className = "",
  iconStart,
  iconEnd,
  error,
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
        <div className="flex border-1 items-center rounded-md border-gray-300 bg-white py-1.5 px-3">
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
        {error && (
          <div className="flex items-center text-red-500 mt-1">
            <TbAlertCircle size={16} className="me-1" /> <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default InputField;
