import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  fetchData,
  createData,
  deleteData,
  updateData,
} from "../../app/slices/CrudSlice";
import { TbEdit, TbTrash } from "react-icons/tb";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Error from "../common/Error";

function Crud({ endpoint, label }) {
  const dispatch = useDispatch();
  const {
    data,
    fetchLoading,
    createOrUpdateLoading,
    deleteLoading,
    error,
    success,
  } = useSelector((state) => state.crud);

  const list = data[endpoint] || [];

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      status: "active",
    },
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchData(endpoint));
  }, [dispatch, endpoint]);

  const onSubmit = async (formData) => {
    if (editId) {
      await dispatch(
        updateData({ endpoint, id: editId, payload: formData })
      ).unwrap();
      setEditId(null);
    } else {
      await dispatch(createData({ endpoint, payload: formData })).unwrap();
    }
    reset({
      name: "",
      status: "active",
    });
    dispatch(fetchData(endpoint));
  };

  const onDelete = async (id) => {
    await dispatch(deleteData({ endpoint, id })).unwrap();
  };

  const onUpdate = (item) => {
    setEditId(item._id);
    reset({
      name: item.name || "",
      status: item.status || "active",
    });
  };

  return (
    <>
      {(error || success) && <Error error={error || success} />}
      <div className="mb-6 py-4">
        <InputField
          type="text"
          label={`${label} Name`}
          error={errors?.name?.message}
          {...register("name", { required: `${label} name is required.` })}
        />
        <div className="mt-4 flex items-center gap-3">
          <label>Status</label>
          <Controller
            control={control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={value === "active"}
                  onChange={(e) =>
                    onChange(e.target.checked ? "active" : "inactive")
                  }
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    value === "active" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
                <span
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                    value === "active" ? "translate-x-5" : ""
                  }`}
                ></span>
              </label>
            )}
          />

          <span
            className={`text-sm font-semibold ${
              watch("status") === "active" ? "text-green-600" : "text-gray-500"
            }`}
          >
            {watch("status")}
          </span>
        </div>
        <div className="flex">
          <Button
            loading={createOrUpdateLoading}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
            className="bg-blue-600 text-white rounded-lg mt-5"
          >
            {editId ? "Update" : "Add"}
          </Button>
        </div>
      </div>
      {fetchLoading ? (
        <p>Loading...</p>
      ) : list.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-3 text-left">#</th>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">{item.name}</td>
                  <td
                    className={`py-2 px-3 font-semibold ${
                      item.status === "active"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="py-1 text-center">
                    <Button
                      className="text-blue-600"
                      onClick={(e) => {
                        e.preventDefault();
                        onUpdate(item);
                      }}
                    >
                      <TbEdit size={19} />
                    </Button>
                    <Button
                      className="text-red-500"
                      loading={deleteLoading}
                      onClick={(e) => {
                        e.preventDefault();
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
      ) : (
        <p>{`No ${label} Found.`}</p>
      )}
    </>
  );
}

export default Crud;
