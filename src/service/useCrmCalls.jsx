import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { setDepartments } from "../features/crmSlice";
import { notifyError, notifySuccess } from "../helper/HotToast";

const useCrmCalls = () => {
  const dispatch = useDispatch();
  const { axiosPublic } = useAxios();
  const departmentSuccess = async () => {
    try {
      const { data } = await axiosPublic.get("/departments");
      dispatch(setDepartments(data));
      notifySuccess("Departments Loaded Successfully");
    } catch (error) {
      console.log(error);
      notifyError("Departments Loading Failed");
    }
  };

  return { departmentSuccess };
};

export default useCrmCalls;
