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
          {["ID", "Email", "Status", "Address", "Phone"].map((label, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="text-gray-700">
                <strong>{label}:</strong>
              </p>
              <div className="bg-gray-300 h-4 w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Department Information
          </h4>
          {["Department Name", "Description"].map((label, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <p className="text-gray-600">
                <strong>{label}:</strong>
              </p>
              <div className="bg-gray-300 h-4 w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button className="bg-gray-300 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mr-2">
            Delete Customer
          </button>
          <button className="bg-gray-300 absolute top-0 right-0 text-white py-2 px-4 rounded hover:bg-blue-700 transition ml-2">
            Send Mail
          </button>
          <button className="bg-gray-300 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
