import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { setData } from "../features/crmSlice";
import { notifyError, notifySuccess } from "../helper/HotToast";
import { useNavigate } from "react-router-dom";

const useCrmCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();
  const navigate = useNavigate();

  const fetchData = async (entity) => {
    try {
      const { data } = await axiosWithToken.get(`/${entity}`);
      dispatch(setData({ entity, data }));
      notifySuccess(
        `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } Loaded Successfully`
      );
    } catch (error) {
      console.log(error);
      notifyError(
        `${entity.charAt(0).toUpperCase() + entity.slice(1)} Loading Failed`
      );
    }
  };

  const deleteData = async (entity, id) => {
    try {
      await axiosWithToken.delete(`/${entity}/${id}`);
      await fetchData(entity); // Silindikten sonra verileri yeniden yükle
      notifySuccess(
        `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } Deleted Successfully`
      );
      navigate(-1);
    } catch (error) {
      console.log(error);
      notifyError(
        `${entity.charAt(0).toUpperCase() + entity.slice(1)} Deletion Failed`
      );
    }
  };

  const createData = async (entity, data) => {
    try {
      await axiosWithToken.post(`/${entity}`, data);
      notifySuccess(
        `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } created Successfully`
      );
      await fetchData(entity);
    } catch (error) {
      console.log(error);
      notifyError(
        `${entity.charAt(0).toUpperCase() + entity.slice(1)} created Failed`
      );
    }
  };

  const sendMail = async (data) => {
    console.log("data", data); // Veriyi burada kontrol edebilirsiniz.
    try {
      await axiosWithToken.post("/mails", data);
      notifySuccess("Mail sent successfully");
    } catch (error) {
      console.log(error);
      notifyError("Mail sending failed");
    }
  };

  return { fetchData, deleteData, createData, sendMail };
};

export default useCrmCalls;
