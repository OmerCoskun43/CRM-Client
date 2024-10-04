import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DetailSkeleton from "./DetailSkeleton"; // Detay Skeleton bileşeni
import useCrmCalls from "../../service/useCrmCalls"; // CRUD işlemleri için servis
import NoteModal from "../../components/NoteModal"; // Not düzenleme modalı
import { useState } from "react";

const NoteDetail = () => {
  const navigate = useNavigate();
  const { deleteData, updateData, loading, error } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { notes } = useSelector((state) => state.crm);
  const { id } = useParams();

  // Notu bul
  const note = notes.find((n) => n._id === id);

  // Loading durumu için skeleton göster
  if (loading) {
    return <DetailSkeleton />;
  }

  // Not bulunamadığında hata mesajı göster
  if (!note && !loading) {
    return <div className="p-6 text-center">Note not found.</div>;
  }

  // Hata durumu
  if (!error) {
    return (
      <div className="text-red-500 text-center mt-40">
        Error occurred while fetching note.
      </div>
    );
  }

  // Tarih formatı için yardımcı fonksiyon
  const formatDate = (date) => {
    return new Date(date).toLocaleString("sv-SE", { timeZoneName: "short" });
  };

  // Silme işlemi için fonksiyon
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteData("notes", note._id);
      navigate("/notes"); // Silme işleminden sonra geri git
    }
  };

  const handleEdit = async (updatedData) => {
    await updateData("notes", note._id, updatedData);
    setModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen mt-20 ms-[-25px] sm:ms-0  mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Note Details
      </h2>

      {/* Hata durumu */}
      {error && <div className="text-red-500 text-center">{error.message}</div>}

      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* Not bilgileri */}
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Note ID:</strong>
          <span>{note._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User ID:</strong>
          <span>{note.userId?._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User Name:</strong>
          <span>{note?.userId?.name}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Customer ID:</strong>
          <span>{note.customerId?._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Customer Name:</strong>
          <span>{note.customerId?.name}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 ">
          <strong>Content:</strong>
          <span>{note.content}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Created At:</strong>
          <span>{formatDate(note.createdAt)}</span>
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
              setFormData(note);
              setModalOpen(true);
            }} // Düzenleme için modal aç
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full mr-2"
          >
            Edit Note
          </button>
          <button
            onClick={handleDelete} // Silme işlemi
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full"
          >
            Delete Note
          </button>
        </div>
      </div>

      {isModalOpen && (
        <NoteModal
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

export default NoteDetail;
