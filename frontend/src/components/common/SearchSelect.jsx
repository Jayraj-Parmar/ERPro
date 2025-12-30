import Select from "react-select";
import { TbAlertCircle } from "react-icons/tb";

function SearchSelect({
  label,
  options = [],
  value,
  onChange,
  isDisabled,
  isLoading,
  error,
}) {
  return (
    <div>
      {label && <label className="mb-1 block">{label}</label>}
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
        isLoading={isLoading}
      />
      {error && (
        <div className="flex items-center text-red-500 mt-1">
          <TbAlertCircle size={16} className="me-1" /> <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default SearchSelect;
