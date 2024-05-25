import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      </div>
      <div>
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default connect(null, { login })(Login);
