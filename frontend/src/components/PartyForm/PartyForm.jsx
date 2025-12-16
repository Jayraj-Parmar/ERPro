import React from "react";
import InputField from "../common/InputField";
import { useForm } from "react-hook-form";
import { TbCurrencyRupee } from "react-icons/tb";
import Status from "../common/Status";

function PartyForm() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    control,
  } = useForm();
  const formatNumber = (v) =>
    v === "" || v === null || v === undefined ? undefined : Number(v);

  const isValidNumber = (value) => {
    if (value === undefined || value === null || value === "") return true;
    return /^\d+(\.\d+)?$/.test(value) || "Enter a valid number";
  };
  return (
    <>
      <form onSubmit={handleSubmit()}>
        <InputField
          type="text"
          id="first_name"
          label="First Name"
          placeholder="John"
          error={errors?.first_name?.message}
          {...register("first_name", { required: "First name is required." })}
        />
        <InputField
          type="text"
          id="last_name"
          label="Last Name"
          placeholder="Deo"
          error={errors?.last_name?.message}
          {...register("last_name")}
        />
        <InputField
          type="text"
          id="company_name"
          label="company Name"
          error={errors?.company_name?.message}
          {...register("company_name")}
        />
        <InputField
          type="text"
          id="contact_number"
          label="Contact Number"
          placeholder="9929944202"
          error={errors?.contact_number?.message}
          {...register("contact_number")}
        />
        <InputField
          type="text"
          id="whatsapp_number"
          label="Whatsapp Number"
          placeholder="9929944202"
          error={errors?.whatsapp_number?.message}
          {...register("whatsapp_number")}
        />
        <InputField
          type="email"
          label="Email"
          placeholder="xyz@gmail.com"
          error={errors?.email?.message}
          {...register("email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        <div>
          <label>Address</label>
          <textarea
            {...register("address")}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none bg-white"
          ></textarea>
        </div>
        <InputField
          type="text"
          id="opening_balance"
          label="Opening Balance"
          error={errors?.opening_balance?.message}
          iconStart={<TbCurrencyRupee />}
          {...register("opening_balance", {
            setValueAs: formatNumber,
            min: {
              value: 0,
              message: "Purchase Price cannot be negative.",
            },
            validate: (value) => {
              const numberValidatoin = isValidNumber(value);
              if (numberValidatoin !== true) return numberValidatoin;
            },
          })}
        />
        <Status watch={watch} control={control} />
      </form>
    </>
  );
}

export default PartyForm;
