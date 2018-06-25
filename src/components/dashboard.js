import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';

import Search from './search-input';
import Results from './results';
import Trips from './trips';
import TripResults from './tripResults';
// import Map from './map';
import GoogleMapWrapper from './googleMapWrapper';



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
            {/* <h1 className={"dash-name"}>Wanderlust</h1> */}
            <nav className={"nav-links"}>
            <ul className={"header-nav"}>
                <li><a href="default.asp">Home</a></li>
                <li><a href="news.asp">News</a></li>
                <li><a href="contact.asp">Contact</a></li>
                <li><a href="about.asp">About</a></li>
            </ul>
                </nav>
                </header>
                <h1 className={"app-name-overview"}>Wanderlust</h1>
                <Search />
                <GoogleMapWrapper />
                <Trips />
                <Results />
                <TripResults />
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
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
