import { MdOutlineErrorOutline } from "react-icons/md";
function InputField({
  label,
  id,
  type,
  className,
  iconStart,
  iconEnd,
  error,
  ...props
}) {
  return (
    <>
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <div className="flex border-2 items-center rounded-lg border-gray-200 py-2 px-1">
          {iconStart && (
            <span className="ps-2 text-gray-500 text-lg">{iconStart}</span>
          )}
          <input
            id={id}
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
            <MdOutlineErrorOutline className="me-1 text-lg" /> <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default InputField;
