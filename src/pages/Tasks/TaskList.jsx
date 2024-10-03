import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TaskSkeleton from "./TaskSkeleton"; // Skeleton bileşenini ekledik
import TaskModal from "../../components/TaskModal"; // Görev eklemek için modal bileşeni
import useCrmCalls from "../../service/useCrmCalls"; // API çağrıları için servis

const TaskList = () => {
  const { tasks, loading, error } = useSelector((state) => state.crm); // loading ve error'ı al
  const { user } = useSelector((state) => state.user); // Kullanıcı bilgileri
  const navigate = useNavigate();
  const { createData } = useCrmCalls(); // Görev yaratma fonksiyonu
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskDescription: "",
    customerId: "", // İlgili müşteri ID'si
    priority: "low", // Varsayılan öncelik
    status: "pending", // Varsayılan durum
  });

  const handleSubmit = (formData) => {
    createData("tasks", { ...formData, userId: user._id }); // Görev ekleme işlemi
    setModalOpen(false);
  };

  // Hata durumunu konsola yazdır
  useEffect(() => {
    if (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [error]);

  if (loading) {
    return <TaskSkeleton />; // Loading durumunda Skeleton döndür
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error occurred while fetching tasks.
      </div>
    ); // Hata durumu
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Task List</h2>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Create Task
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                User Name
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Customer Name
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Task
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Status
              </th>
              <th className="hidden md:block py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks?.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-3 text-center text-gray-500">
                  No tasks available.
                </td>
              </tr>
            ) : (
              tasks?.map((task) => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate(`/tasks/${task._id}`)}
                >
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                    {task.userId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {task.customerId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {task?.taskDescription || "N/A"}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
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
                  </td>
                  <td className="py-3 hidden md:block px-2  md:px-4 border-b text-[10px] md:text-base">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TaskModal
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

export default TaskList;
