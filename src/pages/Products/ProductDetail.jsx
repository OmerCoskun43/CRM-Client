import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductModal from "../../components/ProductModal";
import useCrmCalls from "../../service/useCrmCalls";
import DetailSkeleton from "./DetailSkeleton"; // DetailSkeleton bileşenini içe aktarıyoruz

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state; // Burada state ile gelen ürün verisini alıyoruz
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteData, updateData } = useCrmCalls();
  const [formData, setFormData] = useState(product);
  const navigate = useNavigate();

  const { loading, error } = useCrmCalls(); // Yüklenme ve hata durumu

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

  const handleEdit = (updatedProduct) => {
    updateData("products", product._id, updatedProduct);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen mt-20 mx-auto max-w-4xl relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Product Details
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 relative border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {product.name}
        </h3>
        <p className="text-gray-700">
          <strong>Description:</strong> {product.description}
        </p>
        <p className="text-gray-700">
          <strong>Price:</strong> {product.price}₺
        </p>
        <p className="text-gray-700">
          <strong>Stock Quantity:</strong> {product.stockQuantity}
        </p>
        <p className="text-gray-700">
          <strong>Category:</strong>{" "}
          {product.categoryId.name || "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>Status:</strong> {product.isActive ? "Active" : "Inactive"}
        </p>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mr-2"
          >
            Delete Product
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setFormData(product);
            }}
            className="bg-blue-600 absolute top-0 right-0 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Edit Product
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full ml-2"
          >
            Go Back
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEdit}
          initialData={product}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </div>
  );
};

export default ProductDetail;
