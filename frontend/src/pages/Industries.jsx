import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Industries = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.industry === activeFilter);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Industries</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-12">
        <button
          className={`btn ${
            activeFilter === "all" ? "btn-primary" : "btn-neutral"
          }`}
          onClick={() => setActiveFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            activeFilter === "website" ? "btn-primary" : "btn-neutral"
          }`}
          onClick={() => setActiveFilter("website")}
        >
          Web Development
        </button>
        <button
          className={`btn ${
            activeFilter === "cloud_computing" ? "btn-primary" : "btn-neutral"
          }`}
          onClick={() => setActiveFilter("cloud_computing")}
        >
          Cloud Computing
        </button>
        <button
          className={`btn ${
            activeFilter === "application" ? "btn-primary" : "btn-neutral"
          }`}
          onClick={() => setActiveFilter("application")}
        >
          Software Development
        </button>
        <button
          className={`btn ${
            activeFilter === "it_consulting" ? "btn-primary" : "btn-neutral"
          }`}
          onClick={() => setActiveFilter("it_consulting")}
        >
          IT Consulting
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card bg-base-100 shadow-xl">
            {project.imageUrl && (
              <figure className="relative">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="badge badge-primary capitalize">{project.industry}</div>
                </div>
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{project.name}</h2>
              <p className="text-sm opacity-70">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industries;
