import React, { Component } from "react";
import axios from 'axios';
export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            animal_number: '',
            time: '',
            id_slot: this.props.match.params.time,
        };

        this.input = React.createRef();
    };

    readData() {
        this.setState({ animal_number: this.props.match.params.number })
        this.setState({ time: this.props.match.params.time })
        axios.get(`http://localhost:8000/animals/'${this.props.match.params.number}'/slots/'${this.props.match.params.time}'/book`)
            .then(res => {
                this.setState({ id_slot: this.props.match.params.time });
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    componentDidMount() {
        this.readData()
    };

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.number !== this.props.match.params.number || prevProps.match.params.time !== this.props.match.params.time) {
            this.readData()
        }
    };

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { firstname, lastname, phone, id_slot } = this.state;

        const book = {
            firstname,
            lastname,
            phone,
            id_slot,
        };

        axios
            .post(`http://localhost:8000/animals/${this.props.match.params.number}/slots/${this.props.match.params.time}/book`, book)
            .then(() => window.open(`http://localhost:3000/animals/${this.props.match.params.number}/slots`).alert('You have booked time!'))
            .catch(err => {
                console.error(err);
            });
    };

    render() {
        const { time } = this.state;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Firstname</label>
                        <input type="text" className="form-control" name="firstname" maxlength="255" required onChange={this.handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Lastname</label>
                        <input type="text" className="form-control" name="lastname" maxlength="255" required onChange={this.handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" name="phone" maxlength="11" required onChange={this.handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="id_slot" value={time} ref={this.input} onChange={this.handleInputChange} readOnly hidden />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}