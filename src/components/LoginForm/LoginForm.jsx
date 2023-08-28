// Import React hooks for state and navigation
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import user service methods 
import * as usersService from '../../utilities/users-service';

// Import the CSS
import './LoginForm.css';


export default function LoginForm({ setUser }) {

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // State for form credentials 
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // State for any error messages
  const [error, setError] = useState('');

  // Update credentials state on input change
  function handleChange(evt) {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value
    });
    setError('');
  }

  // Handle form submission
  async function handleSubmit(evt) {
    // Prevent default form submit
    evt.preventDefault();

    try {
      // Call login service and set user state
      const user = await usersService.login(credentials);
      setUser(user);

      // Redirect to main page on success 
      navigate('/');

    } catch {
      // Show error message on failure
      setError('Log In Failed - Try Again');
    }
  }
  // Render form
  return (
    <div>
      <div className="login-form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}