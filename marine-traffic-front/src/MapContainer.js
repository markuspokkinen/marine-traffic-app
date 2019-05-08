import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import InfoWindowChild from './InfoWindowChild';

export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMarker: {},
            InfoWindowChild: <div></div>
        }
    }
    onMarkerClick(props, marker, e) {
        fetch("https://meri.digitraffic.fi/api/v1/metadata/vessels/" + marker.data.mmsi)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    activeMarker: marker,
                    InfoWindowChild: <InfoWindowChild response={response} marker={marker.data} />
                });
            })

    }
    render() {
        return (
            <Map google={this.props.google} initialCenter={{ lat: 60.454510, lng: 22.264824 }} zoom={8}>
                {this.props.data.map(element => {
                    return <Marker key={element.mmsi} data={element} position={{ lat: element.geometry.coordinates[1], lng: element.geometry.coordinates[0] }} onClick={this.onMarkerClick.bind(this)} />
                })}
                <InfoWindow marker={this.state.activeMarker} visible={true}>
                    {this.state.InfoWindowChild}
                </InfoWindow>
            </Map>
        );
    }
}
const LoadingContainer = (props) => {
    return <div>Loading Map....</div>
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyBkUTKN29rYQQ8ckBVNtGfyWgQ9G68EN1M",
    LoadingContainer: LoadingContainer
})(MapContainer)