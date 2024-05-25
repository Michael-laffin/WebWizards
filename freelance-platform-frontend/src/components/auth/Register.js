import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';

const Register = ({ register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'freelancer'
  });

  const { name, email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    register({ name, email, password, role });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
      </div>
      <div>
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      </div>
      <div>
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      </div>
      <div>
        <select name="role" value={role} onChange={onChange}>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default connect(null, { register })(Register);
