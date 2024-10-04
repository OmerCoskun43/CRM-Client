import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SaleModal from "../../components/SaleModal";
import SaleSkeleton from "./SaleSkeleton"; // Yeni bileşeni import et
import useCrmCalls from "../../service/useCrmCalls";

const SaleList = () => {
  const { sales, loading, error } = useSelector((state) => state.crm);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
    price: 0,
    paymentMethod: "credit_card",
  });
  const { createData } = useCrmCalls();

  const handleSubmit = async (data) => {
    await createData("sales", data);
    setModalOpen(false);
    setFormData({
      customerId: "",
      productId: "",
      quantity: 1,
      price: 0,
      paymentMethod: "credit_card",
    });
  };

  const totalProfit = sales.reduce((acc, sale) => {
    return acc + sale.totalProfit;
  }, 0);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Sales List Loading...
        </h2>
        <div className="flex justify-between items-center">
          <button className="mb-4 bg-gray-300 text-gray-300 animate-pulse  py-2 px-4 rounded">
            Create Sale
          </button>
          <h1 className="bg-gray-300 text-gray-300 py-2 px-4 rounded animate-pulse mb-4">
            Total Profit : ₺<span className="font-bold "> {totalProfit} </span>
          </h1>
        </div>
        <SaleSkeleton /> {/* Loading durumu için skeleton bileşeni */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p text-center min-h-screen mt-40 mx-[-24px] md:mx-0 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales List</h2>
        <div className="text-red-500">An error occurred: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sales List</h2>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setModalOpen(true)}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded relative z-20"
        >
          Create Sale
        </button>
        <h1 className="bg-purple-500 text-white py-2 px-4 rounded mb-4">
          Total Profit : ₺<span className="font-bold "> {totalProfit} </span>
        </h1>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg relative">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Product Name
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Quantity
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Price
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Date
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-3 text-center text-gray-500">
                  No sales available.
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr
                  key={sale._id}
                  className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() =>
                    navigate(`/sales/${sale._id}`, {
                      state: { saleDetail: sale },
                    })
                  }
                >
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                    {sale.productId.name}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {sale.quantity}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {sale.price}₺
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {new Date(sale.updatedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-center text-xs font-semibold ${
                        sale.status === "completed"
                          ? "bg-green-200 text-green-800 w-[4.5rem]"
                          : sale.status === "canceled"
                          ? "bg-red-200 text-red-800 w-[4.5rem]"
                          : "bg-yellow-200 text-yellow-800 w-[4.5rem]"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <SaleModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={formData}
        />
      )}
    </div>
  );
};

export default SaleList;
