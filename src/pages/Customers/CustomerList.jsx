import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCrmCalls from "../../service/useCrmCalls";

const CustomerList = () => {
  const { customers, departments } = useSelector((state) => state.crm);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { createData } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);
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

    createData("customers", { ...formData, userId: user._id });
    setModalOpen(false); // Modalı kapat
    setFormData({
      name: "",
      email: "",
      status: "active",
      address: "",
      phone: "",
      departmentId: "",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Müşteri Listesi</h2>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Müşteri Ekle
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="py-3 px-4 border-b text-left text-sm md:text-base">
                Ad
              </th>
              <th className="py-3 px-4 border-b text-left text-sm md:text-base">
                Email
              </th>
              <th className="py-3 px-4 border-b text-left text-sm md:text-base">
                Durum
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer._id}
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => navigate(`/customers/${customer._id}`)}
              >
                <td className="py-3 px-4 border-b text-sm md:text-base text-black font-bold">
                  {customer.name}
                </td>
                <td className="py-3 px-4 border-b text-sm md:text-base">
                  {customer.email}
                </td>
                <td className="py-3 px-4 border-b text-sm md:text-base">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      customer.status === "active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-semibold mb-4">Müşteri Ekle</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Ad"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              >
                <option value="active">active</option>
                <option value="inactive">pasive</option>
              </select>
              <input
                type="text"
                name="address"
                placeholder="Adres"
                value={formData.address}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
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

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Ekle
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="ml-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
              >
                İptal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
