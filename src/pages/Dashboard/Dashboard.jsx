import React, { useState, useEffect } from 'react';
import StargazingForm from '../../components/StargazingForm/StargazingForm';
import * as stargazingApi from '../../utilities/stargazing-api';


export default function Dashboard({ user }) {

  // State for stargazing entries
  const [stargazingEntries, setStargazingEntries] = useState([]);

  // Fetch stargazing entries on mount
  useEffect(() => {
    async function fetchEntries() {
      try {
        const entries = await stargazingApi.fetchStargazing();
        setStargazingEntries(entries);
      } catch (error) {
        console.error('Error fetching stargazing entries:', error);
      }
    }
    fetchEntries();
  }, []);

  // Handle submit for new stargazing entry
  async function handleStargazingSubmit(entry) {
    try {
      const newEntry = await stargazingApi.createStargazing(entry);
      setStargazingEntries([...stargazingEntries, newEntry]);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <main>
      <h2>Welcome {user.name}</h2>
      {/* Display past stargazing entries */}
      <h3>Your Stargazing Entries</h3>
      <div>
        {stargazingEntries.map(entry => (
          <div key={entry._id}>
            <h4>{entry.title}</h4>
            <p>{entry.observations}</p>
          </div>
        ))}
      </div>

      {/* Stargazing entry form */}
      <StargazingForm handleStargazingSubmit={handleStargazingSubmit} />

    </main>
  );
}
