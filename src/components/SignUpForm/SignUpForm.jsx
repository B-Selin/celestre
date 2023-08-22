import React, { useState } from 'react';
import { signUp } from '../../utilities/users-service';

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
    } catch {
      setError('Sign Up Failed - Try Again');
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
