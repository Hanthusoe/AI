import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        const blogDoc = await getDoc(doc(db, "blogs", id));
        if (blogDoc.exists()) {
          const blogData = { id: blogDoc.id, ...blogDoc.data() };
          setBlog(blogData);

          // Fetch related posts
          const relatedQuery = query(
            collection(db, "blogs"),
            where("category", "==", blogData.category),
            where("__name__", "!=", id),
            limit(3)
          );
          const relatedSnapshot = await getDocs(relatedQuery);
          const relatedData = relatedSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRelatedPosts(relatedData);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <Link to="/blogs" className="btn btn-primary">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Blog Content */}
        <div className="card bg-base-100 shadow-xl">
          <figure className="h-[400px]">
            <img
              src={
                blog.image_url ||
                "https://placehold.co/1200x800?text=Blog+Image"
              }
              alt={blog.name}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <h1 className="text-3xl font-bold">{blog.name}</h1>
              <div className="badge badge-primary badge-lg">
                {blog.category}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm opacity-70 mb-8">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
                {blog.published_at?.toDate().toLocaleDateString()}
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-lg leading-relaxed">{blog.description}</p>
            </div>

            <div className="divider"></div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blogs/${post.id}`}
                      className="card bg-base-200 hover:shadow-xl transition-all"
                    >
                      <figure className="h-32">
                        <img
                          src={
                            post.image_url ||
                            "https://placehold.co/600x400?text=Blog+Image"
                          }
                          alt={post.name}
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      <div className="card-body p-4">
                        <h3 className="font-semibold line-clamp-2">
                          {post.name}
                        </h3>
                        <div className="text-sm opacity-70">
                          {post.published_at?.toDate().toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="card-actions justify-between mt-8">
              <Link to="/blogs" className="btn btn-ghost">
                ← Back to Blogs
              </Link>
              <button className="btn btn-primary">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
