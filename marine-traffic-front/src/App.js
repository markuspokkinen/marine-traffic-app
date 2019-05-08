import React, { Component } from 'react';
import MapContainer from './MapContainer';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            status: ""
        }
    }
    componentDidMount() {
        this.getdata();
        this.timer = setInterval(() => this.getdata(), 60000);
    }
    getdata = () => {
        console.log("updated")
        fetch("https://meri.digitraffic.fi/api/v1/locations/latest")
            .then(res => res.json())
            .then(response => {
                this.setState({
                    features: response.features,
                    status: "Ok"
                })
            })
    }
    render() {
        if (this.state.status === "Ok") {
            return (
                <MapContainer data={this.state.features} />
            );
        } else {
            return (
                <p>Loading Data</p>
            );
        }
    }
}
