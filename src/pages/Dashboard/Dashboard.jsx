import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { useState } from "react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 p-2 ${
          isOpen ? "ml-[184px]" : "ml-[37px]"
        } md:ml-36  `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
