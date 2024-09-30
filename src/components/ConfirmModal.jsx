/* eslint-disable react/prop-types */
const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose} // Modal dışına tıklama ile kapanma
    >
      <div
        className="bg-gradient-to-br from-blue-800 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5"
        onClick={(e) => e.stopPropagation()} // Modal içindeki tıklamaları engelle
      >
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">
          Oturum güncellemek istiyor musun?
        </h2>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-transform transform hover:scale-105 shadow-lg font-bold"
            onClick={onConfirm}
          >
            Evet
          </button>
          <button
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg font-bold"
            onClick={onClose}
          >
            Hayır
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
