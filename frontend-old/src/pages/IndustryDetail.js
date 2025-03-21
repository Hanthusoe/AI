import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style/IndustryDetail.css";

const industryDetails = {
  "Software Development": {
    title: "Innovative Software Solutions",
    company: "Tech Solutions Inc.",
    review: "Great experience working with this team!",
    content: "We specialize in developing scalable software applications tailored to business needs.",
    technologies: ["Frontend", "Backend", "Database"]
  },
  "Cloud Computing": {
    title: "Cloud Transformation",
    company: "CloudTech Services",
    review: "Reliable and secure cloud solutions!",
    content: "Providing cloud infrastructure solutions for businesses to enhance scalability and security.",
    technologies: ["AWS", "Azure", "Google Cloud"]
  },
  "Web Development": {
    title: "Modern Web Applications",
    company: "Web Innovators",
    review: "Delivered a high-performance web application!",
    content: "Building responsive and high-performance web applications with modern frameworks.",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  "IT Consulting": {
    title: "Expert IT Strategies",
    company: "IT Experts Ltd.",
    review: "Excellent strategic IT advice!",
    content: "Helping businesses optimize IT infrastructure and digital transformation strategies.",
    technologies: ["Networking", "Security", "Cloud Solutions"]
  }
};

const industries = [
  { name: "Software Development", image: "software_development.jpg" },
  { name: "Cloud Computing", image: "cloud_computing.jpg" },
  { name: "Web Development", image: "web_development.jpg" },
  { name: "IT Consulting", image: "it_consulting.jpg" },
  { name: "Cyber Security", image: "cyber_security.jpg" },
  { name: "Data Science", image: "data_science.jpg" }
];

const Industry = () => {
  const navigate = useNavigate();
  const { industryName } = useParams();
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  
  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
  };
  
  const industry = industryDetails[selectedIndustry] || {};

  return (
    <div className="industry-container">
      <div className="header">
        <h1>Industries</h1>
      </div>

      {/* Industry Filters */}
      <div className="industry-filters">
        {industries.map((industry, index) => (
          <button key={index} onClick={() => handleIndustryClick(industry.name)}>
            {industry.name}
          </button>
        ))}
      </div>

      {/* Industry Cards Grid */}
      <div className="industry-grid">
        {industries.map((industry, index) => (
          <div
            key={index}
            className="industry-card"
            onClick={() => handleIndustryClick(industry.name)}
          >
            <img
              src={`/assets/${industry.image}`}
              alt={industry.name}
              className="industry-img"
            />
            <h3>{industry.name}</h3>
          </div>
        ))}
      </div>

      {/* Industry Detail Section */}
      {selectedIndustry && (
        <div className="industry-detail-container">
          <div className="header">
            <h1>{industry.title}</h1>
            <h3>{industry.company}</h3>
          </div>
          <div className="review-section">
            <p>{industry.review}</p>
          </div>
          <div className="content-section">
            <p>{industry.content}</p>
          </div>
          <div className="technologies-section">
            <h3>Applied Technologies</h3>
            <div className="tech-grid">
              {industry.technologies?.map((tech, index) => (
                <div key={index} className="tech-item">{tech}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Industry;
