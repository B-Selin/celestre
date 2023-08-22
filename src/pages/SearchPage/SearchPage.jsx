import React, { useState } from 'react';
import axios from 'axios';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  async function handleSearchSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(`https://images-api.nasa.gov/search?q=${searchQuery}`);
      setSearchResults(response.data.collection.items);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return (
    <div>
      <h2>Search Page</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Enter search query"
        />
        <button type="submit">Search</button>
      </form>

    </div>
  );
}

export default SearchPage;
