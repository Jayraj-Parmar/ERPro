import { TbSearch } from "react-icons/tb";
import InputField from "../common/InputField";

function GlobalSearch({ search, setSearch }) {
  return (
    <InputField
      type="text"
      placeholder="Search..."
      iconEnd={<TbSearch />}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default GlobalSearch;
