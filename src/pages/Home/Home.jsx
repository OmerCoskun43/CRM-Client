import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex justify-center gap-5 mt-5">
        <NavLink
          to=""
          className="cursor-pointer bg-black text-white font-bold px-2 py-1 rounded-lg hover:bg-gray-700 w-[8rem] text-center md:w-[12rem]"
          style={({ isActive }) => ({
            borderBottom: isActive ? "4px solid red" : "",
          })}
        >
          Overview
        </NavLink>
        <NavLink
          className="cursor-pointer bg-gray-400 text-black font-bold px-2 py-1 rounded-lg hover:bg-gray-300  text-center  w-[8rem] md:w-[12rem] "
          to="/statistics"
          style={({ isActive }) => ({
            borderBottom: isActive ? "4px solid red" : "",
          })}
        >
          Statistics
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
