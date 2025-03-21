import React, { useState } from "react";
import "./style/AdminDashboard.css";

const initialIndustries = [
  { name: "Software Development", content: "Software solutions...", image: "software.jpg" },
  { name: "Cloud Computing", content: "Cloud services...", image: "cloud.jpg" }
];

const AdminDashboard = () => {
  const [industries, setIndustries] = useState(initialIndustries);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [newIndustry, setNewIndustry] = useState({ name: "", content: "", image: "" });

  const handleEdit = (index) => setSelectedIndustry(index);
  const handleDelete = (index) => {
    setIndustries(industries.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setNewIndustry({ ...newIndustry, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (selectedIndustry !== null) {
      let updatedIndustries = [...industries];
      updatedIndustries[selectedIndustry] = newIndustry;
      setIndustries(updatedIndustries);
      setSelectedIndustry(null);
    } else {
      setIndustries([...industries, newIndustry]);
    }
    setNewIndustry({ name: "", content: "", image: "" });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="industry-list">
        {industries.map((industry, index) => (
          <div key={index} className="industry-item">
            <h3>{industry.name}</h3>
            <p>{industry.content}</p>
            <img src={`/assets/${industry.image}`} alt={industry.name} width="100" />
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="edit-section">
        <h2>{selectedIndustry !== null ? "Edit Industry" : "Add New Industry"}</h2>
        <input type="text" name="name" placeholder="Industry Name" value={newIndustry.name} onChange={handleChange} />
        <textarea name="content" placeholder="Content" value={newIndustry.content} onChange={handleChange}></textarea>
        <input type="text" name="image" placeholder="Image URL" value={newIndustry.image} onChange={handleChange} />
        <button onClick={handleSave}>{selectedIndustry !== null ? "Save Changes" : "Add Industry"}</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
