import { useForm, Controller } from "react-hook-form";
import { TbCurrencyRupee, TbPercentage } from "react-icons/tb";
import InputField from "../common/InputField.jsx";
import CRUDDropdown from "../common/CRUDDropdown.jsx";
import Button from "../common/Button.jsx";
import Status from "../common/Status.jsx";
import InputSelect from "../common/InputSelect.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createData } from "../../app/slices/CrudSlice.js";

function ProductForm() {
  const {
    watch,
    control,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      conversion_factor: 1,
      opening_stock: 0,
      minimum_order_quantity: 0,
      reorder_level: 0,
      status: "active",
    },
  });

  const discountType = watch("discount_type");
  const salePriceType = watch("sale_price_type");
  const purchasePriceType = watch("purchase_price_type");

  const formatNumber = (v) => (v === "" ? undefined : Number(v));

  const dispatch = useDispatch();

  useEffect(() => {
    if (discountType === "percentage") {
      setValue("discount_amount", null);
    } else if (discountType === "amount") {
      setValue("discount_percentage", null);
    }
  }, [discountType]);

  useEffect(() => {
    if (salePriceType === "without tax") {
      setValue("default_sale_price_with_tax", null);
    } else if (salePriceType === "with tax") {
      setValue("default_sale_price_without_tax", null);
    }
  }, [salePriceType]);

  useEffect(() => {
    if (purchasePriceType === "without tax") {
      setValue("opening_purchase_price_with_tax", null);
    } else if (purchasePriceType === "with tax") {
      setValue("opening_purchase_price_without_tax", null);
    }
  }, [purchasePriceType]);

  const onSubmit = async (formData) => {
    await dispatch(
      createData({ endpoint: "product", payload: formData })
    ).unwrap();
  };

  return (
    <>
      <div className="text-sm">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 border border-gray-400 rounded-lg p-5 bg-white">
          {/* Name */}
          <InputField
            type="text"
            id="product"
            label="Product Name"
            error={errors?.name?.message}
            {...register("name", { required: "Name is required." })}
          />
          {/* Warehouse */}
          <Controller
            name="warehouse_location_id"
            control={control}
            render={({ field }) => (
              <CRUDDropdown
                label="Warehouse"
                endpoint="warehouse"
                modalType="warehouse"
                modalSize="max-w-6xl w-full"
                value={field.value}
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {/* Category */}
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <CRUDDropdown
                label="Category"
                endpoint="category"
                modalType="category"
                modalSize="max-w-lg w-full"
                value={field.value}
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {/* Brand */}
          <Controller
            name="brand_id"
            control={control}
            render={({ field }) => (
              <CRUDDropdown
                label="Brand"
                endpoint="brand"
                modalType="brand"
                modalSize="max-w-6xl w-full"
                value={field.value}
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {/* Description */}
          <div className="sm:col-span-2">
            <label>Description</label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none bg-white"
            ></textarea>
          </div>

          {/* Tax Rate */}
          <div className="bg-gray-100 p-4 rounded-lg sm:col-span-2">
            <Controller
              name="tax_rate_id"
              control={control}
              render={({ field }) => (
                <CRUDDropdown
                  label="Tax Rate"
                  endpoint="taxrate"
                  modalType="taxrate"
                  modalSize="max-w-lg w-full"
                  value={field.value}
                  onChange={(option) => field.onChange(option?.value)}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-5 border border-gray-400 rounded-lg p-5 bg-white">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg grid sm:grid-cols-2 gap-4">
              <InputSelect
                id="sale_price_type"
                label="Sale Price Type"
                options={["with tax", "without tax"]}
                error={errors?.discount_type?.message}
                {...register("sale_price_type")}
              />
              {/* Sale Price */}
              {salePriceType === "without tax" && (
                <InputField
                  type="text"
                  id="default_sale_price_without_tax"
                  label="Sale Price (without tax)"
                  error={errors?.default_sale_price_without_tax?.message}
                  iconStart={<TbCurrencyRupee />}
                  {...register("default_sale_price_without_tax", {
                    required: "Sale Price is required.",
                    setValueAs: formatNumber,
                    min: {
                      value: 1,
                      message: "Sale Price cannot be negative.",
                    },
                    validate: (value) => {
                      if (isNaN(value)) {
                        return "Sale Price must be a valid number";
                      }
                    },
                  })}
                />
              )}
              {salePriceType === "with tax" && (
                <InputField
                  type="text"
                  id="default_sale_price_with_tax"
                  label="Sale Price (with tax)"
                  error={errors?.default_sale_price_with_tax?.message}
                  iconStart={<TbCurrencyRupee />}
                  {...register("default_sale_price_with_tax", {
                    required: "Sale Price is required.",
                    setValueAs: formatNumber,
                    min: {
                      value: 1,
                      message: "Sale Price cannot be negative.",
                    },
                    validate: (value) => {
                      if (isNaN(value)) {
                        return "Sale Price must be a valid number";
                      }
                    },
                  })}
                />
              )}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg grid sm:grid-cols-2 gap-4">
              {/* Discount Type */}
              <InputSelect
                id="discount_type"
                label="Discount Type"
                options={["none", "percentage", "amount"]}
                error={errors?.discount_type?.message}
                {...register("discount_type")}
              />
              {/* Conditional Discount Inputs */}
              {discountType === "percentage" && (
                <InputField
                  type="text"
                  id="discount_percentage"
                  label="Discount (%)"
                  error={errors?.discount_percentage?.message}
                  iconEnd={<TbPercentage />}
                  {...register("discount_percentage", {
                    min: {
                      value: 0,
                      message: "Discount cannot be nagetive ",
                    },
                    max: {
                      value: 100,
                      message: "Discount cannot be grater than 100% ",
                    },
                    validate: (value) => {
                      if (isNaN(value)) {
                        return "Discount must be a valid number";
                      }
                    },
                    setValueAs: formatNumber,
                  })}
                />
              )}
              {discountType === "amount" && (
                <InputField
                  type="text"
                  id="discount_amount"
                  label="Discount Amount"
                  error={errors?.discount_amount?.message}
                  iconStart={<TbCurrencyRupee />}
                  {...register("discount_amount", {
                    min: {
                      value: 0,
                      message: "Discount cannot be nagetive ",
                    },
                    max: {
                      value:
                        watch("default_sale_price_without_tax") ||
                        watch("default_sale_price_with_tax") ||
                        0,
                      message: "Discount cannot be grater than sale price",
                    },
                    validate: (value) => {
                      if (isNaN(value)) {
                        return "Discount must be a valid number";
                      }
                    },
                    setValueAs: formatNumber,
                  })}
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 border border-gray-400 rounded-lg p-5 bg-white mt-4">
          {/* Quantity */}
          <InputField
            type="number"
            id="opening_stock"
            label="Opening Stock"
            error={errors?.opening_stock?.message}
            {...register("opening_stock", {
              setValueAs: formatNumber,
              min: {
                value: 0,
                message: "Opening stock cannot be nagetive ",
              },
            })}
            min="0"
          />
          <InputField
            type="date"
            id="opening_stock_date"
            label="Opening Stock Date"
            error={errors?.opening_stock_date?.message}
            {...register("opening_stock_date", {
              validate: (value) => {
                if (watch("opening_stock") > 0 && !value)
                  return "Opening stock date is required";
                return true;
              },
            })}
          />
          <InputSelect
            id="purchase_price_type"
            label="Purchase Price Type"
            options={["with tax", "without tax"]}
            error={errors?.discount_type?.message}
            {...register("purchase_price_type")}
          />
          {purchasePriceType === "without tax" && (
            <InputField
              type="text"
              id="opening_purchase_price_without_tax"
              label="Purchase Price (without tax)"
              error={errors?.opening_purchase_price_without_tax?.message}
              iconStart={<TbCurrencyRupee />}
              {...register("opening_purchase_price_without_tax", {
                setValueAs: formatNumber,
                min: {
                  value: 1,
                  message: "Purchase Price cannot be negative.",
                },
                validate: (value) => {
                  if (isNaN(value)) {
                    return "Purchase Price must be a valid number";
                  }
                  if (watch("opening_stock") > 0 && !value) {
                    return "Purchase price is required";
                  }
                },
              })}
            />
          )}
          {purchasePriceType === "with tax" && (
            <InputField
              type="text"
              id="opening_purchase_price_with_tax"
              label="Purchase Price (with tax)"
              error={errors?.opening_purchase_price_with_tax?.message}
              iconStart={<TbCurrencyRupee />}
              {...register("opening_purchase_price_with_tax", {
                setValueAs: formatNumber,
                min: {
                  value: 1,
                  message: "Purchase price cannot be negative.",
                },
                validate: (value) => {
                  if (isNaN(value)) {
                    return "Purchase price must be a valid number";
                  }
                  if (watch("opening_stock") > 0 && !value) {
                    return "Purchase price is required";
                  }
                },
              })}
            />
          )}
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 border border-gray-400 rounded-lg p-5 bg-white mt-4">
          {/* Minimum Order Quantity */}
          <InputField
            type="number"
            id="minimum_order_quantity"
            label="Minimum Order Quantity"
            error={errors?.minimum_order_quantity?.message}
            {...register("minimum_order_quantity", {
              required: "Minimum Order Quantity is required.",
              setValueAs: formatNumber,
              min: {
                value: 0,
                message: "Minimum stock Quantity cannot be nagetive ",
              },
            })}
            min="0"
          />
          {/* Quantity Alert */}
          <InputField
            type="number"
            id="reorder_level"
            label="Quantity Alert"
            error={errors?.reorder_level?.message}
            {...register("reorder_level", {
              required: "Quantity Alert is required.",
              setValueAs: formatNumber,
              min: {
                value: 0,
                message: "Quantity Alert cannot be nagetive ",
              },
            })}
            min="0"
          />

          <InputField
            type="date"
            id="manufacture_date"
            label="Manufacture Date"
            error={errors?.manufacture_date?.message}
            {...register("manufacture_date")}
          />
          <InputField
            type="date"
            id="expiry_date"
            label="Expiry Date"
            error={errors?.expiry_date?.message}
            {...register("expiry_date", {
              validate: (value) => {
                const manufacture = watch("manufacture_date");
                if (manufacture && value < manufacture) {
                  return "Expiry date must be after manufacture date";
                }
                return true;
              },
            })}
          />
        </div>

        <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 gap-4 border border-gray-400 rounded-lg p-5 bg-white">
          {/* Unit */}
          <Controller
            name="purchase_unit"
            control={control}
            render={({ field }) => (
              <CRUDDropdown
                label="Purchase Unit"
                endpoint="unit"
                modalType="unit"
                modalSize="max-w-lg w-full"
                value={field.value}
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          <Controller
            name="sale_unit"
            control={control}
            render={({ field }) => (
              <CRUDDropdown
                label="Sale Unit"
                endpoint="unit"
                modalType="unit"
                modalSize="max-w-lg w-full"
                value={field.value}
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          <InputField
            type="number"
            id="conversion_factor"
            label="Conversion Factor"
            error={errors?.conversion_factor?.message}
            {...register("conversion_factor", {
              setValueAs: formatNumber,
              min: {
                value: 0,
                message: "Conversion factor cannot be nagetive ",
              },
            })}
            min="1"
          />
        </div>

        <Status watch={watch} control={control} />
      </div>

      <Button
        type="submit"
        className="bg-blue-600 text-white rounded-lg mt-5"
        onClick={handleSubmit(onSubmit)}
      >
        Save Product
      </Button>
    </>
  );
}

export default ProductForm;
