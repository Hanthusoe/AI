import { Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/solutions" className="link link-hover">
          Solutions
        </Link>
        <Link to="/events" className="link link-hover">
          Events
        </Link>
        <Link to="/blogs" className="link link-hover">
          Blogs
        </Link>
        <Link to="/contact" className="link link-hover">
          Contact
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <Twitter />
          </a>
          <a>
            <Youtube />
          </a>
          <a>
            <Facebook />
          </a>
        </div>
      </nav>
      <div className="space-y-1 text-center">
        <h3 className="font-bold text-lg">Contact Infomation</h3>
        <p>
          123 Innovation Street, Tech District, Silicon Valley, United States
        </p>
        <p>+1 (555) 123-4567</p>
      </div>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by AI
          Co.ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
