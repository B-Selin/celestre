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
        {/* ... Form input fields ... */}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
        <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
