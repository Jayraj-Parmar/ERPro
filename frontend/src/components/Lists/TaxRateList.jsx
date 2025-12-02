import { TbEdit, TbTrash } from "react-icons/tb";
import Button from "../common/Button";

function TaxRateList({ data, onDelete, onEdit, deleteLoading, label }) {
  if (!data.length) return <p>{`No ${label} Found.`}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-lg text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-3 text-left">#</th>
            <th className="py-2 px-3 text-left">Name</th>
            <th className="py-2 px-3 text-left">Rate</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item._id}
              className="border-b hover:bg-blue-50 transition-colors"
            >
              <td className="py-2 px-3">{index + 1}</td>
              <td className="py-2 px-3">{item.name}</td>
              <td className="py-2 px-3">{item.rate + " %"}</td>
              <td
                className={`py-2 px-3 font-semibold ${
                  item.status === "active" ? "text-green-600" : "text-gray-500"
                }`}
              >
                {item.status}
              </td>
              <td className="py-1 justify-center flex">
                <Button
                  className="text-blue-600"
                  onClick={() => {
                    onEdit(item);
                  }}
                >
                  <TbEdit size={19} />
                </Button>
                <Button
                  className="text-red-500"
                  loading={deleteLoading}
                  onClick={() => {
                    onDelete(item._id);
                  }}
                >
                  <TbTrash size={19} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaxRateList;
