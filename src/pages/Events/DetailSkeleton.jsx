const EventDetailSkeleton = () => {
  return (
    <div className="p-6 min-h-screen mt-20 mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center animate-pulse">
        Loading Event Details...
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* Event ID skeleton */}
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Event ID:</strong>
          <div className="bg-gray-300 h-4 w-1/3 rounded mt-1 animate-pulse"></div>
        </p>

        {/* Event details skeletons */}
        {[
          "User ID",
          "User Name",
          "User Email",
          "Customer ID",
          "Customer Name",
          "Date",
          "Details",
          "Created At",
          "Updated At",
        ].map((label) => (
          <p
            className="text-gray-700 flex justify-between items-center mt-4"
            key={label}
          >
            <strong>{label}:</strong>
            <div className="bg-gray-300 h-4 w-1/2 rounded mt-1 animate-pulse"></div>
          </p>
        ))}

        <div className="flex justify-between mt-6">
          {/* Buttons for skeletons */}
          <div className="bg-red-600 text-white py-2 px-4 rounded w-full hover:bg-red-700 transition mr-2 animate-pulse"></div>
          <div className="bg-blue-600 text-white py-2 px-4 rounded w-full block hover:bg-blue-700 transition animate-pulse"></div>
          <div className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ml-2 animate-pulse absolute top-0 right-0 w-[6rem] h-[2.5rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailSkeleton;
