/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const NoteModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  const { user } = useSelector((state) => state.user);
  const { customers } = useSelector((state) => state.crm); // Müşterileri al

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, userId: user._id, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Enter tuşuna basıldığında formu gönder
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-blue-600 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold mb-6 text-white text-center">
          {formData?._id ? "Edit Note" : "Create Note"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="customerId" className="block text-white mb-2">
              Customer
            </label>
            <select
              name="customerId"
              id="customerId"
              value={formData.customerId || ""}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-200"
              required
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} {/* Müşteri adını göster */}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-white mb-2">
              Note Content
            </label>
            <textarea
              name="content"
              id="content"
              value={formData.content || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Enter tuşunu dinle
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 text-white py-2 px-4 rounded w-full hover:bg-red-700 transition mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition"
            >
              {formData?._id ? "Update Note" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
