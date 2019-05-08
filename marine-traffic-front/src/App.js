import React, { Component } from 'react';
import MapContainer from './MapContainer';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            status:""
        }
    }
    componentDidMount() {
        this.getdata();
        this.timer = setInterval(() => this.getdata(), 120000);
    }
    getdata = () => {
        console.log("updated")
        fetch("https://meri.digitraffic.fi/api/v1/locations/latest")
            .then(res => res.json())
            .then(response => {
                this.setState({
                    features: response.features,
                    status:"Ok"
                })
            })
    }
    render() {
        if (this.state.status === "Ok") {
            return (
                <div className="App" >
                    <MapContainer data={this.state.features} />
                </div>
            );
        } else {
            return (
                <div className="App">
                    <p>Loading Data</p>
                </div>
                )
        }
    }
}
