import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCrmCalls from "../../service/useCrmCalls";
import { useState } from "react";
import CustomerModal from "../../components/CustomerModal"; // Yeni modal bileşeni

const CustomerList = () => {
  const { customers, departments } = useSelector((state) => state.crm);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { createData } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = (formData) => {
    createData("customers", { ...formData, userId: user._id });
    setModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
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
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Ad
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Email
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
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
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base text-black font-bold">
                  {customer.name}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
                  {customer.email}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
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
        <CustomerModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          departments={departments}
          user={user}
        />
      )}
    </div>
  );
};

export default CustomerList;
