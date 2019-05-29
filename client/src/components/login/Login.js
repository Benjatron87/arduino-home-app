import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import ids from './keys'
import './login.css'


class Login extends Component {
  // need to save this state to store as well figure out if i want to use token

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
  // this is working
  googleResponse = (response) => {
    const userData = response.profileObj;
    console.log(userData)
    this.setState({
        user: response.profileObj,
        isAuthenticated: true
    })
  }
  
  onFailure = error => {
    console.log(error)
  }
  render() {
    let content =
        (
            <div className='login'>
                     <div className='google'>
                <GoogleLogin
                    clientId={ids.google.clientID}
                    icon={true}
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                />
                </div>
            </div>
        );


    return (
        <div className="App">
            {content}
        </div>
    );
}
}

export default Login;
