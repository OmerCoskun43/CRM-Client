import { Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import useAuthCalls from "../service/useAuthCalls";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const { logoutSuccess, logoutGoogle } = useAuthCalls();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    if (user?.profilePic) {
      logoutSuccess();
    } else {
      logoutGoogle();
    }
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="h-12 w-12 border-2 border-[#1F2937] cursor-pointer hover:border-2 hover:border-red-400 rounded-full hover:shadow-2xl"
          src="circle.png"
          alt=""
        />
        <Menu as="div" className="relative">
          <div className="flex  justify-between items-center gap-5">
            {user && (
              <>
                <img
                  src={
                    user?.profilePic
                      ? user?.profilePic.includes("https")
                        ? user?.profilePic
                        : `${import.meta.env.VITE_BASE_URL}${user.profilePic}`
                      : user?.photoURL || "defaultProfilePic.png" // Varsayılan bir resim kullanabilirsiniz
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-white text-sm font-bold">
                    {user?.name
                      ? user.name[0].toUpperCase() + user.name.slice(1)
                      : "Misafir"}
                  </p>
                  <p className="text-gray-400 hidden md:block text-sm font-bold">
                    {user?.email}
                  </p>
                </div>
              </>
            )}

            <Menu.Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
              Menu
            </Menu.Button>
          </div>
          <Menu.Items className="absolute right-0 bg-white rounded-md shadow-lg">
            {user ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={`block px-4 py-2 ${
                        active ? "bg-gray-200" : ""
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      onClick={handleLogout}
                      className={`block px-4 py-2 ${
                        active ? "bg-gray-200" : ""
                      }`}
                    >
                      Logout
                    </Link>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/login"
                      className={`block px-4 py-2 ${
                        active ? "bg-gray-200" : ""
                      }`}
                    >
                      Login
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/register"
                      className={`block px-4 py-2 ${
                        active ? "bg-gray-200" : ""
                      }`}
                    >
                      Register
                    </Link>
                  )}
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
