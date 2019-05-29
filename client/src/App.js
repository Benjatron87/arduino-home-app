import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from "./components/login/Login";
import Home from "./pages/Home/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        {(undefined !== undefined) ? 
        <Router>
          <Route exact path='/home' component={Home} />
        </Router>
        // so it's forcing me to add the router here which is weird
        : <Router><Login /></Router>}

      </div>
    );
  }
}

export default App;