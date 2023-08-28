// Import React hooks for state and effects
import React, { useState, useEffect } from 'react';

// Import child components  
import StargazingForm from '../../components/StargazingForm/StargazingForm';

// Import API utility functions
import * as stargazingApi from '../../utilities/stargazing-api';

// Import component CSS
import './Dashboard.css';

export default function Dashboard({ user }) {

  // State for stargazing entries
  const [stargazingEntries, setStargazingEntries] = useState([]);

  // Fetch entries on initial render
  useEffect(() => {
    // Async function to get entries from API
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
      // Add user ID to entry
      const entryWithUser = { ...entry, user: user._id };
      // Create entry in API
      const newEntry = await stargazingApi.createStargazing(entryWithUser);
      // Update state with new entry 
      setStargazingEntries([newEntry, ...stargazingEntries]);
      console.log('New entry created:', newEntry);
    } catch (error) {
      console.error(error);
    }
  }

  // Handle entry deletion
  async function handleStargazingDelete(id) {
    try {
      // Delete entry in API
      await stargazingApi.deleteStargazing(id);
      // Update state by filtering out deleted entry
      setStargazingEntries(stargazingEntries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  // Render UI 
  return (
    <main>
      <div className="dashboard-container">
        <h2>Welcome {user.name}</h2>


        {/* Stargazing entry form */}
        <div className="entry-form">
          <StargazingForm handleStargazingSubmit={handleStargazingSubmit} />
        </div>
        {/* Display past stargazing entries */}
        <div className="entry-list">
          <h3 className="mt-4">These are the observations from other astronomy enthusiasts</h3>


          <table className="table table-bordered table-hover mt-2">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>Observer</th>
                <th>Title</th>
                <th>Observations</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {stargazingEntries.map(entry => (
                <tr key={entry._id}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.user.name}</td>
                  <td>{entry.title}</td>
                  <td>{entry.observations}</td>
                  {/* add delete button that only shows when logged in user matches entry user */}
                  <td>
                    {entry.user._id === user._id && (
                      <button className="btn btn-sm btn-danger" onClick={() => handleStargazingDelete(entry._id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main >
  );
}
