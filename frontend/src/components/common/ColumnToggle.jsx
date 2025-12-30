import { Dropdown } from "antd";
import Button from "./Button";
import { TbTableOptions } from "react-icons/tb";

function ColumnToggle({ columns, visibleColumns, setVisibleColumns }) {
  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = Object.entries(columns).map(([key, col]) => ({
    key,
    label: (
      <label
        className="flex items-center gap-2 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="hover:cursor-pointer"
          checked={visibleColumns[key]}
          onChange={() => toggleColumn(key)}
        />
        <span>{col.label}</span>
      </label>
    ),
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
      <span>
        <Button type="default" className="border-2 border-gray-400 rounded-lg">
          <TbTableOptions size={25} />
        </Button>
      </span>
    </Dropdown>
  );
}

export default ColumnToggle;
