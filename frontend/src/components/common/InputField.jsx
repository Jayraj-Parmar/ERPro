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
        {label && <label htmlFor={props.id}>{label}</label>}
        <div className="flex border-2 items-center rounded-lg border-gray-200 py-2 px-1">
          {iconStart && (
            <span className="ps-2 text-gray-500 text-lg">{iconStart}</span>
          )}
          <input
            type={type}
            className={`outline-0 w-full px-3 ${className}`}
            {...props}
          />
          {iconEnd && (
            <span className="pe-2 text-gray-500 text-lg">{iconEnd}</span>
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
