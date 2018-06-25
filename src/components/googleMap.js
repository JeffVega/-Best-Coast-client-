// VERSION 2.0 MAP COMPONENT

import React from 'react';
import PlaceMarker from './place-marker';
import TripMarker from './trip-marker';
const { compose, withProps, withHandlers} = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  TrafficLayer
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const GoogleMapsWrapper = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDcXgfc08bFKvh2HkOilaX112ghHvyRBkU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className={'map-contianer'} />,
    mapElement: <div className="map-view" />,
    // style={{ height: `400px` }} 
  }),
  
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    zoom={12}
    ref={(map) => map && map.panTo(props.location)}
    // center={props.location}
  >
    <TrafficLayer autoUpdate />
    {/* results */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={30}   //changes size of cluster area
      maxZoom={15}    //changes how far map zooms when clicking cluster
      defaultMinimumClusterSize={2}  //minimum cluster size
    >
      {props.results.map((marker, index) => (
        <PlaceMarker
          key={index}
          marker={marker}
        />
      ))}
    </MarkerClusterer>

    {/* tripResults */}
    <MarkerClusterer>
      {props.tripResults.map((marker, index) => (
        <TripMarker
          key={index}
          marker={marker}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class GoogleMapComponent extends React.PureComponent {
  render() {
    return (
      <GoogleMapsWrapper 
        results={this.props.results} 
        location={this.props.location}
        tripResults={this.props.tripResults}
      />
    )
  }
}

export default GoogleMapComponent;