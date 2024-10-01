import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import UserModal from "../../components/UserModal";
import DetailSkeleton from "./DetailSkeleton";
import useCrmCalls from "../../service/useCrmCalls";
import { useSelector } from "react-redux";

const UserDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { deleteData, updateData, loading, error } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { users } = useSelector((state) => state.crm);

  const { id } = params;

  // Kullanıcıyı bul
  const user = users?.find((user) => user._id === id);

  // Kullanıcı bulunamadığında hata mesajı göster
  if (!user && !loading) {
    return <div className="p-6 text-center">User not found.</div>;
  }

  // Loading durumu için skeleton göster
  if (loading) {
    return <DetailSkeleton />;
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteData("users", user._id);
      navigate("/users");
    }
  };

  const handleEdit = async (updatedData) => {
    await updateData("users", user._id, updatedData);
    setModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen mt-20 mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        User Details
      </h2>

      {/* Hata durumu */}
      {error && <div className="text-red-500 text-center">{error.message}</div>}

      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* Kullanıcı bilgileri */}
        <p className="text-gray-700 flex justify-between items-center mt-5 pe-2 rounded-lg bg-gradient-to-t from-gray-200 via-white to-gray-200">
          <strong>Profile Picture:</strong>
          <img
            src={
              user?.profilePic
                ? user?.profilePic.includes("https")
                  ? user?.profilePic
                  : `${import.meta.env.VITE_BASE_URL}${user.profilePic}`
                : "defaultProfilePic.png"
            }
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full"
          />
        </p>

        {/* Kullanıcı bilgileri */}
        {[
          { label: "ID", value: user._id },
          { label: "Name", value: user.name },
          { label: "Email", value: user.email },
          { label: "Department", value: user.departmentId.name },
          { label: "Is Admin", value: user.isAdmin ? "Yes" : "No" },
          { label: "Is Lead", value: user.isLead ? "Yes" : "No" },
          { label: "Is Active", value: user.isActive ? "Yes" : "No" },
          {
            label: "Last Login",
            value: new Date(user.lastLogin).toLocaleString(),
          },
          {
            label: "Created At",
            value: new Date(user.createdAt).toLocaleString(),
          },
          {
            label: "Updated At",
            value: new Date(user.updatedAt).toLocaleString(),
          },
        ].map(({ label, value }) => (
          <p
            className="text-gray-700 flex justify-between items-center mt-4"
            key={label}
          >
            <strong>{label}:</strong>
            <span>{value}</span>
          </p>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded w-full hover:bg-red-700 transition mr-2"
          >
            Delete User
          </button>
          <button
            onClick={() => {
              setFormData(user);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded w-full block hover:bg-blue-700 transition"
          >
            Edit User
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ml-2 absolute top-0 right-0"
          >
            Go Back
          </button>
        </div>
      </div>

      {isModalOpen && (
        <UserModal
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

export default UserDetail;
