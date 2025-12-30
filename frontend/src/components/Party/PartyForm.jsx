import InputField from "../common/InputField";
import { Controller, useForm, useWatch } from "react-hook-form";
import { TbCurrencyRupee } from "react-icons/tb";
import Status from "../common/Status";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import SearchSelect from "../common/searchSelect";
import { fetchLocation } from "../../app/slices/locationSlice";
import Button from "../common/Button";
import { createData, updateData } from "../../app/slices/CrudSlice";
import { useState } from "react";
import Error from "../common/Error";
import { cleanPayload } from "../../utils/cleanPayload";
import { useLocation } from "react-router-dom";

function PartyForm({ type = "customer" }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const editData = location.state?.editData;

  const { data, loading, error } = useSelector((state) => state.location);
  const {
    error: formError,
    success,
    createOrUpdateLoading,
  } = useSelector((state) => state.crud);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    control,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: editData || {
      first_name: "",
      last_name: "",
      contact_number: "",
      whatsapp_number: "",
      email: "",
      company_name: "",
      gst_number: "",
      opening_balance: "",
      district: "",
      subdistrict: "",
      village: "",
      address: "",
      status: "active",
    },
  });

  // validators

  const formatNumber = (v) =>
    v === "" || v === null || v === undefined ? undefined : Number(v);

  const isValidNumber = (value) => {
    if (value === undefined || value === null || value === "") return true;
    return /^\d+(\.\d+)?$/.test(value) || "Enter a valid number";
  };

  const isContactNumber = (value) => {
    if (!value) return true;
    return /^[6-9]\d{9}$/.test(value) || "Enter a valid contact number";
  };

  // watch locations

  const district = useWatch({
    control,
    name: "district",
  });
  const subDistrict = useWatch({
    control,
    name: "subdistrict",
  });
  const village = useWatch({
    control,
    name: "village",
  });

  const districtId = district?.value;
  const districtName = district?.label;
  const subDistrictId = subDistrict?.value;
  const subDistrictName = subDistrict?.label;
  const villageName = village?.label;

  // fetch locations

  useEffect(() => {
    dispatch(fetchLocation({ type: "district" }));
  }, [dispatch]);

  useEffect(() => {
    if (districtId)
      dispatch(fetchLocation({ type: "subdistrict", districtId: districtId }));
  }, [dispatch, districtId]);

  useEffect(() => {
    if (subDistrictId)
      dispatch(
        fetchLocation({ type: "village", subDistrictId: subDistrictId })
      );
  }, [dispatch, subDistrictId]);

  // memoized options

  const districtOptions = useMemo(
    () =>
      (data?.district || [])
        .filter((district) => district["is_active"] === true)
        .map((district) => ({
          value: district["_id"],
          label: district["name_en"],
        })),
    [data?.district]
  );

  const subDistrictOptions = useMemo(
    () =>
      (data?.subdistrict || [])
        .filter((d) => d.is_active)
        .map((d) => ({ value: d._id, label: d.name_en })),
    [data?.subdistrict]
  );

  const villageOptions = useMemo(
    () =>
      (data?.village || [])
        .filter((v) => v.is_active)
        .map((v) => ({ value: v._id, label: v.name_en })),
    [data?.village]
  );

  // field on edit data

  useEffect(() => {
    if (!editData) return;
    if (!districtOptions.length) return;

    const find = (list, label) => list.find((o) => o.label === label) || null;

    reset({
      ...editData,
      district: find(districtOptions, editData.district),
      subdistrict: find(subDistrictOptions, editData.subdistrict),
      village: find(villageOptions, editData.village),
    });
  }, [editData, districtOptions, subDistrictOptions, villageOptions, reset]);

  const [fieldError, setFieldErrors] = useState({});

  const onSubmit = async (formData) => {
    try {
      setFieldErrors({});
      const removeEmptyFields = cleanPayload(formData);
      const payload = {
        ...removeEmptyFields,
        district: districtName,
        subdistrict: subDistrictName,
        village: villageName,
      };
      if (editData) {
        await dispatch(
          updateData({ endpoint: type, id: editData._id, payload: payload })
        ).unwrap();
      } else {
        await dispatch(
          createData({ endpoint: type, payload: payload })
        ).unwrap();
      }
    } catch (error) {
      if (error.status === 422) {
        const fieldError = {};
        error.errors.map((err) => {
          fieldError[err.path] = err.msg;
        });
        setFieldErrors(fieldError);
      }
    }
  };

  return (
    <>
      {(formError || error || success) && (
        <Error error={formError || error || success} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-y-4">
          <div className="grid sm:grid-cols-2 gap-4 bg-white p-4 rounded-lg border border-gray-400">
            <InputField
              type="text"
              id="first_name"
              label="First Name"
              placeholder="John"
              error={errors?.first_name?.message || fieldError?.first_name}
              {...register("first_name", {
                required: "First name is required.",
              })}
            />
            <InputField
              type="text"
              id="last_name"
              label="Last Name"
              placeholder="Deo"
              error={errors?.last_name?.message}
              {...register("last_name")}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg border border-gray-400">
            <InputField
              type="text"
              id="contact_number"
              label="Contact Number"
              placeholder="9929944202"
              error={
                errors?.contact_number?.message || fieldError?.contact_number
              }
              {...register("contact_number", {
                validate: (value) => {
                  const validContact = isContactNumber(value);
                  if (!validContact) return validContact;
                },
              })}
            />
            <InputField
              type="text"
              id="whatsapp_number"
              label="Whatsapp Number"
              placeholder="9929944202"
              error={
                errors?.whatsapp_number?.message || fieldError?.whatsapp_number
              }
              {...register("whatsapp_number", {
                validate: (value) => {
                  const validContact = isContactNumber(value);
                  if (!validContact) return validContact;
                },
              })}
            />
            <InputField
              type="email"
              label="Email"
              placeholder="xyz@gmail.com"
              error={errors?.email?.message || fieldError?.email}
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg border border-gray-400">
            <InputField
              type="text"
              id="company_name"
              label="Company Name"
              error={errors?.company_name?.message || fieldError?.company_name}
              {...register("company_name")}
            />
            <InputField
              type="gst_number"
              label="GST Number"
              error={errors?.gst_number?.message || fieldError?.gst_number}
              {...register("gst_number", {
                pattern: {
                  value:
                    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message: "Enter a valid GSTIN",
                },
              })}
            />
            <InputField
              type="text"
              id="opening_balance"
              label="Opening Balance"
              error={
                errors?.opening_balance?.message || fieldError?.opening_balance
              }
              iconStart={<TbCurrencyRupee />}
              {...register("opening_balance", {
                setValueAs: formatNumber,
                min: {
                  value: 0,
                  message: "Purchase Price cannot be negative.",
                },
                validate: (value) => {
                  const numberValidatoin = isValidNumber(value);
                  if (!numberValidatoin) return numberValidatoin;
                },
              })}
            />
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-400">
            <div className="grid sm:grid-cols-3 gap-4 ">
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <SearchSelect
                    label="District"
                    options={districtOptions}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setValue("subdistrict", null);
                      setValue("village", null);
                    }}
                    isLoading={loading}
                  />
                )}
              />
              <Controller
                name="subdistrict"
                control={control}
                render={({ field }) => (
                  <SearchSelect
                    label="Sub-District"
                    options={subDistrictOptions}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setValue("village", null);
                    }}
                    isDisabled={!districtId}
                    isLoading={loading}
                    error={error?.subdistrict?.message}
                  />
                )}
              />
              <Controller
                name="village"
                control={control}
                render={({ field }) => (
                  <SearchSelect
                    label="Village/City"
                    options={villageOptions}
                    value={field.value}
                    onChange={field.onChange}
                    isDisabled={!subDistrictId}
                    isLoading={loading}
                    error={error?.village?.message}
                  />
                )}
              />
            </div>
            <div className="mt-4">
              <label>Address</label>
              <textarea
                {...register("address")}
                rows="1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none bg-white"
              ></textarea>
            </div>
          </div>
          <Status watch={watch} control={control} />
        </div>
        <Button
          type="submit"
          className="font-bold bg-blue-600 text-white rounded-lg mt-5"
          loading={createOrUpdateLoading}
        >
          {editData
            ? type === "customer"
              ? "Update Customer"
              : "Update Supplier"
            : type === "customer"
            ? "Save Customer"
            : "Save Supplier"}
        </Button>
      </form>
    </>
  );
}

export default PartyForm;
