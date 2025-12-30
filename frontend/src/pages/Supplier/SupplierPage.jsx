import React from "react";
import CustomerForm from "../../components/Forms/CustomerForm";
import CustomerList from "../../components/Lists/CustomerList";
import Button from "../../components/common/Button";
import { NavLink } from "react-router-dom";
import SupplierList from "../../components/Lists/SupplierList";

function SupplierPage() {
  return (
    <>
      <div className="flex justify-end">
        <NavLink to="addsupplier">
          <Button className="font-bold bg-blue-600 text-white rounded-lg my-5">
            + Add Supplier
          </Button>
        </NavLink>
      </div>
      <SupplierList />
    </>
  );
}

export default SupplierPage;
