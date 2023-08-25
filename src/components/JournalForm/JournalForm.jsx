import React, { useState, useEffect } from 'react';

export default function JournalForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting: ', title, content);
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h3>Create a New Journal Entry:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <br />
        <button type="submit">Create Entry</button>
      </form>
    </div>
  );
}