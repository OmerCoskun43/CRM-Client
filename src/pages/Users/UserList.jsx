import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSkeleton from "./UserSkeleton"; // Skeleton bileşenini ekledik

const UserList = () => {
  const { users, loading, error } = useSelector((state) => state.crm); // loading ve error'ı al

  const navigate = useNavigate();

  // Yüklenme durumunda UserSkeleton göster
  if (loading) {
    return <UserSkeleton />;
  }

  // Hata durumunda mesaj göster
  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen mt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Error</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
            {users?.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-3 text-center text-gray-500">
                  No users available.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate(`/users/${user._id}`)}
                >
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                    {user.name}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {user.email}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {user?.departmentId?.name}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-center text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 hidden md:block px-2 md:px-4 border-b text-[10px] md:text-base">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
