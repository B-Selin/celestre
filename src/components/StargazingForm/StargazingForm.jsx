// Import React hooks for state management
import React, { useState } from 'react';

// Import CSS module 
import './StargazingForm.css';

export default function StargazingForm({ handleStargazingSubmit }) {
  // Initialize form data state
  const initialFormData = {
    title: '',
    date: '',
    observations: '',
  };

  // State to store form data
  const [formData, setFormData] = useState(initialFormData);

  // Update form data state on input changes
  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }

  // Handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();

    // Pass formData to parent component
    handleStargazingSubmit(formData);
    // Reset form
    setFormData(initialFormData);
  }

  // Render the form
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="title">Share Your Observations</h2>

      <div className="input-container ic1">
        <input
          className="input"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <div className="cut"></div>
        <label className="placeholder">Title</label>
      </div>

      <div className="input-container ic2">
        <input
          className="input"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <div className="cut cut-short"></div>
        <label className="placeholder">Date</label>
      </div>

      <div className="input-container ic2">
        <textarea
          className="input"
          name="observations"
          value={formData.observations}
          onChange={handleChange}
        />
        <div className="cut"></div>
        <label className="placeholder">Observations</label>
      </div>

      <button className="submit" type="submit">Save Entry</button>
    </form>
  );
}