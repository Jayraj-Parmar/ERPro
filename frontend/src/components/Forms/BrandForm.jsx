import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Status from "../common/Status";

function BrandForm({ onSubmit, loading, editData, label, resetSignal }) {
  const {
    watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      contact_person: "",
      contact_number: "",
      email: "",
      website: "",
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
        website: "",
        description: "",
        status: "active",
      }
    );
  }, [editData, resetSignal, reset]);

  const submitHandler = (formData) => {
    onSubmit(formData);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
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
          error={errors?.contact_person?.message}
          label="Contact Person"
          {...register("contact_person")}
        />
        <InputField
          type="text"
          error={errors?.contact_number?.message}
          label="Contact Number"
          {...register("contact_number", {
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit mobile number",
            },
          })}
        />
        <InputField
          type="email"
          label="Email"
          error={errors?.email?.message}
          {...register("email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        <InputField
          type="text"
          label="Website"
          error={errors?.website?.message}
          {...register("website", {
            pattern: {
              value:
                /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
              message: "Enter a valid website URL",
            },
          })}
        />

        <div className="sm:col-span-2">
          <label>Description</label>
          <textarea
            {...register("description")}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none"
            placeholder="Write a short description"
          ></textarea>
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

export default BrandForm;
