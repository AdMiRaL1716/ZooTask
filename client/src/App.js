import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Animals from './components/animals';
import Navigation from './components/navigation';
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <a className="navbar-brand">ZooFacility: </a>
              <button className="navbar-toggler" type="button" datatoggle="collapse" data-target="#navbarSupportedContent" ariacontrols="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Navigation></Navigation>
              </div>
            </nav>
          </header>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Switch>
                  <Route path="/animals" component={Animals} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}