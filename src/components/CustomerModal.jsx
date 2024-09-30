/* eslint-disable react/prop-types */
import { useState } from "react";

const CustomerModal = ({ isOpen, onClose, onSubmit, departments, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "active",
    address: "",
    phone: "",
    departmentId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      status: "active",
      address: "",
      phone: "",
      departmentId: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose} // Modal dışına tıklama ile kapanma
    >
      <div
        className="bg-gradient-to-br from-blue-800 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 mt-8"
        onClick={(e) => e.stopPropagation()} // Modal içindeki tıklamaları engelle
      >
        <h3 className="text-3xl font-bold mb-6 text-white text-center">
          Add Customer
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleInputChange}
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            {user?.departmentId ? (
              <option value={user?.departmentId}></option>
            ) : (
              <>
                <option value="">Select Department</option>
                {departments?.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </>
            )}
          </select>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-transform transform hover:scale-105 shadow-lg font-bold"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white  py-2 px-6 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
