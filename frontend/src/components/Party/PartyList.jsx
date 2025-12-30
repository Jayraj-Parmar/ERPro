import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData } from "../../app/slices/CrudSlice";
import ColumnToggle from "../common/ColumnToggle";
import GlobalSearch from "../common/GlobalSearch";
import { TbEdit, TbTrash } from "react-icons/tb";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Error from "../common/Error";

function PartyList({ type = "customer", columns }) {
  const dispatch = useDispatch();
  const { data, error, success } = useSelector((state) => state.crud);
  const list = data[type] || [];

  // fetch data of parties
  useEffect(() => {
    dispatch(fetchData(type));
  }, [dispatch]);

  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(
      Object.entries(columns).map(([key, col]) => [key, col.default])
    )
  );

  // globla search
  const [search, setSearch] = useState("");
  const filteredList = useMemo(() => {
    if (!search) return list;

    const q = search.toLowerCase();

    return list.filter((row) =>
      Object.entries(visibleColumns).some(([key, isVisible]) => {
        if (!isVisible) return false;

        return String(row[key] ?? "")
          .toLowerCase()
          .includes(q);
      })
    );
  }, [list, search, visibleColumns]);

  // update party data
  const navigate = useNavigate();

  const handleEdit = (data) => {
    navigate(type === "customer" ? "addcustomer" : "addsupplier", {
      state: { editData: data },
    });
  };

  // delete party
  const handleDelete = (id) => {
    dispatch(deleteData({ endpoint: type, id }));
  };

  return (
    <>
      {(error || success) && <Error error={error || success} />}

      <div className="flex items-end mb-4">
        <div className="me-2">
          <ColumnToggle
            columns={columns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
        </div>
        <GlobalSearch setSearch={setSearch} />
      </div>
      <div className="relative overflow-x-auto rounded-lg border border-gray-400">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr className="border-b border-gray-300">
              {Object.entries(columns).map(
                ([key, col]) =>
                  visibleColumns[key] && (
                    <th
                      key={key}
                      className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap"
                    >
                      {col.label}
                    </th>
                  )
              )}
              <th className="px-2 py-2 text-center font-medium text-gray-700 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredList.map((row, index) => (
              <tr
                key={row._id}
                className={`border-b last:border-b-0 
            ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            hover:bg-blue-50 transition-colors`}
              >
                {visibleColumns.name && (
                  <td className="px-4 py-3 whitespace-nowrap">{row?.name}</td>
                )}

                {visibleColumns.company_name && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row?.company_name || "NA"}
                  </td>
                )}

                {visibleColumns.contact_number && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row?.contact_number || "NA"}
                  </td>
                )}

                {visibleColumns.opening_balance && (
                  <td className="px-4 py-3">{row?.opening_balance ?? 0}</td>
                )}

                {visibleColumns.current_balance && (
                  <td className="px-4 py-3">{row?.current_balance ?? 0}</td>
                )}

                {visibleColumns.whatsapp_number && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row?.whatsapp_number || "NA"}
                  </td>
                )}

                {visibleColumns.email && (
                  <td
                    title={row?.email || "NA"}
                    className="px-4 py-3 truncate max-w-[200px]"
                  >
                    {row?.email || "NA"}
                  </td>
                )}

                {visibleColumns.gst_number && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row?.gst_number || "NA"}
                  </td>
                )}

                {visibleColumns.address && (
                  <td
                    title={row?.address || "NA"}
                    className="px-4 py-3 truncate max-w-[250px]"
                  >
                    {row?.address || "NA"}
                  </td>
                )}

                {visibleColumns.village_city && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row?.village || "NA"}
                  </td>
                )}

                {visibleColumns.subdistrict && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row?.subdistrict || "NA"}
                  </td>
                )}

                {visibleColumns.district && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row?.district || "NA"}
                  </td>
                )}

                {visibleColumns.status && (
                  <td
                    className={`px-4 py-3 font-medium whitespace-nowrap
                ${
                  row?.status === "active" ? "text-green-600" : "text-gray-500"
                }`}
                  >
                    {row?.status || "NA"}
                  </td>
                )}

                <td className="py-1 justify-evenly flex">
                  <Button className="text-blue-600">
                    <TbEdit size={19} onClick={() => handleEdit(row)} />
                  </Button>
                  <Button className="text-red-500">
                    <TbTrash size={19} onClick={() => handleDelete(row._id)} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PartyList;
