/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

const UserModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  const { departments } = useSelector((state) => state.crm);
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (event) => {
    setProfilePic(event.currentTarget.files[0]);
  };

  const handleRemoveFile = () => {
    setProfilePic(null);
    document.getElementById("profilePic").value = "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Eğer departmentId değişiyorsa, onu da düzenleyelim
    if (name === "departmentId") {
      // console.log("value", value);
      const selectedDepartment = departments.find((dept) => dept._id === value);
      console.log("selectedDepartment", selectedDepartment);
      setFormData({ ...formData, departmentId: selectedDepartment });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Yeni bir FormData oluştur
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);

    // departmentId'nin bir değeri olup olmadığını kontrol et
    if (formData.departmentId && formData.departmentId._id) {
      formDataToSend.append("departmentId", formData.departmentId._id);
    } else {
      // Uygun bir hata mesajı göstermek için buraya bir şey ekleyebilirsiniz
      alert("Please select a valid department.");
      return; // Departman seçilmediyse işlemi durdur
    }

    if (profilePic) {
      formDataToSend.append("profilePic", profilePic); // Profil resmini ekle
    }

    // Form verilerini onSubmit'e gönder
    onSubmit(formDataToSend);
    onClose();
  };

  if (!isOpen) return null;

  console.log("formData", formData);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-blue-800 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold mb-6 text-white text-center">
          Edit User
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="departmentId" className="block text-white mb-2">
              Department
            </label>
            <select
              name="departmentId"
              id="departmentId"
              className="w-full p-2 rounded"
              value={formData.departmentId ? formData.departmentId._id : ""}
              onChange={handleInputChange}
            >
              <option value="">Select Department</option>
              {departments?.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="profilePic" className="block mb-2 text-white">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleFileChange}
              className="border bg-white border-gray-300 rounded p-2 w-full"
            />
            {profilePic && (
              <div className="mt-2">
                <div className="flex w-full justify-between text-gray-600 bg-green-300 p-2 overflow-hidden">
                  <p className="text-red-500">
                    Selected file:{" "}
                    <span className="text-sm text-gray-600">
                      {profilePic.name.length > 20
                        ? profilePic.name.slice(0, 30) + "..."
                        : profilePic.name}
                    </span>
                  </p>
                  <span
                    onClick={handleRemoveFile}
                    className="cursor-pointer w-25 font-bold text-red-500 bg-white hover:bg-red-500 hover:text-white py-1 px-2 rounded-full flex items-center"
                  >
                    X
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition w-full mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
            >
              Update User
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          X
        </button>
      </div>
    </div>
  );
};

export default UserModal;
