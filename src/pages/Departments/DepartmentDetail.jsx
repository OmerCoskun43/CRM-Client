import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DepartmentModal from "../../components/DepartmentModal";
import useCrmCalls from "../../service/useCrmCalls";

const DepartmentDetail = () => {
  const { id } = useParams();
  const { departments } = useSelector((state) => state.crm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteData, updateData } = useCrmCalls();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const department = departments?.find((dept) => dept._id === id);

  if (!department) {
    return <div className="p-6 text-center">Department not found.</div>;
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this department?")) {
      deleteData("departments", department._id);
    }
  };

  const handleEdit = (updatedDepartment) => {
    updateData("departments", department._id, updatedDepartment);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen mt-20 mx-auto max-w-4xl relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Department Details
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 relative border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {department.name}
        </h3>
        <p className="text-gray-700">
          <strong>Description:</strong> {department.description}
        </p>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mr-2"
          >
            Delete Department
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setFormData(department);
            }}
            className="bg-blue-600 absolute top-0 right-0 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Edit Department
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
        <DepartmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEdit}
          initialData={department} // Mevcut departman verilerini modal'a geç
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </div>
  );
};

export default DepartmentDetail;
