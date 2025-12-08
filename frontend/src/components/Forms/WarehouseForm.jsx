import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Status from "../common/Status";
import { useEffect } from "react";

function WarehouseForm({
  onSubmit,
  editData,
  loading,
  label,
  resetSignal,
  error,
  success,
}) {
  const {
    watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
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
    <>
      {(error || success) && <Error error={error || success} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 py-4 grid sm:grid-cols-2 gap-x-8 gap-y-4"
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
          error={errors?.contact_person?.message}
          {...register("contact_person")}
        />
        <InputField
          type="text"
          label="Contact Number"
          error={errors?.contact_number?.message}
          {...register("contact_number", {
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit mobile number",
            },
          })}
        />
        <InputField
          type="email"
          label="E-mail"
          error={errors?.email?.message}
          {...register("email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        <div className="sm:col-span-2">
          <label>Address</label>
          <textarea
            {...register("address")}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </div>
        <InputField
          type="text"
          label="City"
          error={errors?.city?.message}
          {...register("city")}
        />
        <InputField
          type="text"
          error={errors?.state?.message}
          label="State"
          {...register("state")}
        />
        <InputField
          type="text"
          label="Pincode"
          error={errors?.pincode?.message}
          {...register("pincode", {
            pattern: {
              value: /^[1-9][0-9]{5}$/,
              message: "Enter a valid 6-digit pincode",
            },
          })}
        />
        <div className="sm:col-span-2">
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
    </>
  );
}

export default WarehouseForm;
