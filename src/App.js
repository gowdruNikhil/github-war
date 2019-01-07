import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import Result from './Components/Result/Result';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="imageAtCentre">
              <img src={require("./assets/images/wars.png")} className="img-responsive" alt="Logo" />
            </div>

            <Switch>
              <Route path="/result" component={Result} />
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
