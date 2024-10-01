import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCrmCalls from "../../service/useCrmCalls";
import ProductModal from "../../components/ProductModal";

const ProductList = () => {
  const { products } = useSelector((state) => state.crm);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { createData } = useCrmCalls();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
    isActive: true,
  });

  const handleSubmit = (formData) => {
    createData("products", formData);
    setModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product List</h2>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Product
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Name
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Price
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() =>
                  navigate(`/products/${product._id}`, { state: product })
                }
              >
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base text-black font-bold">
                  {product.name}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
                  {product.price}₺
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
                  {product.stockQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default ProductList;
