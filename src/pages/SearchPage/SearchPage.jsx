import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirects

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Limit the search with the keywords instead of everything
  async function handleSearchSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(`https://images-api.nasa.gov/search?keywords=${searchQuery}`);
      setSearchResults(response.data.collection.items);

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    // do not navigate to the DisplayPage in here

    // Lets add a nice little error message in case the search results with nothing
    if (searchResults.length === 0) {
      setErrorMessage("We sense a disturbance in the Force... or maybe just an error. How about trying a different keyword?");

    }
  }

  return (
    <div>
      <h2>Discover Cosmos</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search the cosmos for galaxies, nebulae, and more...(i.e. 'Alderaan')"
          style={{ width: '500px' }}
        />
        <button type="submit">Search</button>
      </form>

      {/* Navigate to DisplayPage after fetching and setting search results */}
      {searchResults.length > 0 && <Navigate to="/display" state={searchResults} />}

    </div>
  );
}



