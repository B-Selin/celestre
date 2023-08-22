import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './DisplayPage.css';

export default function DisplayPage() {
  const location = useLocation();
  const searchResults = location.state || [];

  return (
    <div className="photos-grid">
      {searchResults.length > 0 ? (
        searchResults.map(result => (
          <div key={result.data[0].nasa_id} className="photo-card">
            <img src={result.links[0].href} alt={result.data[0].title} />
            <div className="overlay"><span>{result.data[0].title}</span></div>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}