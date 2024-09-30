/* eslint-disable react/prop-types */

const DepartmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      description: "",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter tuşu ile yeni satır eklenmesini engelle
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-blue-800 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold mb-6 text-white text-center">
          {formData?._id ? "Edit Department" : "Add Department"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Department Name"
            value={formData?.name}
            onChange={handleInputChange}
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData?.description}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Enter tuşunu dinle
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-transform transform hover:scale-105 shadow-lg font-bold"
            >
              {formData?._id ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;
