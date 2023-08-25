import React, { useState, useEffect } from 'react';
import StargazingForm from '../../components/StargazingForm/StargazingForm';
import * as stargazingApi from '../../utilities/stargazing-api';


export default function Dashboard({ user }) {

  // State for stargazing entries
  const [stargazingEntries, setStargazingEntries] = useState([]);

  // Fetch stargazing entries on mount
  useEffect(() => {
    console.log('User before fetch:', user);
    async function fetchEntries() {
      try {
        const entries = await stargazingApi.fetchStargazing();
        setStargazingEntries(entries);
      } catch (error) {
        console.error('Error fetching stargazing entries:', error);
      }
    }
    fetchEntries();
    console.log('User after fetch:', user);
  }, []);



  // Handle submit for new stargazing entry
  async function onSubmit(entry) {
    try {
      const entryWithUser = { ...entry, user: user._id };

      const newEntry = await stargazingApi.createStargazing(entryWithUser);
      console.log('Created new entry', newEntry);

      console.log('New entry created!', newEntry);
      setStargazingEntries([newEntry, ...stargazingEntries]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleStargazingDelete(id) {
    try {
      await stargazingApi.deleteStargazing(id);
      setStargazingEntries(stargazingEntries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <main>
      <h2>Welcome {user.name}</h2>


      {/* Stargazing entry form */}
      <StargazingForm onSubmit={onSubmit} />
      {/* Display past stargazing entries */}
      <h3>These are the observations from other astronomy enthusiasts</h3>


      <table>
        <thead>
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
              <td>{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</td>
              <td>{user.name}</td>
              <td>{entry.title}</td>
              <td>{entry.observations}</td>
              <td>
                {entry.user.toString() === user._id.toString() && (

                  <button onClick={() => {
                    console.log('Delete button clicked for entry:', entry._id);
                    handleStargazingDelete(entry._id);
                  }}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
