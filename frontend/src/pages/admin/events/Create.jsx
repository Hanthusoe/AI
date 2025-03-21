import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    image: "", // Changed to string for URL
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "events"), {
        title: formData.title,
        location: formData.location,
        date: formData.date,
        image: formData.image,
        createdAt: new Date(),
      });

      navigate("/admin/events");
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div className="form-control grid grid-cols-3 items-center gap-4">
          <label className="label col-span-1">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered col-span-2"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className="form-control grid grid-cols-3 items-center gap-4">
          <label className="label col-span-1">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            className="input input-bordered col-span-2"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
        </div>

        <div className="form-control grid grid-cols-3 items-center gap-4">
          <label className="label col-span-1">
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered col-span-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="form-control grid grid-cols-3 items-center gap-4">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="url"
            className="input input-bordered col-span-2"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            placeholder="Enter image URL"
            required
          />
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "https://placehold.co/300x300?text=Preview";
                }}
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Create Event"
            )}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/admin/events")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
