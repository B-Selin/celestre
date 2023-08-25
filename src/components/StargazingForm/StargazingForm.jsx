import React, { useState } from 'react';


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
    <div className="stargazing-form-container">
      <form onSubmit={handleSubmit} className="stargazing-form">
        <h2>Stargazing Entry</h2>
        <label>
          <br />
          Title:

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:

          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </label>

        <br />
        <label>
          Observations:

          <textarea
            name="observations"
            value={formData.observations}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Entry</button>
      </form>
    </div>
  );
}
