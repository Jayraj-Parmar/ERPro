import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Status from "../common/Status";

function UnitForm({
  label,
  loading,
  onSubmit,
  editData,
  resetSignal,
  error,
  success,
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editData || {
      name: "",
      short_name: "",
      status: "active",
    },
  });
  useEffect(() => {
    reset(
      editData || {
        name: "",
        short_name: "",
        status: "active",
      }
    );
  }, [editData, resetSignal, reset]);
  return (
    <>
      {(error || success) && <Error error={error || success} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 py-4 grid gap-4">
          <InputField
            type="text"
            label={`${label} Name`}
            error={errors?.name?.message}
            {...register("name", { required: `${label} name is required.` })}
          />
          <InputField
            type="text"
            label="Sort Name"
            error={errors?.short_name?.message}
            {...register("short_name", {
              required: `Short name is required.`,
            })}
          />
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
        </div>
      </form>
    </>
  );
}

export default UnitForm;
