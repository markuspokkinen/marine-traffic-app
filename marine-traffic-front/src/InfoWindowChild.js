import React, { Component } from 'react';

export default class InfoWindowChild extends Component {
    render() {
        const postype = [
            "undefined ", "GPS", "GLONASS",
            "combined GPS/ GLONASS", "Loran-C",
            "Chayka", "integrated navigation system",
            "surveyed", "Galileo",
            "not used", "not used",
            "not used", "not used",
            "not used", "not used",
            "internal GNSS"
        ];
        const navStat = [
            "under way using engine", "at anchor",
            "not under command", "restricted maneuverability",
            "constrained by her draught", "moored",
            "aground", "engaged in fishing",
            "under way sailing", " reserved for future",
            "reserved for future", "power-driven vessel towing astern(regional use)",
            " power-driven vessel pushing ahead or towing alongside (regional use)",
            "reserved for future use","AIS-SART (active)","default"
        ];
        //console.log(this.props.marker.properties.timestampExternal);
        let date = new Date(this.props.marker.properties.timestampExternal);
        return (
            <div>
                <p>Destination: {this.props.response.destination}</p>
                <p>Heading: {this.props.marker.properties.heading !== 511 ? this.props.marker.properties.heading : "not available"}&#176;</p>
                <p>Ship Name: {this.props.response.name}</p>
                <p>Ship Type: {this.props.response.shipType}</p>
                <p>Positioning device: {postype[this.props.response.posType]}</p>
                <p>Navigational Status: {navStat[this.props.marker.properties.navStat]}</p>
                <p>Last Updated: {date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}</p>
            </div>
        )
    }
}