const DetailSkeleton = () => {
  return (
    <div className="p-6 min-h-screen mt-20 mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center animate-pulse">
        Review Details
      </h2>

      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* İnceleme bilgileri için iskelet */}
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Review ID:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>User ID:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>User:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Rating:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Comment:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Product:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Submitted At:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>

        <div className="flex justify-between mt-6">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition  animate-pulse absolute top-0 right-0">
            Go Back
          </button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full mr-2 animate-pulse">
            Edit Review
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full animate-pulse">
            Delete Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
