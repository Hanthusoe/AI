import React, { useState, useEffect } from "react";
import "./style/Contact.css";

const Contact = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div className="contact-container">
      <h2>We are happy to hear from you</h2>
      <form className="contact-form">
        <div className="form-group">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Phone Number" required />
        </div>
        <div className="form-group">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input type="text" placeholder="Job Title" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company Name" required />
        </div>
        <div className="form-group">
          <textarea placeholder="Message Description" rows="4" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
