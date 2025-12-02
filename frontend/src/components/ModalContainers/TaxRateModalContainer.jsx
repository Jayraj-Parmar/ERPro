import CrudModalContainer from "./common/CrudModalContainer";
import TaxRateForm from "../Forms/TaxRateForm";
import TaxRateList from "../Lists/TaxRateList";

function TaxRateModalContainer({ endpoint, label }) {
  return (
    <CrudModalContainer
      endpoint={endpoint}
      label={label}
      FormComponent={TaxRateForm}
      ListComponent={TaxRateList}
    />
  );
}

export default TaxRateModalContainer;
