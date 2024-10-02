/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import { useEffect, useState } from "react";
import useCrmCalls from "../../service/useCrmCalls";
import ConfirmModal from "../../components/ConfirmModal";
import useToken from "../../hooks/useToken";
import { notifySuccess } from "../../helper/HotToast";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchData } = useCrmCalls();
  const { isModalOpen, handleConfirmRefresh, handleCloseModal } = useToken();
  const error = useSelector((state) => state.crm.error); // Redux'dan error durumu

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
          fetchData("categories"),
          fetchData("events"),
          fetchData("reviews"),
          fetchData("notes"),
        ]);
        notifySuccess(
          "Users, products, sales, events, reviews, notes, reviews, customers, departments and categories fetched successfully"
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  if (error) {
    return <div>Error occurred while fetching data.</div>; // Hata durumunda mesaj döndür
  }

  return (
    <div className="flex h-full shadow-md">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 p-2 transition-margin duration-300 ${
          isOpen ? "ml-[184px]" : "ml-[37px]"
        } md:ml-36`}
      >
        <Outlet />
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRefresh}
      />
    </div>
  );
};

export default Dashboard;
