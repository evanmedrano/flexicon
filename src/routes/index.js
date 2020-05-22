import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, Signup, WordPlay } from '../screens';

function Routes(props) {
  return (
    <Router>
      {props.header}
      <Switch>
        <Route exact path="/" component={WordPlay} />
        <Route path ="/login" component={Login} />
        <Route path ="/signup" component={Signup} />
      </Switch>
    </Router>
  )
}

export default Routes;
