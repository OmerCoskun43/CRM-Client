const CustomerSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-pulse">
        Loading...
      </h2>
      <button className="mb-4 bg-gray-300 text-gray-300  py-2 px-4 rounded">
        Add Customer
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base animate-pulse">
                Name
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base animate-pulse">
                Email
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base animate-pulse">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(12)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
                  <div className="bg-gray-300 animate-pulse h-6 w-3/4"></div>
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
                  <div className="bg-gray-300 animate-pulse h-6 w-1/2"></div>
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
                  <div className="bg-gray-300 animate-pulse h-6 w-1/4"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerSkeleton;
