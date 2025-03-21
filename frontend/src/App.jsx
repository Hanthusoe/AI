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
import Events from "./pages/Events";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogLists />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/events" element={<Events />} />

            {/* <Route path="/solution" element={<Solution />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} /> */}
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
            <Route path="blogs" element={<BlogIndex />} />
            <Route path="events" element={<EventIndex />} />
            <Route path="events/create" element={<EventCreate />} />
            <Route path="events/:id/edit" element={<EventEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
