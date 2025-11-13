import CrudModalContainer from "./common/CrudModalContainer";
import WarehouseForm from "../Forms/WarehouseForm";
import WarehouseList from "../Lists/WarehouseList";

function WarehouseModalContainer({ endpoint, label }) {
  return (
    <CrudModalContainer
      endpoint={endpoint}
      label={label}
      FormComponent={WarehouseForm}
      ListComponent={WarehouseList}
    />
  );
}

export default WarehouseModalContainer;
