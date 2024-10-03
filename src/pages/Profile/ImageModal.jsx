/* eslint-disable react/prop-types */
import { useState } from "react";

const ImageModal = ({ isOpen, onClose, handleImageSubmit, loading }) => {
  const [formData, setFormData] = useState({
    profilePic: null, // Profil resmini tutacak alan
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePic: e.target.files[0], // Dosya nesnesini güncelle
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle

    if (formData.profilePic) {
      // Eğer bir profil resmi seçilmişse
      const dataToSubmit = new FormData();
      dataToSubmit.append("profilePic", formData.profilePic);
      handleImageSubmit(dataToSubmit); // API çağrısı yapın
      onClose(); // Modalı kapatın
    } else {
      console.error("No profile picture selected."); // Dosya yoksa hata mesajı
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gradient-to-br from-blue-800 to-gray-400 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 mt-8">
          <h2 className="text-3xl font-bold mb-4 text-white text-center">
            Update Profile Picture
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="profilePic" className="block text-white mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={handleFileChange}
                className="border bg-white border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            {formData.profilePic && (
              <div className="mb-4 flex justify-center">
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
              </div>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 font-bold text-white rounded px-4 hover:bg-red-500 w-full mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition"
                disabled={loading} // Yükleniyor durumunda butonu devre dışı bırak
              >
                {loading ? "Updating..." : "Update"} {/* Yükleniyor mesajı */}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ImageModal;
