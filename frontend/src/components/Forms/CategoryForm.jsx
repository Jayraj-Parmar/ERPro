import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Status from "../common/Status";

function UnitForm({ label, loading, onSubmit, editData, resetSignal }) {
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
      description: "",
      status: "active",
    },
  });
  useEffect(() => {
    reset(
      editData || {
        name: "",
        description: "",
        status: "active",
      }
    );
  }, [editData, resetSignal, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 py-4 grid gap-y-3">
        <InputField
          type="text"
          label={`${label} Name`}
          error={errors?.name?.message}
          {...register("name", { required: `${label} name is required.` })}
        />
        {/* Description Textarea */}
        <div className="col-span-2">
          <label>Description</label>
          <textarea
            {...register("description")}
            rows="2"
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
  );
}

export default UnitForm;
