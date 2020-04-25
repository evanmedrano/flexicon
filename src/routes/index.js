import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, WordPlay } from '../screens';

function Routes(props) {
  return (
    <Router>
      {props.header}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path ="/brain-dump" />
        <Route path ="/word-play" component ={WordPlay} />
      </Switch>
    </Router>
  )
}

export default Routes;
