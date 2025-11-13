import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Status from "../common/Status";
import { useEffect } from "react";

function WarehouseForm({ onSubmit, editData, loading, label, resetSignal }) {
  const {
    watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editData || {
      name: "",
      contact_person: "",
      contact_number: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      description: "",
      status: "active",
    },
  });

  useEffect(() => {
    reset(
      editData || {
        name: "",
        contact_person: "",
        contact_number: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        description: "",
        status: "active",
      }
    );
  }, [editData, reset, resetSignal]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 py-4 md:grid grid-cols-2 gap-x-8 gap-y-4"
    >
      <InputField
        type="text"
        label={`${label} Name`}
        error={errors?.name?.message}
        {...register("name", { required: `${label} name is required.` })}
      />
      <InputField
        type="text"
        label="Contact Person"
        {...register("contact_person")}
      />
      <InputField
        type="text"
        label="Contact Number"
        {...register("contact_number")}
      />
      <InputField type="email" label="E-mail" {...register("email")} />

      <div className="col-span-2">
        <label>Address</label>
        <textarea
          {...register("address")}
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
        />
      </div>
      <InputField type="text" label="City" {...register("city")} />
      <InputField type="text" label="State" {...register("state")} />
      <InputField type="text" label="Pincode" {...register("pincode")} />
      <div className="col-span-2">
        <label>Description</label>
        <textarea
          {...register("description")}
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
        />
      </div>
      <Status watch={watch} control={control} />
      <div className="flex">
        <Button
          loading={loading}
          type="submit"
          className="bg-blue-600 text-white rounded-lg mt-5"
        >
          {editData ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
}

export default WarehouseForm;
