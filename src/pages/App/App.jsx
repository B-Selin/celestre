import { useState } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import { getUser } from '../../utilities/users-service';
import { Route, Routes } from 'react-router-dom'; // Use BrowserRouter
import SearchPage from '../SearchPage/SearchPage';
import PicOfTheDayPage from '../PicOfTheDayPage/PicOfTheDayPage';
import DisplayPage from '../DisplayPage/DisplayPage';
import AboutPage from '../AboutPage/AboutPAge';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <SideBar user={user} setUser={setUser} />
      <div className="main-content">
        <Routes>
          {/* Show PicOfTheDayPage if there is no logged-in user */}
          <Route path="/" element={<PicOfTheDayPage />} />

          {/* Render AuthPage only when logged out */}
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
          <Route path="/search" element={<SearchPage />} />
          {/* Route to DisplayPage and pass search results as state */}
          <Route path="/display" element={<DisplayPage />} />
          {/* route to AboutPage */}
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </main>

  );
}

