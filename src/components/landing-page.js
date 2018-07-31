import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import '../css/landing.css'
const mainBg = {
    maxWith:"100%",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  export class LandingPage extends React.Component{
      constructor(){
          super()
      }
    // If we are logged in redirect straight to the user's dashboard
    
render(){
    if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
        <header className="landing-header">
            <h1 className="landing-banner">WanderLust</h1>
            </header>
        <div className="landing-login">
            <LoginForm />
            <Link to="/register" className="landing-register-link">Register</Link>
        </div>
        <div className="infobox-container">
            <div className="infobox1">
                <p>Plan your next trip!</p>
            </div>
            <div className="infobox2">
                <p>Add unique destinations!</p>
            </div>
            <div className="infobox3">
                <p>Keep notes for each stop!</p>
            </div>
        </div>
        <div>


            </div>
        </div>
    );
}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
