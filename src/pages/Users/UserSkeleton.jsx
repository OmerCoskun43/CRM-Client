const UserSkeleton = () => {
  const rows = Array(12).fill(0); // Skeleton'da kaç satır gösterileceğini belirtiyoruz

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User List</h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Name
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Email
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Department ID
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Status
              </th>
              <th className="hidden md:block py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Last Login
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="py-3 px-2 md:px-4 border-b">
                  <div className="bg-gray-300 h-4 rounded-md w-3/4"></div>
                </td>
                <td className="py-3 px-2 md:px-4 border-b">
                  <div className="bg-gray-300 h-4 rounded-md w-3/4"></div>
                </td>
                <td className="py-3 px-2 md:px-4 border-b">
                  <div className="bg-gray-300 h-4 rounded-md w-3/4"></div>
                </td>
                <td className="py-3 px-2 md:px-4 border-b">
                  <div className="bg-gray-300 h-4 rounded-md w-1/2"></div>
                </td>
                <td className="hidden md:block py-3 px-2 md:px-4 border-b">
                  <div className="bg-gray-300 h-4 rounded-md w-1/2"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSkeleton;
