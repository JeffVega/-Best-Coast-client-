import React from 'react';
import {connect} from 'react-redux';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';

const MapWithAMarker = withScriptjs(withGoogleMap(props => 
    <GoogleMap
      defaultZoom={14}
      center={props.center}
    >
      {props.results.map((marker, index) => {
        return (
          <Marker 
            key={index}
            position={marker.geometry.location}
          />
        )
      })}
    </GoogleMap>
));


class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      }
    }
  }
getGeoLocation = () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          position => {
              console.log("this is our position coords",position.coords);
              this.setState(prevState => ({
                  currentLatLng: {
                      ...prevState.currentLatLng,
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              }))
          }
      )
  } else {
      error => console.log(error)
  }
}
  render() {
    
    this.getGeoLocation()
    return (
    <MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    results={this.props.results}
    center={this.state.currentLatLng}
    />
    );
  }
};


const mapStateToProps = state => {
  return {
    results: state.protectedData.results
  }
}

export default connect(mapStateToProps)(Map);