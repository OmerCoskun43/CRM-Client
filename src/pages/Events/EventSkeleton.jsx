// components/EventSkeleton.js

const EventSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg relative">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-green-400">
          <tr className="text-gray-700">
            <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
              Event Type
            </th>
            <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
              Date
            </th>
            <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="animate-pulse">
          {[...Array(12)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-100 cursor-default">
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-gray-300">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-gray-300">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-gray-300">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventSkeleton;
