import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewSkeleton from "./ReviewSkeleton"; // İskelet bileşenini ekliyoruz

const ReviewList = () => {
  const { reviews, loading, error } = useSelector((state) => state.crm); // loading ve error'u ekledik
  const navigate = useNavigate();

  if (loading) {
    return <ReviewSkeleton />; // Yükleme durumu için iskelet bileşenini döndürüyoruz
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Error Loading Reviews
        </h2>
        <div className="text-red-500">An error occurred: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews List</h2>
      <button></button>

      <div className="overflow-x-auto rounded-lg shadow-lg relative">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-4 border-b text-left text-sm md:text-base">
                User Name
              </th>
              <th className="py-3 px-4 border-b text-left text-sm md:text-base">
                Rating
              </th>
              <th className="py-3 px-4 border-b text-left text-sm md:text-base">
                Comment
              </th>
              <th className="py-3 px-4 border-b text-left text-sm md:text-base">
                Date
              </th>
              <th className="py-3 px-4 border-b text-left text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-3 text-center text-gray-500">
                  No reviews available.
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr
                  key={review._id}
                  className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate(`${review._id}`)}
                >
                  <td className="py-3 px-4 border-b text-sm md:text-base text-black font-semibold">
                    {review.userId.name}
                  </td>
                  <td className="py-3 px-4 border-b text-sm md:text-base">
                    {review.rating} / 5
                  </td>
                  <td className="py-3 px-4 border-b text-sm md:text-base">
                    {review.comment}
                  </td>
                  <td className="py-3 px-4 border-b text-sm md:text-base">
                    {new Date(review.createdAt).toLocaleDateString()}{" "}
                    {/* Yalnızca tarihi göster */}
                  </td>
                  <td className="py-3 px-4 border-b text-sm md:text-base">
                    {review.rating > 3
                      ? "😀"
                      : review.rating === 3
                      ? "😗"
                      : "😞"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewList;
