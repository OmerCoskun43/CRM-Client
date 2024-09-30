import { useSelector } from "react-redux";
import axios from "axios";
const useAxios = () => {
  const { accessToken } = useSelector((state) => state.user);
  const URL = import.meta.env.VITE_BASE_URL;

  const axiosPublic = axios.create({
    baseURL: `${URL}/api`,
  });

  const axiosWithToken = axios.create({
    baseURL: `${URL}/api`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { axiosPublic, axiosWithToken };
};

export default useAxios;
