import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

const CreateBlogModal = ({ isOpen, onClose, onSuccess, blog = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        name: blog.name,
        category: blog.category,
        description: blog.description,
        image_url: blog.image_url || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        description: "",
        image_url: "",
      });
    }
  }, [blog]);

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, image_url: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (blog) {
        await updateDoc(doc(db, "blogs", blog.id), {
          ...formData,
          updated_at: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "blogs"), {
          ...formData,
          published_at: serverTimestamp(),
          created_at: serverTimestamp(),
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="blog_modal" className="modal" open={isOpen}>
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-2xl mb-6">
          {blog ? "Edit Blog" : "Create New Blog"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input input-bordered"
                  placeholder="Enter blog name"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="input input-bordered"
                  placeholder="Enter category"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Image URL</span>
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={handleImageUrlChange}
                  className="input input-bordered"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="textarea textarea-bordered h-56"
                  placeholder="Enter blog description"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="modal-action pt-4 border-t">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : blog ? (
                "Update Blog"
              ) : (
                "Create Blog"
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default CreateBlogModal;
