/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const EventModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  const { user } = useSelector((state) => state.user);
  const { customers } = useSelector((state) => state.crm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, userId: user._id, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  // Tarih formatı için yardımcı fonksiyon
  const formatDate = (date) => {
    return date ? new Date(date).toISOString().substring(0, 16) : "";
  };

  // Bugünün tarih ve saatini almak için yardımcı fonksiyon
  const getCurrentDateTime = () => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now - timezoneOffset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  };

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
          {formData?._id ? "Edit Event" : "Create Event"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="customerId" className="block text-white mb-2">
              Customer
            </label>
            <select
              name="customerId"
              id="customerId"
              value={
                typeof formData.customerId === "object"
                  ? formData.customerId._id
                  : formData.customerId
              }
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded"
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="eventType" className="block text-white mb-2">
              Event Type
            </label>
            <input
              type="text"
              name="eventType"
              id="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eventDate" className="block text-white mb-2">
              Event Date
            </label>
            <input
              type="datetime-local"
              name="eventDate"
              id="eventDate"
              value={formatDate(formData.eventDate) || getCurrentDateTime()}
              onChange={handleInputChange}
              min={getCurrentDateTime()} // Günümüz tarih ve saatini min olarak ayarlama
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="details" className="block text-white mb-2">
              Details
            </label>
            <textarea
              name="details"
              id="details"
              value={formData.details}
              onChange={handleInputChange}
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
              {formData?._id ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
