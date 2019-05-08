import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import InfoWindowChild from './InfoWindowChild';

export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMarker: {},
            showingInfoWindow: false,
            InfoWindowCild: ""
        }
    }

    onMarkerClick(props, marker, e) {
     //   console.log(marker.data);
        fetch("https://meri.digitraffic.fi/api/v1/metadata/vessels/" + marker.data.mmsi)
            .then(res => res.json())
            .then(response => {
                //console.log(response);
                this.setState({
                    activeMarker: marker,
                    showingInfoWindow: true,
                    InfoWindowCild: <InfoWindowChild response={response} marker={marker.data} />

                })
            })

    }
    render() {

        return (
            <Map google={this.props.google} initialCenter={{
                lat: 60.454510,
                lng: 22.264824
            }} zoom={8}>
                {this.props.data.map(element => {
                    //console.log(element)

                    return <Marker key={element.mmsi} data={element} position={{ lat: element.geometry.coordinates[1], lng: element.geometry.coordinates[0] }} onClick={this.onMarkerClick.bind(this)} />
                })}
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                    <div>
                        {this.state.InfoWindowCild}
                    </div>
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