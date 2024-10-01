/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SaleModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { products, customers } = useSelector((state) => state.crm);
  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
    price: 0,
    paymentMethod: "credit_card",
    status: "pending", // Varsayılan olarak "pending"
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-blue-800 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold mb-6 text-white text-center">
          {initialData?._id ? "Edit Sale" : "Create Sale"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="customerId" className="block text-white mb-2">
              Customer
            </label>
            <select
              name="customerId"
              id="customerId"
              value={formData.customerId}
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
            <label htmlFor="productId" className="block text-white mb-2">
              Product
            </label>
            <select
              name="productId"
              id="productId"
              value={formData.productId}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-white mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-white mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              min="10"
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-white mb-2">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            >
              <option value="credit_card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="paypal">Paypal</option>
              <option value="debit_card">Debit Card</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-white mb-2">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition w-full mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
            >
              {initialData._id ? "Update Sale" : "Create Sale"}
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          X
        </button>
      </div>
    </div>
  );
};

export default SaleModal;
