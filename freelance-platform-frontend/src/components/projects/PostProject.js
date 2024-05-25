import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const PostProject = ({ history }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsRequired: '',
    budget: '',
    deadline: '',
  });

  const { title, description, skillsRequired, budget, deadline } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);

    try {
      await axios.post('/api/projects', body, config);
      history.push('/projects');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" name="title" value={title} onChange={onChange} placeholder="Title" required />
      </div>
      <div>
        <textarea name="description" value={description} onChange={onChange} placeholder="Description" required />
      </div>
      <div>
        <input type="text" name="skillsRequired" value={skillsRequired} onChange={onChange} placeholder="Skills Required" required />
      </div>
      <div>
        <input type="number" name="budget" value={budget} onChange={onChange} placeholder="Budget" required />
      </div>
      <div>
        <input type="date" name="deadline" value={deadline} onChange={onChange} required />
      </div>
      <button type="submit">Post Project</button>
    </form>
  );
};

export default connect(null, {})(PostProject);
