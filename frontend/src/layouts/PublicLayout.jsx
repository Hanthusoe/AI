import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black/80">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default PublicLayout;
