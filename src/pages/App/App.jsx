import { useState } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import { getUser } from '../../utilities/users-service';
import { Route, Routes } from 'react-router-dom'; // Use BrowserRouter
import SearchPage from '../SearchPage/SearchPage';
import PicOfTheDayPage from '../PicOfTheDayPage/PicOfTheDayPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <SideBar user={user} setUser={setUser} />
      <Routes>
        {/* Show PicOfTheDayPage if there is no logged-in user */}
        <Route path="/" element={<PicOfTheDayPage />} />

        {/* Render AuthPage only when logged out */}
        <Route path="/login" element={<AuthPage setUser={setUser} />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </main>

  );
}

