import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { setData, setLoading, setError } from "../features/crmSlice";
import { notifyError, notifySuccess } from "../helper/HotToast";
import { useNavigate } from "react-router-dom";

const useCrmCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();
  const navigate = useNavigate();

  const fetchData = async (entity) => {
    dispatch(setLoading()); // Yükleme durumunu başlat
    try {
      const { data } = await axiosWithToken.get(`/${entity}`);
      dispatch(setData({ entity, data }));
    } catch (error) {
      console.log("error", error.response.data.message);
      dispatch(setError()); // Hata durumunu ayarla
      notifyError(
        `${entity.charAt(0).toUpperCase() + entity.slice(1)} Loading Failed ${
          error.response.data.message
        }`
      );
    }
  };

  const createData = async (entity, data) => {
    dispatch(setLoading()); // Yükleme durumunu başlat
    try {
      await axiosWithToken.post(`/${entity}`, data);
      notifySuccess(
        `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } created Successfully`
      );
      await fetchData(entity);
    } catch (error) {
      console.log("error", error.response.data.message);
      dispatch(setError()); // Hata durumunu ayarla
      navigate("/");
      notifyError(
        `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } created Failed and ${error.response.data.message}`
      );
    }
  };

  const updateData = async (entity, id, data) => {
    dispatch(setLoading()); // Yükleme durumunu başlat
    try {
      await axiosWithToken.put(`/${entity}/${id}`, data);
      notifySuccess(
        `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } updated Successfully`
      );
      await fetchData(entity);
    } catch (error) {
      console.log("updateData error", error.response.data.message);
      dispatch(setError()); // Hata durumunu ayarla
      notifyError(
        `${entity.charAt(0).toUpperCase() + entity.slice(1)} updated Failed ${
          error.response.data.message
        }`
      );
    }
  };

  const deleteData = async (entity, id) => {
    dispatch(setLoading()); // Yükleme durumunu başlat
    try {
      await axiosWithToken.delete(`/${entity}/${id}`);
      await fetchData(entity); // Silindikten sonra verileri yeniden yükle
      notifySuccess(
        `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } Deleted Successfully`
      );
      if(entity !== "users"){
        navigate(-1);
      }
    } catch (error) {
      console.log("error", error.response.data.message);
      dispatch(setError()); // Hata durumunu ayarla
      notifyError(
        `${entity.charAt(0).toUpperCase() + entity.slice(1)} Deletion Failed ${
          error.response.data.message
        }`
      );
    }
  };

  const sendMail = async (data) => {
    dispatch(setLoading()); // Yükleme durumunu başlat
    try {
      await axiosWithToken.post("/mails", data);
      notifySuccess("Mail sent successfully");
    } catch (error) {
      console.log(error);
      dispatch(setError()); // Hata durumunu ayarla
      notifyError("Mail sending failed", error.response.data.message);
    }
  };

  return {
    fetchData,
    deleteData,
    createData,
    sendMail,
    updateData,
  };
};

export default useCrmCalls;
