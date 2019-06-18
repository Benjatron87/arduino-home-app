import React, { Component } from 'react';
import "./GoogleWrapper.css";

class GoogleWrapper extends Component {
    render() {
        return (
            <div className="google-wrapper">
                <h2>Sign Into My House</h2>
                {this.props.children}
            </div>
        );
    }
}

export default GoogleWrapper;