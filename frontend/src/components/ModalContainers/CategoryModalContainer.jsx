import CrudModalContainer from "./common/CrudModalContainer";
import CategoryForm from "../Forms/CategoryForm";
import CategoryList from "../Lists/CategoryList";

function UnitModalContainer({ endpoint, label }) {
  return (
    <CrudModalContainer
      endpoint={endpoint}
      label={label}
      FormComponent={CategoryForm}
      ListComponent={CategoryList}
    />
  );
}

export default UnitModalContainer;
