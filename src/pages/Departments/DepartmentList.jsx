import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DepartmentModal from "../../components/DepartmentModal";
import useCrmCalls from "../../service/useCrmCalls";
import DepartmentSkeleton from "./DepartmentSkeleton"; // Yükleme sırasında gösterilecek skeleton bileşeni

const DepartmentList = () => {
  const { departments, loading, error } = useSelector((state) => state.crm); // Redux'dan departmanlar, loading ve error durumlarını al
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { createData } = useCrmCalls();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (formData) => {
    createData("departments", formData);
    setModalOpen(false);
  };

  if (loading) {
    return <DepartmentSkeleton />; // Yükleniyorsa skeleton göster
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 mt-40">
        <p>Error occurred while fetching departments.</p>
      </div>
    ); // Hata varsa mesaj göster
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Department List</h2>
      {user?.isAdmin && (
        <button
          onClick={() => setModalOpen(true)}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded z-10 relative"
        >
          Add Department
        </button>
      )}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg relative z-10">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Name
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {departments?.map((department) => (
              <tr
                key={department._id}
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                onClick={
                  user?.isAdmin
                    ? () => navigate(`/departments/${department._id}`)
                    : undefined
                }
              >
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base text-black font-bold">
                  {department.name}
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
                  {department.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <DepartmentModal
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

export default DepartmentList;
