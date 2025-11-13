import CrudModalContainer from "./common/CrudModalContainer";
import UnitForm from "../Forms/UnitForm";
import UnitList from "../Lists/UnitList";

function UnitModalContainer({ endpoint, label }) {
  return (
    <CrudModalContainer
      endpoint={endpoint}
      label={label}
      FormComponent={UnitForm}
      ListComponent={UnitList}
    />
  );
}

export default UnitModalContainer;
