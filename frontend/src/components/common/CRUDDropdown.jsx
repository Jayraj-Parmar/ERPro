import { useEffect } from "react";
import Select, { components } from "react-select";
import { TbSettings } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../app/slices/modalSlice";
import { fetchData } from "../../app/slices/CrudSlice";
import Modal from "./Modal";
import Crud from "../crud/crud";
import WarehouseModalContainer from "../ModalContainers/WarehouseModalContainer";
import UnitModalContainer from "../ModalContainers/UnitModalContainer";
import BrandModalContainer from "../ModalContainers/BrandModalContainer";
import CategoryModalContainer from "../ModalContainers/CategoryModalContainer";

function CRUDDropdown({ label, endpoint, modalType, modalSize, ...props }) {
  const dispatch = useDispatch();
  const { isOpen, modalType: currentModalType } = useSelector(
    (state) => state.modal
  );
  const { data } = useSelector((state) => state.crud);
  const list = data[endpoint] || [];

  useEffect(() => {
    dispatch(fetchData(endpoint));
  }, [dispatch]);

  const options = list.map((item) => ({ value: item._id, label: item.name }));

  const handleManage = () => {
    dispatch(openModal({ modalType }));
  };

  const CustomMenuList = (props) => (
    <components.MenuList {...props}>
      <div className="border-b border-gray-200 py-2 px-2 hover:bg-blue-100 sticky top-0 bg-white">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleManage();
          }}
          className="flex items-center w-full text-blue-600"
        >
          <TbSettings size={18} className="mr-2" />
          {`Manage ${label}`}
        </button>
      </div>
      {props.children}
    </components.MenuList>
  );

  const isCurrentModalOpen = isOpen && currentModalType === modalType;

  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <Select
        {...props}
        isClearable
        options={options}
        components={{ MenuList: CustomMenuList }}
        placeholder={`Select or Add ${label}`}
      />

      {isCurrentModalOpen && (
        <Modal
          open={isCurrentModalOpen}
          size={modalSize || "w-md"}
          heading={`Manage ${label}`}
          onClose={() => dispatch(closeModal())}
        >
          <div className="px-4">
            {(() => {
              if (endpoint === "warehouse") {
                return (
                  <WarehouseModalContainer label={label} endpoint={endpoint} />
                );
              } else if (endpoint === "unit") {
                return <UnitModalContainer label={label} endpoint={endpoint} />;
              } else if (endpoint === "category") {
                return (
                  <CategoryModalContainer label={label} endpoint={endpoint} />
                );
              } else if (endpoint === "brand") {
                return (
                  <BrandModalContainer label={label} endpoint={endpoint} />
                );
              }
            })()}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CRUDDropdown;
