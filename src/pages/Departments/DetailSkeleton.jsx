const DetailSkeleton = () => {
  return (
    <div className="p-6 min-h-screen mt-20 mx-auto max-w-4xl relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center animate-pulse">
        Department Loading...
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 relative border w-full border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 pt-12 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        </h3>
        <p className="text-gray-700 animate-pulse">
          <strong>Description:</strong>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        </p>
        <div className="flex justify-between mt-6">
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mr-2 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
          </button>
          <button className="bg-blue-600 text-white py-2 w-[7rem] px-4 rounded absolute top-0 right-0 hover:bg-blue-700 transition animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-25 "></div>
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full ml-2 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
