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
            <div className='landing-background'>
        <div className="landing-login">
            <LoginForm />
            <Link to="/register" className="landing-register-link">Register</Link>
        </div>
        <div className="infobox-container">
            <div className="infobox1">
                <p>Plan your next trip!</p>
                <img src='https://user-images.githubusercontent.com/34497456/43499224-56e658f0-94ff-11e8-8389-6860ce7c9565.gif'/>
            </div>
            <div className="infobox2">
                <p>Add unique destinations!</p>
                <img src='https://user-images.githubusercontent.com/34497456/43499356-e717058c-94ff-11e8-9546-6976ca91f554.gif'/>
            </div>
            <div className="infobox3">
                <p>Keep notes for each stop!</p>
                <img src='https://user-images.githubusercontent.com/34497456/43499443-595cd43c-9500-11e8-8e37-88c0b8447c18.gif'/>
            </div>
        </div>
        </div>

        </div>
    );
}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
