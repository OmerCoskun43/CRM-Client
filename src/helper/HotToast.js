import toast from "react-hot-toast";

export const notifySuccess = (msg) => {
  toast.success(msg, {
    duration: 2000,
    position: "top-right",
    style: {
      background: "#4caf50", // Yeşil arka plan
      color: "#fff",
      width: "20%",
      minWidth: "200px",
      marginTop: "65px",
    },
    icon: "🎉", // İkon ekleme
  });
};

export const notifyError = (msg) => {
  toast.error(msg, {
    duration: 2000,
    position: "top-right",
    style: {
      background: "#f44336", // Kırmızı arka plan
      color: "#fff",
      width: "20%",
      minWidth: "200px",
    },
    icon: "❌", // İkon ekleme
  });
};

export const notifyInfo = (msg) => {
  toast(msg, {
    duration: 2000,
    position: "top-right",
    style: {
      background: "#2196f3", // Mavi arka plan
      color: "#fff",
      width: "20%",
      minWidth: "200px",
    },
    icon: "ℹ️", // İkon ekleme
  });
};
