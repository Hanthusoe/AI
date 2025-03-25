import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogSnapshot = await getDocs(collection(db, "blogs"));
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);

        const eventSnapshot = await getDocs(collection(db, "events"));
        const eventList = eventSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Split events past and upcoming
        const now = new Date();
        const pastEvents = eventList.filter(
          (event) => new Date(event.date) < now
        );
        const upcomingEvents = eventList.filter(
          (event) => new Date(event.date) >= now
        );

        setEvents({ past: pastEvents, upcoming: upcomingEvents });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const [currentEventPage, setCurrentEventPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const paginateData = (items, page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const paginatedBlogs = paginateData(filteredBlogs, currentBlogPage);
  const paginatedPastEvents = paginateData(
    events?.past || [],
    currentEventPage
  );

  const totalBlogPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const totalEventPages = Math.ceil(
    (events?.past?.length || 0) / ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
          <div className="form-control max-w-xl mx-auto">
            <div className="input-group flex gap-2">
              <input
                type="text"
                placeholder="Search by title or category..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-square btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* blog list */}
        <div className="mb-6">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
              <p className="text-base-content/70">
                Try adjusting your search terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
                >
                  <figure className="relative h-48">
                    <img
                      src={
                        blog.image_url ||
                        "https://placehold.co/600x400?text=Blog+Image"
                      }
                      alt={blog.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="badge badge-primary">{blog.category}</div>
                    </div>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title line-clamp-1">{blog.name}</h2>
                    <p className="line-clamp-2 text-base-content/80">
                      {blog.description}
                    </p>
                    <div className="card-actions justify-between items-center mt-4">
                      <div className="text-sm opacity-70">
                        {blog.published_at?.toDate().toLocaleDateString()}
                      </div>
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalBlogPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                {[...Array(totalBlogPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`join-item btn ${
                      currentBlogPage === index + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => setCurrentBlogPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mb-16">
          <div className="space-y-12">
            {/* Upcoming Events */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {events?.upcoming?.map((event) => (
                  <div
                    key={event.id}
                    className="card lg:card-side bg-base-100 shadow-xl"
                  >
                    <figure className="lg:w-1/3">
                      <img
                        src={
                          event.image ||
                          "https://placehold.co/600x400?text=Event"
                        }
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </figure>
                    <div className="card-body lg:w-2/3">
                      <h2 className="card-title">{event.title}</h2>
                      <p className="text-base-content/70">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-base-content/70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base-content/70">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="card-actions justify-end">
                        <Link
                          to={`/events/${event.id}`}
                          className="btn btn-primary"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPastEvents.map((event) => (
                <div key={event.id} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img
                      src={
                        event.image || "https://placehold.co/600x400?text=Event"
                      }
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{event.title}</h2>
                    <p className="text-base-content/70 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/events/${event.id}`}
                        className="btn btn-outline btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalEventPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="join">
                  {[...Array(totalEventPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`join-item btn ${
                        currentEventPage === index + 1 ? "btn-active" : ""
                      }`}
                      onClick={() => setCurrentEventPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
