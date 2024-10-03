import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NoteSkeleton from "./NoteSkeleton"; // Skeleton bileşeni
import NoteModal from "../../components/NoteModal"; // Not eklemek için modal bileşeni
import useCrmCalls from "../../service/useCrmCalls"; // API çağrıları için servis

const NoteList = () => {
  const { notes, loading, error } = useSelector((state) => state.crm);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { createData } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    customerId: "", // İlgili müşteri ID'si
  });

  const handleSubmit = (formData) => {
    createData("notes", { ...formData, userId: user._id });
    setModalOpen(false);
  };

  // Hata durumunu konsola yazdır
  useEffect(() => {
    if (error) {
      console.error("Error fetching notes:", error);
    }
  }, [error]);

  if (loading) {
    return <NoteSkeleton />; // Loading durumunda Skeleton döndür
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error occurred while fetching notes.
      </div>
    ); // Hata durumu
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Note List</h2>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Note
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Content
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Created At
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Customer Name
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr
                key={note._id}
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => navigate(`/notes/${note._id}`)}
              >
                <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                  {note.content}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                  {new Date(note.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                  {note.customerId?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <NoteModal
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

export default NoteList;
