import PartyList from "../Party/PartyList";

function CustomerList() {
  const columns = {
    name: { label: "Name", default: true },
    company_name: { label: "Company Name", default: true },
    contact_number: { label: "Conatact No.", default: true },
    opening_balance: { label: "Opening Balance", default: false },
    current_balance: { label: "Current Balance", default: true },
    whatsapp_number: { label: "Whatsapp No.", default: false },
    email: { label: "Email", default: false },
    gst_number: { label: "GSTIN", default: false },
    address: { label: "Address", default: false },
    village_city: { label: "Village/City", default: true },
    subdistrict: { label: "Subdistrict", default: false },
    district: { label: "District", default: false },
    status: { label: "Status", default: true },
  };
  return (
    <>
      <PartyList type="customer" columns={columns} />
    </>
  );
}

export default CustomerList;
