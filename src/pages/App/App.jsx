import { useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import './App.css'
import AuthPage from '../AuthPage/AuthPage';
import { getUser } from '../../utilities/users-service';


export default function App() {

  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ?
        <>
          <SideBar user={user} setUser={setUser} />
          <div className="content">
            <h1>HOMEPAGE</h1>
          </div>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );


}

