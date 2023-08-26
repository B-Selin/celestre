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
        <h2>Share Your Observations</h2>
        <table>
          <tbody>
            <tr>
              <td>Title:</td>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td>Observations:</td>
              <td>
                <textarea
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <button type="submit">Save Entry</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}