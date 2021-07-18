import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import Form from './form';
import * as moment from 'moment';
export default class Slots extends Component {
    state = {
        animal_number: '',
        slots: []
    };
    readData() {
        this.setState({ animal_number: this.props.match.params.number })
        axios.get(`http://localhost:8000/animals/'${this.props.match.params.number}'/slots`)
            .then(res => {
                this.setState({ slots: res.data.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.readData()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.number !== this.props.match.params.number) {
            this.readData()
        }
    }
    render() {
        const { animal_number, slots } = this.state;
        if (slots.length === 0) {
            return (
                <div>
                    <h1>Animals: {animal_number}</h1>
                    <div>No data</div>
                </div>
            )
        } else {
            return (
                <Router>
                    <div>
                        <h1>Slots:</h1>
                        <ul className="list-group">
                            {slots.map(slot => (
                                <li className="list-group-item" key={slot.id}>
                                    <p>Date: {moment(slot.date).format('MM.DD.YYYY')}</p>
                                    <p>Time: {slot.start_time} - {slot.end_time}</p>
                                    <Link className="btn btn-primary" to={`/animals/${animal_number}/slots/${slot.id}/book`}>Reserve</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Switch>
                        <Route path="/animals/:number/slots/:time/book" component={Form} />
                    </Switch>
                </Router>
            );
        }
    }
}