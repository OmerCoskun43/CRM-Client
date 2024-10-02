const ReviewSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-pulse">
        Loading Reviews...
      </h2>
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
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="py-3 px-4 border-b text-sm md:text-base">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4 border-b text-sm md:text-base">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4 border-b text-sm md:text-base">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4 border-b text-sm md:text-base">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4 border-b text-sm md:text-base"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
