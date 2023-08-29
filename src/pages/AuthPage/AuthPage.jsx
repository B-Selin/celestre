import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className="auth-page">
      <h2>Welcome Space Enthusiast</h2>
      <button className='button' onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'Already have an account? Log In' : "Don't have an acocunt? Sign Up"}</button>
      {showSignUp ?
        <SignUpForm setUser={setUser} />
        :
        <LoginForm setUser={setUser} />
      }
    </main>
  );
}