import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { user } = useSelector((state) => state.user);

  return user?.email ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
