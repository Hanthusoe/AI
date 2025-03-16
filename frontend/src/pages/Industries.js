import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "./style/Industries.css";

const Industries = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("Software Development");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const industries = [
    { name: "Software Development", image: "software_dev.jpg" },
    { name: "Cloud Computing", image: "cloud_computing.jpg" },
    { name: "Web Development", image: "web_development.jpg" },
    { name: "IT Consulting", image: "it_consulting.jpg" },
  ];

  const industryStories = {
    "Software Development": "We build scalable applications and custom software.",
    "Cloud Computing": "Leverage cloud solutions for flexibility and scalability.",
    "Web Development": "Design and develop stunning, high-performance websites.",
    "IT Consulting": "Strategic IT solutions to drive business success.",
  };

  const handleIndustryClick = (industryName) => {
    setSelectedIndustry(industryName);
    setShowPopup(true);
  };

  const handleNavigateToDetail = (industryName) => {
    navigate(`/industry/${industryName}`); // Use navigate instead of history.push
  };

  return (
    <div className="industries-container">
      {/* Header Section */}
      <div className="section-title">
        <h1>Industries</h1>
      </div>
      
      {/* Industry Filters */}
      <div className="industry-filters">
        {industries.map((industry) => (
          <button
            key={industry.name}
            className={`filter-button ${selectedIndustry === industry.name ? "active" : ""}`}
            onClick={() => setSelectedIndustry(industry.name)}
          >
            {industry.name}
          </button>
        ))}
      </div>

      {/* Industry Stories Grid (3x2 layout) */}
      <div className="industry-grid">
        {industries.slice(0, 6).map((industry, index) => (
          <div key={index} className="industry-card" onClick={() => handleIndustryClick(industry.name)}>
            <img src={`/assets/${industry.image}`} alt={industry.name} className="card-image" />
            <h3>{industry.name}</h3>
            <p>{industryStories[industry.name]}</p>
          </div>
        ))}
      </div>

      {/* Popup for Project Details */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{selectedIndustry}</h2>
            <p>{industryStories[selectedIndustry]}</p>
            <button onClick={() => handleNavigateToDetail(selectedIndustry)}>View Details</button>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Industries;