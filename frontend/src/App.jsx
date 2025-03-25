import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Home from "./pages/Home";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import BlogIndex from "./pages/admin/blogs/Index";
import BlogLists from "./pages/blogs/Index";
import BlogDetails from "./pages/blogs/BlogDetails";
import Solutions from "./pages/Solutions";
import EventIndex from "./pages/admin/Events/Index";
import EventCreate from "./pages/admin/Events/Create";
import EventEdit from "./pages/admin/Events/Edit";
import Contact from "./pages/Contact";
import ProjectIndex from "./pages/admin/Projects/Index";
import Industries from "./pages/Industries";
import EventDetails from "./pages/events/EventDetails";
import Inquiries from "./pages/admin/Inquiries";
import RolesIndex from "./pages/admin/Roles/Index";
import UsersIndex from "./pages/admin/Users/Index";
import RoleRoute from "./components/routes/RoleRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogLists />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="roles"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <RolesIndex />
                </RoleRoute>
              }
            />
            <Route
              path="users"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <UsersIndex />
                </RoleRoute>
              }
            />
            <Route path="blogs" element={<BlogIndex />} />
            <Route path="industries" element={<ProjectIndex />} />
            <Route path="events" element={<EventIndex />} />
            <Route path="events/create" element={<EventCreate />} />
            <Route path="events/:id/edit" element={<EventEdit />} />
            <Route path="inquiries" element={<Inquiries />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
