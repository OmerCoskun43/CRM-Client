const DetailSkeleton = () => {
  return (
    <div className="p-6 min-h-screen mt-20 mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center animate-pulse">
        Task Details Loading...
      </h2>

      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* Not bilgileri için iskelet */}
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Task ID:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>User ID:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>User Name:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Customer ID:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Customer Name:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Description:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Due to Date:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Status:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Priority:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4 animate-pulse">
          <strong>Created At:</strong>
          <span className="bg-gray-300 h-4 w-1/3 rounded"></span>
        </p>

        <div className="flex justify-between mt-6">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition animate-pulse absolute top-0 right-0">
            Go Back
          </button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full mr-2 animate-pulse">
            Edit Task
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full animate-pulse">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
