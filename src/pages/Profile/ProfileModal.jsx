/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileModal = ({ user, onClose, onSubmit }) => {
  const { departments } = useSelector((state) => state.crm);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "", // Şifre alanı
    departmentId: user.departmentId?._id || "",
    isAdmin: user?.isAdmin || false,
    isLead: user?.isLead || false,
    profilePic: null, // Profil resmini tutacak alan
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "", // Şifreyi boş bırakıyoruz
        departmentId: user.departmentId?._id,
        isAdmin: user.isAdmin,
        isLead: user.isLead,
        profilePic: null, // Başlangıçta profil resmi yok
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "isAdmin" || name === "isLead" ? value === "true" : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePic: e.target.files[0], // Dosya nesnesini güncelle
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.departmentId) {
      // Eğer department seçilmemişse bir hata mesajı göster
      alert("Please select a department.");
      return;
    }

    const dataToSubmit = new FormData();

    // FormData'ya ekle
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("email", formData.email);
    if (formData.password) {
      dataToSubmit.append("password", formData.password); // Şifre mevcutsa ekle
    }
    dataToSubmit.append("departmentId", formData.departmentId);
    dataToSubmit.append("isAdmin", formData.isAdmin);
    dataToSubmit.append("isLead", formData.isLead);
    if (formData.profilePic) {
      dataToSubmit.append("profilePic", formData.profilePic); // Profil resmi mevcutsa ekle
    }

    onSubmit(dataToSubmit); // Güncelleme işlemi
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50  flex justify-center z-50 items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-blue-800 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-4 w-10/12 md:w-2/5 mt-12 modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-2 text-white text-center">
          {user?.name ? "Edit Profile" : "Create Profile"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white ">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white ">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded"
              required
            />
          </div>

          {/* Şifre inputu */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-white ">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded"
            />
          </div>

          {/* department inputu */}
          <div className="mb-4">
            <label htmlFor="departmentId" className="block text-white ">
              Department
            </label>
            <select
              name="departmentId"
              id="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className="w-full p-2 rounded"
            >
              <option value="">Select Department</option>
              {departments?.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* Profil resmi yükleme */}
          <div className="mb-4">
            <label htmlFor="profilePic" className="block text-white ">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              onChange={handleFileChange}
              className="border bg-white border-gray-300 rounded p-2 w-full"
              accept="image/*" // Sadece resim dosyalarını kabul et
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 font-bold text-white rounded px-4 hover:bg-blue-500 w-full mr-2"
            >
              {user?.name ? "Update Profile" : "Create Profile"}
            </button>
            <button
              type="button"
              onClick={onClose} // Cancel butonuna tıklayınca modal kapanır
              className="bg-red-600 text-white py-2 px-4 rounded w-full hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
