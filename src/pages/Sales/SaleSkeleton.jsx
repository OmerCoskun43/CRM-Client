const SaleSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg relative">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-green-400">
          <tr className="text-gray-700">
            <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
              Product Name
            </th>
            <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
              Quantity
            </th>
            <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
              Price
            </th>
            <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
              Date
            </th>
            <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(12)].map((_, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleSkeleton;
