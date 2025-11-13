import { useForm, Controller } from "react-hook-form";
import InputField from "../common/InputField.jsx";
import CRUDDropdown from "../common/CRUDDropdown.jsx";
import Button from "../common/Button.jsx";
import Status from "../common/Status.jsx";

function ProductForm() {
  const {
    watch,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      conversion_factor: 1,
      opening_stock: 0,
      minimum_order_quantity: 0,
      reorder_level: 0,
    },
  });

  return (
    <>
      <div className="text-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Name */}
          <InputField
            type="text"
            id="product"
            label="Product Name"
            error={errors?.name?.message}
            {...register("name", { required: "Name is required." })}
          />
          {/* Warehouse */}
          <CRUDDropdown
            label="Warehouse"
            endpoint="warehouse"
            modalType="warehouse"
            modalSize="max-w-6xl w-full"
          />
          {/* Category */}
          <CRUDDropdown
            label="Category"
            endpoint="category"
            modalType="category"
            modalSize="max-w-lg w-full"
          />
          {/* Brand */}
          <CRUDDropdown
            label="Brand"
            endpoint="brand"
            modalType="brand"
            modalSize="max-w-6xl w-full"
          />
          {/* Unit */}
          <CRUDDropdown
            label="Purchase Unit"
            endpoint="unit"
            modalType="unit"
            modalSize="max-w-lg w-full"
          />
          <CRUDDropdown
            label="Sale Unit"
            endpoint="unit"
            modalType="unit"
            modalSize="max-w-lg w-full"
          />
          <InputField
            type="number"
            id="conversion_factor"
            label="Conversion Factor"
            error={errors?.conversion_factor?.message}
            {...register("conversion_factor")}
            min="1"
          />
          {/* Description */}
          <div className="col-span-2">
            <label>Description</label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none bg-white"
            ></textarea>
          </div>
        </div>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          {/* Quantity */}
          <InputField
            type="number"
            id="opening_stock"
            label="Opening Stock"
            error={errors?.opening_stock?.message}
            {...register("opening_stock", {
              required: "Opening Stock is required.",
            })}
            min="0"
          />
          {/* Minimum Order Quantity */}
          <InputField
            type="number"
            id="minimum_order_quantity"
            label="Minimum Order Quantity"
            error={errors?.minimum_order_quantity?.message}
            {...register("minimum_order_quantity", {
              required: "Minimum Order Quantity is required.",
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
            })}
            min="0"
          />
          {/* Purchase Price */}
          <InputField
            type="text"
            id="purchase_price"
            label="Purchase Price"
            error={errors?.purchase_price?.message}
            {...register("purchase_price", {
              required: "Purchase Price is required.",
            })}
          />
          {/* Sale Price */}
          <InputField
            type="text"
            id="sale_price"
            label="Sale Price"
            error={errors?.sale_price?.message}
            {...register("sale_price", {
              required: "Sale Price is required.",
            })}
          />
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-4">
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
            {...register("expiry_date")}
          />
          <InputField
            type="text"
            id="batch_number"
            label="Batch number"
            error={errors?.batch_number?.message}
            {...register("batch_number")}
          />
        </div>
        <div>
          <Status watch={watch} control={control} />
        </div>
      </div>

      <Button type="submit" className="bg-blue-600 text-white rounded-lg mt-5">
        Save Product
      </Button>
    </>
  );
}

export default ProductForm;
