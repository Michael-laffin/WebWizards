import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectDetail = ({ match }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${match.params.id}`);
        setProject(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchProject();
  }, [match.params.id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>Budget: ${project.budget}</p>
      <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
      <p>Client: {project.client.name}</p>
    </div>
  );
};

export default ProjectDetail;
