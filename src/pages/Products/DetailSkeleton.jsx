const DetailSkeleton = () => {
  return (
    <div className="p-6 min-h-screen mt-20 mx-auto max-w-4xl relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 animate-pulse">
        Loading...
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 relative border border-gray-200 animate-pulse">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          <div className="bg-gray-300 h-8 w-3/4 animate-pulse"></div>
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <strong>Description:</strong>
            </p>
            <div className="bg-gray-300 h-4 w-1/2 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <strong>Price:</strong>
            </p>
            <div className="bg-gray-300 h-4 w-1/4 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <strong>Stock Quantity:</strong>
            </p>
            <div className="bg-gray-300 h-4 w-1/4 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <strong>Category:</strong>
            </p>
            <div className="bg-gray-300 h-4 w-1/4 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <strong>Status:</strong>
            </p>
            <div className="bg-gray-300 h-4 w-1/4 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button className="bg-gray-300 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mr-2">
            Delete Product
          </button>
          <button className="bg-gray-300 absolute top-0 right-0 text-white py-2 px-4 rounded hover:bg-blue-700 transition ml-2">
            Go Back
          </button>
          <button className="bg-gray-300 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full">
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
