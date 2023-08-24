import React, { useState } from 'react';
import axios from 'axios';


export default function PhotoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('keywords', keywords);
    formData.append('photo', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Photo uploaded successfully:', response.data);
      // Display success message or navigate to another page
    } catch (error) {
      console.error('Error uploading photo:', error);
      // Display error message
    }
  };

  return (
    <div>
      <h2>Upload Your Photo</h2>
      <form onSubmit={handleSubmit}>
        <br></br>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br></br>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br></br>
        <label htmlFor="keywords">Keywords (comma-separated):</label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
        />
        <br></br>
        <label htmlFor="photo">Select a photo:</label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handleFileChange}
        />
        <br></br>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
