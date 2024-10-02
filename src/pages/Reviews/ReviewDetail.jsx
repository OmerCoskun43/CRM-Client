import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DetailSkeleton from "./DetailSkeleton"; // Detay Skeleton bileşeni
import useCrmCalls from "../../service/useCrmCalls"; // CRUD işlemleri için servis
import ReviewModal from "../../components/ReviewModal";
import { useState } from "react";

const ReviewDetail = () => {
  const navigate = useNavigate();
  const { deleteData, updateData, loading, error } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { reviews } = useSelector((state) => state.crm);
  const { id } = useParams();

  // İncelemeyi bul
  const review = reviews.find((r) => r._id === id);

  // Loading durumu için skeleton göster
  if (loading) {
    return <DetailSkeleton />;
  }

  // İnceleme bulunamadığında hata mesajı göster
  if (!review && !loading) {
    return <div className="p-6 text-center">Review not found.</div>;
  }

  // Hata durumu
  if (error) {
    return <div className="text-red-500 text-center">{error.message}</div>;
  }

  // Tarih formatı için yardımcı fonksiyon
  const formatDate = (date) => {
    return new Date(date).toLocaleString("sv-SE", { timeZoneName: "short" });
  };

  // Silme işlemi için fonksiyon
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteData("reviews", review._id);
      navigate("/reviews"); // Silme işleminden sonra geri git
    }
  };

  const handleEdit = async (updatedData) => {
    await updateData("reviews", review._id, updatedData);
    setModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen mt-20 mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Review Details
      </h2>

      {/* Hata durumu */}
      {error && <div className="text-red-500 text-center">{error.message}</div>}

      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* İnceleme bilgileri */}
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Review ID:</strong>
          <span>{review._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User ID:</strong>
          <span>{review.userId?._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User:</strong>
          <span>{review.userId?.name}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Rating:</strong>
          <span>{review.rating} / 5</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Comment:</strong>
          <span>{review.comment}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Product:</strong>
          <span>{review.productId?.name}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Submitted At:</strong>
          <span>{formatDate(review.createdAt)}</span>
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)} // Geri git butonu
            className="bg-green-600 absolute top-0 right-0 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Go Back
          </button>
          <button
            onClick={() => {
              setFormData(review);
              setModalOpen(true);
            }} // Düzenleme için modal aç
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full mr-2"
          >
            Edit Review
          </button>
          <button
            onClick={handleDelete} // Silme işlemi
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full"
          >
            Delete Review
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleEdit}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default ReviewDetail;
