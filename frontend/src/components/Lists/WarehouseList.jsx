import Button from "../common/Button";
import { TbEdit, TbTrash } from "react-icons/tb";

function WarehouseList({ data, onEdit, onDelete, deleteLoading, label }) {
  if (!data.length) return <p>{`No ${label} Found.`}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-lg text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-3 text-left">#</th>
            <th className="py-2 px-3 text-left">Name</th>
            <th className="py-2 px-3 text-left">Contact Person</th>
            <th className="py-2 px-3 text-left">Contact Number</th>
            <th className="py-2 px-3 text-left">Email</th>
            <th className="py-2 px-3 text-left">Address</th>
            <th className="py-2 px-3 text-left">City</th>
            <th className="py-2 px-3 text-left">State</th>
            <th className="py-2 px-3 text-left">Pincode</th>
            <th className="py-2 px-3 text-left">Description</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className="border-b hover:bg-blue-50">
              <td className="py-2 px-3">{index + 1}</td>
              <td className="py-2 px-3">{item.name || "NA"}</td>
              <td className="py-2 px-3">{item.contact_person || "NA"}</td>
              <td className="py-2 px-3">{item.contact_number || "NA"}</td>
              <td className="py-2 px-3">{item.email || "NA"}</td>
              <td className="py-2 px-3">{item.address || "NA"}</td>
              <td className="py-2 px-3">{item.city || "NA"}</td>
              <td className="py-2 px-3">{item.state || "NA"}</td>
              <td className="py-2 px-3">{item.pincode || "NA"}</td>
              <td className="py-2 px-3">{item.description || "NA"}</td>
              <td className="py-2 px-3">{item.status || "NA"}</td>
              <td className="py-1 justify-center flex gap-2">
                <Button className="text-blue-600" onClick={() => onEdit(item)}>
                  <TbEdit size={19} />
                </Button>
                <Button
                  className="text-red-500"
                  loading={deleteLoading}
                  onClick={() => onDelete(item._id)}
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

export default WarehouseList;
