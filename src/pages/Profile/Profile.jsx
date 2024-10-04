import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import useCrmCalls from "../../service/useCrmCalls";
import useAxios from "../../service/useAxios";
import { logout, update } from "../../features/userSlice";
import { notifyError, notifySuccess } from "../../helper/HotToast";
import ImageModal from "./ImageModal";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const { user } = useSelector((state) => state.user); // user objesindeki bilgileri çekiyoruz
  const [showModal, setShowModal] = useState(false);
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();
  const { deleteData, loading, error } = useCrmCalls(); // Loading ve error'u alıyoruz
  const [showImageModal, setShowImageModal] = useState(false); // Resim modal'ı için state

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleImageModalClose = () => {
    setShowImageModal(false);
  };

  const handleProfileSubmit = async (updatedUser) => {
    try {
      const { data } = await axiosWithToken.put(
        `/users/${user._id}`,
        updatedUser
      );
      dispatch(update(data));

      notifySuccess("Profile Updated Successfully");

      setShowModal(false);
    } catch (error) {
      console.log("update User Error", error.response.data.message);
      notifyError("Profile Update Failed", error.response.data.message);
    }
  };

  const handleImageSubmit = async (updatedUser) => {
    try {
      const { data } = await axiosWithToken.put(
        `/users/${user._id}`,
        updatedUser
      );
      dispatch(update(data));
      notifySuccess("Profile Picture Updated Successfully");
    } catch (error) {
      notifyError("Profile Picture Update Failed", error.response.data.message);
    }
  };

  const handleDeleteUser = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      deleteData("users", user._id);
      dispatch(logout());
      notifySuccess("Account Deleted Successfully");
    }
  };

  useEffect(() => {
    setShowModal(false);
  }, [user]);

  if (loading) {
    return <ProfileSkeleton />; // Loading durumunda skeleton göstereceğiz
  }

  if (error) {
    return <div className="text-red-500">Failed to load profile: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Profile Information
      </h2>

      <div
        onClick={() => setShowImageModal(true)}
        className="relative group flex flex-col items-center mb-6"
      >
        {/* Kullanıcı Resmi */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          {user?.profilePic || user?.photoURL ? (
            <img
              src={
                user?.profilePic
                  ? user?.profilePic.includes("https")
                    ? user?.profilePic
                    : `${import.meta.env.VITE_BASE_URL}${user.profilePic}`
                  : user?.photoURL || "defaultProfilePic.png"
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full cursor-pointer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-2xl shadow-md ">
              N/A
            </div>
          )}

          {/* Update Picture Text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-200">
            <span className="text-white text-sm font-semibold">
              Update Picture
            </span>
          </div>
        </div>

        {/* Kullanıcı ismi */}
        <h3 className="text-xl font-bold text-gray-700 mt-4">{user?.name}</h3>
      </div>

      <div className="flex justify-between items-center mb-4 z-10 relative">
        <button
          onClick={handleModalOpen}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Edit Profile
        </button>
        <button
          onClick={handleDeleteUser}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Delete Account
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg relative ">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Key
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {/* User bilgilerini burada listele */}
            <tr className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                User ID
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                {user?._id || "N/A"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                Name
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                {user?.name
                  ? user.name[0].toUpperCase() + user.name.slice(1)
                  : "N/A"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                Email
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                {user?.email || "N/A"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                Department Id
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                {user?.departmentId?._id || "N/A"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                Department Name
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                {user?.departmentId?.name || "N/A"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                Is Admin
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                {user?.isAdmin ? "Yes" : "No"}
              </td>
            </tr>
            <tr className="hover:bg-gray-100 cursor-pointer transition-colors duration-200">
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                Is Lead
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                {user?.isLead ? "Yes" : "No"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Profil Modal */}
      {showModal && (
        <ProfileModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubmit={handleProfileSubmit}
          user={user}
        />
      )}

      {/* Resim Modal */}
      {showImageModal && (
        <ImageModal
          isOpen={showImageModal}
          onClose={handleImageModalClose}
          handleImageSubmit={handleImageSubmit}
          user={user}
        />
      )}
    </div>
  );
};

export default Profile;
