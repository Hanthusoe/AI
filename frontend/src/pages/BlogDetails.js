import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style/BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy blog data (replace with API or database fetch in real-world apps)
  const blogData = {
    1: { title: "Blog 1", content: "This is the content for Blog 1.", image: "/assets/blog1.webp" },
    2: { title: "Blog 2", content: "This is the content for Blog 2.", image: "/assets/blog2.webp" },
    3: { title: "Blog 3", content: "This is the content for Blog 3.", image: "/assets/blog3.jfif" },
    4: { title: "Blog 4", content: "This is the content for Blog 4.", image: "/assets/blog4.jfif" },
  };

  const blog = blogData[id] || { title: "Blog Not Found", content: "No details available.", image: "/images/default.jpg" };

  return (
    <div className="blog-details-container">
      <h2>{blog.title}</h2>
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <p>{blog.content}</p>
      <button className="back-button" onClick={() => navigate(-1)}>Back to Blogs</button>
    </div>
  );
};

export default BlogDetails;
