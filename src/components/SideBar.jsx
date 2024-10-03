/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex h-screen fixed top-15 mt-20 left-0`}>
      {/* Sidebar */}
      <div
        className={`bg-gray-700 text-white h-full p-2 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-[80%] "
        } md:translate-x-0 md:w-36 w-[11.5rem]`}
      >
        {/* Hamburger Icon */}
        <button
          onClick={toggleSidebar}
          className="md:hidden font-bold text-white absolute top-2 right-1 z-10"
        >
          {isOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
        </button>

        <h2 className="text-xl text-start font-bold mb-4 mt-6 ps-2">Menu</h2>
        <ul className="text-start font-bold ps-2">
          {[
            "/",
            "/customers",
            "/products",
            "/departments",
            "/sales",
            "/tasks",
            "/users",
            "/events",
            "/reviews",
            "/notes",
          ].map((path, index) => (
            <li className="mb-2" key={index}>
              <NavLink
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-red-600" : "hover:text-red-600"
                }
              >
                {path === "/"
                  ? "Dashboard"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">{/* Ana içerik burada */}</div>
    </div>
  );
};

export default Sidebar;
