import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import Status from "../common/Status";
import Button from "../common/Button";
import { useEffect } from "react";

function TaxRateForm({
  onSubmit,
  label,
  loading,
  editData,
  error,
  success,
  resetSignal,
}) {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: editData || {
      name: "",
      rate: "",
      status: "active",
    },
  });

  useEffect(() => {
    reset(
      editData || {
        name: "",
        rate: "",
        status: "active",
      }
    );
  }, [editData, resetSignal, reset]);

  return (
    <>
      {(error || success) && <Error error={error || success} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 py-4 grid sm:grid-cols-2 gap-4">
          <InputField
            type="text"
            label="Tax Name"
            error={errors?.name?.message}
            placeholder="GST@18%"
            {...register("name", { required: `Tax name is required.` })}
          />
          <InputField
            type="text"
            label="Tax Rate (%)"
            error={errors?.rate?.message}
            {...register("rate", {
              required: `Tax Rate is required.`,
            })}
          />
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

export default TaxRateForm;
