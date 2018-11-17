import React, { Component } from 'react';
import Home from './components/Home';
import { Route, Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Switch>
          <Route path="/" component={Home} exact />
      </Switch>
    );
  }
}



export default App;
