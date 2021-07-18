import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Slots from './slots';
import axios from 'axios';
export default class Animals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animals: [],
        };
      }
      componentDidMount() {
        axios.get('http://localhost:8000/animals')
          .then(res => {
            this.setState({ animals: res.data.data });
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    render(){
        const { animals } = this.state;
        console.log(animals);
        return (
            <Router>
                <div className="row mt-5">
                    {animals.map(animal => (
                        <div className="card col-md-4" key={animal.id}>
                            <div className="card-body">
                                <h5 className="card-title">{animal.name}</h5>
                                <Link className="btn btn-primary" to={`/animals/${animal.id}/slots`}>Watch Slots</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <Switch>
                  <Route path="/animals/:number/slots" component={Slots} />
                </Switch>
            </Router>
        );
    }
}