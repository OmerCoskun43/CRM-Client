const DepartmentSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <div className="animate-pulse bg-gray-300 h-8 w-1/4 rounded mb-4"></div>
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                <div className="animate-pulse bg-gray-300 h-6 w-1/4 rounded"></div>
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                <div className="animate-pulse bg-gray-300 h-6 w-1/4 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((
              _,
              index // 5 satırlık bir placeholder oluştur
            ) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base text-black font-bold">
                  <div className="animate-pulse bg-gray-300 h-6 w-3/4 rounded"></div>
                </td>
                <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base">
                  <div className="animate-pulse bg-gray-300 h-6 w-3/4 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentSkeleton;
