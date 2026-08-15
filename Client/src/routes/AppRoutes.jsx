import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import PostDetails from "../pages/public/PostDetails";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import NotFound from "../pages/public/NotFound";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Posts from "../pages/admin/Posts";
import Categories from "../pages/admin/Categories";
import CreatePost from "../pages/admin/CreatePost";
import Users from "../pages/admin/Users";
import EditUser from "../pages/admin/EditUser";
import EditPost from "../pages/admin/EditPost";
import Register from "../pages/auth/Register";
import CategoryPosts from "../pages/public/CategoryPosts";
import CategoryList from "../pages/public/CategoryList";
import SearchResults from "../pages/public/SearchResults";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
// import SearchResults from "../pages/public/SearchResults";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
    {/* Public Routes */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />

      <Route
        path="/posts/:slug"
        element={
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        }
      />

      <Route path="/categories" element={<CategoryList />} />
      <Route path="/categories/:slug" element={<CategoryPosts />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/new" element={<CreatePost />} />
        <Route path="posts/:id/edit" element={<EditPost />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id/edit" element={<EditUser />} />
      </Route>


      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;