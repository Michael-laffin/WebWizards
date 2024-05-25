import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProjectList from './components/projects/ProjectList';
import PostProject from './components/projects/PostProject';
import ProjectDetail from './components/projects/ProjectDetail';
import Messages from './components/messaging/Messages';
import Payments from './components/payments/Payments';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/projects/new" component={PostProject} />
        <Route exact path="/projects/:id" component={ProjectDetail} />
        <Route exact path="/messages/:userId" component={Messages} />
        <Route exact path="/payments/:projectId/:freelancerId/:amount" component={Payments} />
      </Switch>
    </Router>
  );
};

export default App;
