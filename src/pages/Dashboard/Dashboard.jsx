/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { useEffect, useState } from "react";
import useCrmCalls from "../../service/useCrmCalls";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchData } = useCrmCalls();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchData("products"),
          fetchData("users"),
          fetchData("sales"),
          fetchData("reviews"),
          fetchData("customers"),
          fetchData("departments"),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="flex h-full shadow-md">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 p-2  transition-margin duration-300 ${
          isOpen ? "ml-[184px]" : "ml-[37px]"
        } md:ml-36`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
