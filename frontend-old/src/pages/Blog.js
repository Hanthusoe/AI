import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Blog.css";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const blogs = [
    { id: 1, title: "Blog 1", content: "Summary of Blog 1", image: "/assets/blog1.webp" },
    { id: 2, title: "Blog 2", content: "Summary of Blog 2", image: "/assets/blog2.webp" },
    { id: 3, title: "Blog 3", content: "Summary of Blog 3", image: "/assets/blog3.jfif" },
    { id: 4, title: "Blog 4", content: "Summary of Blog 4", image: "/assets/blog4.jfif" },
  ];

  const events = [
    { id: 1, name: "Tech Conference 2025", date: "April 15, 2025", location: "New York, USA", image: "/assets/previousevent1.png" },
    { id: 2, name: "AI Innovation Summit", date: "May 10, 2025", location: "San Francisco, USA", image: "/assets/previousevent2.jpg" },
    { id: 3, name: "Web Development Workshop", date: "June 5, 2025", location: "London, UK", image: "/assets/previousevent3.png" },
  ];

  const upcomingEvents = [
    { id: 1, name: "Future Tech Expo", date: "July 20, 2025", location: "Berlin, Germany", image: "/assets/upcomingevent1.jpg" },
    { id: 2, name: "Digital Marketing Conference", date: "August 10, 2025", location: "Paris, France", image: "/assets/upcomingevent2.jpg" },
  ];

  const blogsPerPage = 3;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="blog-container">
      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch("")}>✖</button>
      </div>

      {/* Blogs Section */}
      <section className="blogs-section">
        <h2>Blogs</h2>
        <div className="grid-container">
          {currentBlogs.map((blog) => (
            <div key={blog.id} className="card">
              <img src={blog.image} alt={blog.title} />
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <Link to={`/blog/${blog.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <h2>Events</h2>
        <div className="grid-container">
          {events.map((event) => (
            <div key={event.id} className="card">
              <img src={event.image} alt={event.name} />
              <h3>{event.name}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <button>Explore</button>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="upcoming-events-section">
        <h2>Upcoming Events</h2>
        <div className="upcoming-events-list">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="upcoming-event-card">
              <img src={event.image} alt={event.name} />
              <div className="upcoming-event-details">
                <h3>{event.name}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <button>Explore</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>← Previous</button>
        {[1, 2].map((num) => (
          <button key={num} onClick={() => setCurrentPage(num)} className={currentPage === num ? "active" : ""}>
            {num}
          </button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === 2}>Next →</button>
      </div>
    </div>
  );
};

export default Blog;