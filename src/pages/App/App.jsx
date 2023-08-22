import { useState, useEffect } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import './App.css'
import AuthPage from '../AuthPage/AuthPage';
import { getUser } from '../../utilities/users-service';
import { PicOfTheDay } from '../../utilities/PicOfTheDay';


export default function App() {

  const [user, setUser] = useState(getUser());
  const [picture, setPicture] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const pictureData = await PicOfTheDay();
        setPicture(pictureData);
      } catch (error) {
        console.error('Error fetching picture:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="App">
      {user ?
        <>
          <SideBar user={user} setUser={setUser} />
          <div className="content">
            <h1>Picture of the Day</h1>
            {picture && (
              <div>
                <h2>{picture.title}</h2>
                <img src={picture.url} alt={picture.title} />
                <p>{picture.explanation}</p>
              </div>
            )}
          </div>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );


}

