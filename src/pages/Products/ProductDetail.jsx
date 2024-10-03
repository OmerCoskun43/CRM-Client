import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ProductModal from "../../components/ProductModal";
import useCrmCalls from "../../service/useCrmCalls";
import DetailSkeleton from "./DetailSkeleton"; // DetailSkeleton bileşenini içe aktarıyoruz
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, error } = useSelector((state) => state.crm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
    isActive: true,
  });
  const navigate = useNavigate();
  const { deleteData, updateData } = useCrmCalls();

  const product = products.find((product) => product._id === id);

  if (loading) {
    return <DetailSkeleton />; // Yükleniyor durumunda DetailSkeleton göster
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>; // Hata durumu
  }

  if (!product) {
    return <div className="p-6 text-center">Product not found.</div>;
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteData("products", product._id);
    }
  };

  const handleUpdate = (updatedProduct) => {
    updateData("products", product._id, updatedProduct);
    setIsModalOpen(false);
  };

  const openEditModal = () => {
    setFormData(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 min-h-screen mt-20 mx-auto max-w-4xl relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Product Details
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 relative border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {product.name} {/* Ürün ismi */}
        </h3>

        {/* Ürün ID */}
        <div className="flex items-center justify-between">
          <p className="text-gray-700">
            <strong>ID:</strong>
          </p>
          <div className="text-gray-700">{product._id}</div>
        </div>

        {/* Ürün Açıklaması */}
        <div className="flex items-center justify-between">
          <p className="text-gray-700">
            <strong>Description:</strong>
          </p>
          <div className="text-gray-700">{product.description}</div>
        </div>

        {/* Ürün Fiyatı */}
        <div className="flex items-center justify-between">
          <p className="text-gray-700">
            <strong>Price:</strong>
          </p>
          <div className="text-gray-700">{product.price}</div>
        </div>

        {/* Stok Miktarı */}
        <div className="flex items-center justify-between">
          <p className="text-gray-700">
            <strong>Stock Quantity:</strong>
          </p>
          <div className="text-gray-700">{product.stockQuantity}</div>
        </div>

        {/* Kategori */}
        <div className="flex items-center justify-between">
          <p className="text-gray-700">
            <strong>Category:</strong>
          </p>
          <div className="text-gray-700">{product.categoryId.name}</div>{" "}
          {/* categoryId burada nesne olduğu için name alanına erişim */}
        </div>

        {/* Durum */}
        <div className="flex items-center justify-between">
          <p className="text-gray-700">
            <strong>Status:</strong>
          </p>
          <div className="text-gray-700">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                product.isActive
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {product.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row justify-between mt-6">
          <button
            onClick={handleDelete} // Silme butonu
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mb-2 sm:mb-0 sm:mr-2"
          >
            Delete Product
          </button>
          <button
            onClick={openEditModal} // Düzenleme butonu
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full mb-2 sm:mb-0 sm:mr-2"
          >
            Edit Product
          </button>
          <button
            onClick={() => navigate(-1)} // Geri git butonu
            className="bg-green-600 absolute top-0 right-0 text-white py-2 px-4 rounded hover:bg-green-700 transition "
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Modal Bileşeni */}
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdate}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default ProductDetail;
