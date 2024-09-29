import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { setData } from "../features/crmSlice";
import { notifyError, notifySuccess } from "../helper/HotToast";

const useCrmCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

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

  return { fetchData };
};

export default useCrmCalls;
