import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirects
import './SearchPage.css';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // add a current page state for the searched more than 100 page

  // Limit the search with the keywords instead of everything
  async function handleSearchSubmit(event) {
    event.preventDefault();
    console.log('Trying to fetch search results...'); // Debugging line

    try {
      if (searchQuery.length < 5) {
        setErrorMessage('Search query must be at least 5 characters long.');
        setSearchResults([]); // Clear existing search results
      } else {
        const response = await axios.get(`https://images-api.nasa.gov/search?q=${searchQuery}`);
        console.log('API Response:', response.data.collection.items);
        setSearchResults(response.data.collection.items);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }

    // Debugging line
    console.log('Search results length:', searchResults.length);

    // Lets add a nice little error message in case the search results with nothing
    if (searchResults.length === 0) {
      setErrorMessage(`It doesn't look like ${searchQuery} exist in the universe... or maybe just a typo. How about trying a different keyword?`);

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



