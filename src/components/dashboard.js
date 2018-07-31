import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';

import Search from './search-input';
import Results from './results';
import Trips from './trips';
// import Map from './map';
import GoogleMapWrapper from './googleMapWrapper';
import '../css/dashboard.css'


export class Dashboard extends React.Component {
    componentDidMount() {
        // this.props.dispatch(fetchProtectedData());
    }

    
    render() {
        // console.log(this.props.name)
        console.log(this.props)
        // console.log(this.props.currentUser)
        return (
            <div className="dashboard">
            <header className={'dash-header'}>
            <h1 className={"dash-name"}>Wanderlust</h1>  
                </header>
                
                {/* <div className="dashboard-username">
                    Username: {this.props.username}
                </div> */}
                {/* <div className="dashboard-name">Name: {this.props.name}</div> */}

                <Search />
                <GoogleMapWrapper />
                <Results />
                <Trips />
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    // console.log(currentUser)
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstname} ${currentUser.lastname}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
