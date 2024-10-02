/* eslint-disable react/prop-types */

const NoteSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 animate-pulse">
        Loading Notes...
      </h2>
      <button className="mb-4 font-bold bg-gray-200 animate-pulse  py-2 px-4 rounded">
        Add Note
      </button>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((
              _,
              index // Örnek 5 satırlık iskelet
            ) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="py-3 px-2 md:px-4 border-b">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-2 md:px-4 border-b">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-2 md:px-4 border-b">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteSkeleton;
