import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import PostDetails from "../pages/public/PostDetails";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import NotFound from "../pages/public/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import Posts from "../pages/admin/Posts";
import Categories from "../pages/admin/Categories";
import CreatePost from "../pages/admin/CreatePost";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/posts/:slug" element={<PostDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={ 
        <ProtectedRoute> 
          <DashboardLayout />
        </ProtectedRoute>}>
          <Route index element={<Dashboard />} />

          <Route path="posts" element={<Posts />} />

          <Route path="posts/new" element={<CreatePost />} />

          <Route path="categories" element={<Categories />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;