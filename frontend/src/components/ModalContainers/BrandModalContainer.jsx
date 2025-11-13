import CrudModalContainer from "./common/CrudModalContainer";
import BrandForm from "../Forms/BrandForm";
import BrandList from "../Lists/BrandList";

function WarehouseModalContainer({ endpoint, label }) {
  return (
    <CrudModalContainer
      endpoint={endpoint}
      label={label}
      FormComponent={BrandForm}
      ListComponent={BrandList}
    />
  );
}

export default WarehouseModalContainer;
