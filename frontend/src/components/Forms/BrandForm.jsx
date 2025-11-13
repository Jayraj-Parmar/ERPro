import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Error from "../common/Error";
import Status from "../common/Status";

function BrandForm({
  onSubmit,
  loading,
  editData,
  label,
  error,
  success,
  resetSignal,
}) {
  const {
    watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
      {(error || success) && <Error error={error || success} />}

      <form
        onSubmit={handleSubmit(submitHandler)}
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
        <InputField type="email" label="Email" {...register("email")} />
        <InputField type="text" label="Website" {...register("website")} />

        <div className="col-span-2">
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
