import { MdOutlineErrorOutline } from "react-icons/md";
function InputField({
  label,
  type,
  id,
  name,
  value,
  className,
  onChange,
  placeholder,
  iconStart,
  iconEnd,
  error,
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
            type={type}
            id={id}
            name={name}
            value={value}
            className={`outline-0 w-full px-3 ${className}`}
            onChange={onChange}
            placeholder={placeholder}
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
