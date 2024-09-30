/* eslint-disable react-hooks/exhaustive-deps */
// src/hooks/useToken.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../service/useAuthCalls";
import { notifyError } from "../helper/HotToast";

const useToken = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.user);
  const { refreshTokenSuccess, logoutSuccess } = useAuthCalls();
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const checkTokenExpiry = () => {
    if (!accessToken) return;

    const token = JSON.parse(atob(accessToken.split(".")[1]));
    const exp = token.exp * 1000;
    const now = Date.now();
    const timeBeforeExpiry = exp - now;

    if (timeBeforeExpiry < 2 * 60 * 1000) {
      console.log("Token expired, refreshing...");
      setModalOpen(true);
    }
  };

  const handleConfirmRefresh = async () => {
    clearTimeout(logoutTimer);
    try {
      await refreshTokenSuccess(refreshToken);
      setModalOpen(false);
    } catch (error) {
      console.log("Refresh token hatası:", error);
    }
  };

  const handleCloseModal = () => {
    clearTimeout(logoutTimer);
    setModalOpen(false);
    notifyError("Oturum yenileme başarısız. Redirect login...");
    logoutSuccess();
  };

  useEffect(() => {
    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [accessToken]);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        handleCloseModal();
      }, 20000);

      setLogoutTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return {
    isModalOpen,
    setModalOpen,
    handleConfirmRefresh,
    handleCloseModal,
  };
};

export default useToken;
