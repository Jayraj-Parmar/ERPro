import { TbX } from "react-icons/tb";

function Modal({ open, onClose, heading, size = "w-[600px]", children }) {
  if (!open) return null;

  return (
    <div className="bg-black/50 fixed top-0 left-0 flex justify-center w-full h-full z-40">
      <div
        className={`bg-white rounded-lg shadow-lg flex flex-col ${size} max-h-[90vh]`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 font-medium px-4 py-2 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <span className="text-md">{heading}</span>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <TbX size={20} />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
