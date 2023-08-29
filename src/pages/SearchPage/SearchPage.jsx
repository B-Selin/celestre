// Import React hooks for state management
import React, { useState } from 'react';

// Import axios for API requests
import axios from 'axios';

// Import Navigate component for redirects
import { Navigate } from 'react-router-dom';

// Import component CSS
import './SearchPage.css';

export default function SearchPage() {
  // State to store user's search query
  const [searchQuery, setSearchQuery] = useState('');
  // State to store search results
  const [searchResults, setSearchResults] = useState([]);
  // State for any error messages
  const [errorMessage, setErrorMessage] = useState('');


  async function handleSearchSubmit(event) {
    event.preventDefault();
    // Log statement for debugging
    console.log('Trying to fetch search results for...');

    try {

      const response = await axios.get(`https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image&page_size=300`);
      console.log('API Response:', response.data.collection.items);

      // Update search results state
      setSearchResults(response.data.collection.items);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }



    // Lets add a nice little error message in case the search results with nothing
    if (searchResults.length === 0) {
      setErrorMessage(`It looks like ${searchQuery} does not exist in the universe... or maybe just a typo. How about trying a different keyword?`);

    }
  }

  return (
    <div className='search-page'>
      <h2>Discover Cosmos</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSearchSubmit}>
        <input className='search-form'
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search the cosmos for galaxies, nebulae, and more...(i.e. 'Alderaan')"
        />
        <button type="submit">Search</button>
      </form>

      {/* Navigate to DisplayPage after fetching and setting search results */}
      {searchResults.length > 0 && <Navigate
        to="/display"
        state={searchResults}
      />}



    </div>
  );
}



