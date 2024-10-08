import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCrmCalls from "../../service/useCrmCalls";
import { useState } from "react";
import CustomerModal from "../../components/CustomerModal"; // Yeni modal bileşeni
import CustomerSkeleton from "./CustomerSkeleton"; // Skeleton bileşeni
import { useEffect } from "react";

const CustomerList = () => {
  const { customers, loading, error } = useSelector((state) => state.crm);
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

  const handleSubmit = (formData) => {
    createData("customers", { ...formData, userId: user._id });
    setModalOpen(false);
  };

  // Hata durumunu konsola yazdır
  useEffect(() => {
    if (error) {
      console.error("Error fetching customers:", error);
    }
  }, [error]);

  if (loading) {
    return <CustomerSkeleton />; // Loading durumunda Skeleton döndür
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 mt-40">
        Error occurred while fetching customers.
      </div>
    ); // Hata durumu
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer List</h2>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded relative z-10"
      >
        Add Customer
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg relative z-10">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Name
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Email
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Status
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
                <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                  {customer.name}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                  {customer.email}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-center text-xs font-semibold ${
                      customer.status === "active"
                        ? "bg-green-200 text-green-800 w-[4rem]"
                        : "bg-red-200 text-red-800 w-[4rem]"
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
          user={user}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default CustomerList;
