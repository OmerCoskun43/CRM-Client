/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const ReviewModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  const { user } = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, userId: user._id, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-blue-600 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold mb-6 text-white text-center">
          {formData?._id ? "Edit Review" : "Create Review"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productId" className="block text-white mb-2">
              Product
            </label>
            <input
              type="text"
              name="productId"
              id="productId"
              value={formData.productId?.name || ""} // Ürün adını göster
              disabled // Ürün ID'si editlenemez
              className="w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userId" className="block text-white mb-2">
              User
            </label>
            <input
              type="text"
              name="userId"
              id="userId"
              value={user?.name || ""} // Kullanıcı adını göster
              disabled // Kullanıcı ID'si editlenemez
              className="w-full p-2 rounded bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rating" className="block text-white mb-2">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-white mb-2">
              Comment
            </label>
            <textarea
              name="comment"
              id="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className="w-full p-2 rounded"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 text-white py-2 px-4 rounded w-full hover:bg-red-700 transition mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition"
            >
              {formData?._id ? "Update Review" : "Create Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
