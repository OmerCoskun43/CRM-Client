import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import Login from "../pages/Auth/Login"; // Düzeltildi
import Register from "../pages/Auth/Register";
import PrivateRouter from "./PrivateRouter";
import CustomerList from "../pages/Customers/CustomerList";
import ProductList from "../pages/Products/ProductList";
import DepartmentList from "../pages/Departments/DepartmentList";
import SaleList from "../pages/Sales/SaleList";
import Home from "../pages/Home/Home";
import Overview from "../pages/Home/Overview";
import Statistics from "../pages/Home/Statistics";
import CustomerDetail from "../pages/Customers/CustomerDetail";
import ProductDetail from "../pages/Products/ProductDetail";
import DepartmentDetail from "../pages/Departments/DepartmentDetail";
import SaleDetail from "../pages/Sales/SaleDetail";
import UserList from "../pages/Users/UserList";
import UserDetail from "../pages/Users/UserDetail";
import EventList from "../pages/Events/EventList";
import EventDetail from "../pages/Events/EventDetail";
import ReviewList from "../pages/Reviews/ReviewList";
import ReviewDetail from "../pages/Reviews/ReviewDetail";
import NoteList from "../pages/Notes/NoteList";
import NoteDetail from "../pages/Notes/NoteDetail";
import Profile from "../pages/Profile/Profile";
import TaskList from "../pages/Tasks/TaskList";
import TaskDetail from "../pages/Tasks/TaskDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRouter />}>
        <Route path="" element={<Dashboard />}>
          <Route path="" element={<Home />}>
            <Route index element={<Overview />} />
            <Route path="/statistics" element={<Statistics />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
          <Route path="/sales" element={<SaleList />} />
          <Route path="/sales/:id" element={<SaleDetail />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/:id" element={<ReviewDetail />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
