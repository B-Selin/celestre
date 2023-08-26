import React, { useState } from 'react';
import './StargazingForm.css';


export default function StargazingForm({ handleStargazingSubmit }) {
  const initialFormData = {
    title: '',
    date: '',
    observations: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
    handleStargazingSubmit(formData);
    setFormData(initialFormData);
  }

  // Render the form
  return (
    <div className="form">
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

    </div>
  );
}