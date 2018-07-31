import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setMarkerLocation } from '../actions/protected-data';
import {fetchTrips, fetchTripDetails, removeTrip, closeTripMarkers} from '../actions/protected-data';
import {openTrip as openClickedTrip} from '../actions/results';
import TripResults from './tripResults';
import '../css/trips.css'
class Trip extends Component {
    componentDidMount() {
        this.props.dispatch(fetchTrips())
    }

    openTrip(inc) {
        if (this.props.tripClicked === inc) {
            this.props.dispatch(openClickedTrip(false));
            this.props.dispatch(closeTripMarkers());
        }
        else {
            this.props.dispatch(openClickedTrip(inc));
            this.props.dispatch(fetchTripDetails(this.props.trips[inc].id));
            this.props.dispatch(setMarkerLocation(this.props.trips[inc].location))
        }
    }

    render() {
        let trips;
        if (this.props.trips.length >= 1) {
            trips = this.props.trips.map((trip, inc) =>
                {  
                    let results;
                    if (this.props.tripClicked === inc) {
                        results = <TripResults />
                    }
                    return (
                        <div className="trips-data" key={inc}>
                        <div className="showing-trips" key={inc} onClick={() =>  this.openTrip(inc)}>
                            <p className="trip-card-name">{trip.name}</p>
                            <div className="delete-data" >
                            <button className="delete-button" onClick={(e) => { 
                                e.stopPropagation();
                                if (window.confirm(`Are you sure you want to delete ${this.props.trips[inc].name}?`)) this.props.dispatch(removeTrip(this.props.trips[inc].id))
                            }}>Delete</button>
                            </div>
                            {results}
                        </div>
                        </div>
                    );
                }
            );
        }
        return (
                <div className="trips-list">
                    <h2 className="trips-title">Trips</h2>
                    {trips}
                </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        trips: state.protectedData.trips,
        tripClicked: state.result.tripClicked
    }
}

export default connect(mapStateToProps)(Trip);