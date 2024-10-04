import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DetailSkeleton from "./DetailSkeleton"; // Detay Skeleton bileşeni
import useCrmCalls from "../../service/useCrmCalls"; // CRUD işlemleri için servis
import TaskModal from "../../components/TaskModal"; // Not düzenleme modalı
import { useState } from "react";

const TaskDetail = () => {
  const navigate = useNavigate();
  const { deleteData, updateData, loading, error } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { tasks } = useSelector((state) => state.crm);
  const { id } = useParams();

  // Notu bul
  const task = tasks.find((n) => n._id === id);

  // Loading durumu için skeleton göster
  if (loading) {
    return <DetailSkeleton />;
  }

  // Not bulunamadığında hata mesajı göster
  if (!task && !loading) {
    return <div className="p-6 text-center">task not found.</div>;
  }

  // Hata durumu
  if (error) {
    return (
      <div className="text-red-500 text-center mt-40">Task fetching error</div>
    );
  }

  // Tarih formatı için yardımcı fonksiyon
  const formatDate = (date) => {
    return new Date(date).toLocaleString("sv-SE", { timeZoneName: "short" });
  };

  // Silme işlemi için fonksiyon
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteData("tasks", task._id);
      navigate("/tasks"); // Silme işleminden sonra geri git
    }
  };

  const handleEdit = async (updatedData) => {
    await updateData("tasks", task._id, updatedData);
    setModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen mt-20 ms-[-25px] sm:ms-0  mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Task Details
      </h2>

      {/* Hata durumu */}
      {error && <div className="text-red-500 text-center">{error.message}</div>}

      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* Not bilgileri */}
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Task ID:</strong>
          <span>{task._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User ID:</strong>
          <span>{task.userId?._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User Name:</strong>
          <span>{task?.userId?.name}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Customer ID:</strong>
          <span>{task.customerId?._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Customer Name:</strong>
          <span>{task.customerId?.name}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 ">
          <strong>Description:</strong>
          <span>{task.taskDescription}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Due to Date:</strong>
          <span>{formatDate(task.dueDate)}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Status:</strong>
          <span
            className={`inline-block px-2 py-1 w-[5rem] rounded-full text-center text-xs font-semibold ${
              task.status === "completed"
                ? "bg-green-200 text-green-800"
                : task.status === "pending"
                ? "bg-red-200 text-red-800"
                : task.status === "in-progress"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {task.status === "completed"
              ? "completed"
              : task.status === "pending"
              ? "pending"
              : task.status === "in-progress"
              ? "in-progress"
              : "unknown"}
          </span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Priority:</strong>
          <span
            className={`inline-block px-2 py-1 rounded-full w-[5rem] text-center text-xs font-semibold ${
              task.priority === "high"
                ? "bg-red-200 text-red-800"
                : task.priority === "medium"
                ? "bg-yellow-200 text-yellow-800"
                : task.priority === "low"
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {task.priority || "N/A"}
          </span>
        </p>

        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Created At:</strong>
          <span>{formatDate(task.createdAt)}</span>
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
              setFormData(task);
              setModalOpen(true);
            }} // Düzenleme için modal aç
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full mr-2"
          >
            Edit task
          </button>
          <button
            onClick={handleDelete} // Silme işlemi
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full"
          >
            Delete task
          </button>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
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

export default TaskDetail;
