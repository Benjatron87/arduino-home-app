import React, { Component } from 'react';
import Data from "../Data/Data";
import { GoogleLogin } from 'react-google-login';
import ids from './keys';
import Wrapper from "../Wrapper/Wrapper";
import './login.css';


class Login extends Component {

  state = {
    isAuthenticated: false,
    email: undefined
  }
  handleLogout = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      token: ''
    })
  }
  componentDidMount = () => {

  }
  // this is working
  googleResponse = (response) => {
    const userData = response.profileObj;
    console.log(userData);
    this.setState({
        user: userData,
        isAuthenticated: true,
        email: userData.email
      })
  }
  
  onFailure = error => {
    console.log(error)
  }

  render() {
    return (
       
      <Wrapper>
          {this.state.email === "benjt122@gmail.com" ?  
            <Data/> 
            : 
            <div className="google">
              <GoogleLogin
                clientId={ids.google.clientID}
                icon={true}
                onSuccess={this.googleResponse}
                onFailure={this.onFailure}
              />
            </div>
          }
      </Wrapper>
        
    );
}
}


export default Login;
