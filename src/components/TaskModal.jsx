/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const TaskModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  const { customers } = useSelector((state) => state.crm); // Müşterileri al

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

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
          {formData?._id ? "Edit Task" : "Create Task"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
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
              className="w-full p-2 rounded bg-gray-200"
              required
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="taskDescription" className="block text-white mb-2">
              Task Description
            </label>
            <textarea
              name="taskDescription"
              id="taskDescription"
              value={formData.taskDescription || ""}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-white mb-2">
              Due Date
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              id="dueDate"
              value={formatDate(formData.eventDate) || getCurrentDateTime()}
              onChange={handleInputChange}
              min={getCurrentDateTime()}
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-white mb-2">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status || ""}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-200"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-white mb-2">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              value={formData.priority || ""}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
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
              {formData?._id ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
