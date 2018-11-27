import React, { Component } from 'react';
import Home from './components/Home';
import PlayerPage from './components/PlayerPage';
import { Route, Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/player/:playerName" component={PlayerPage} exact={false} />
        <Route component={Home} exact />
      </Switch>
    );
  }
}



export default App;
