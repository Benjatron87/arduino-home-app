import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        return (
            <div style={{background: this.props.position === "On" ? 'green' : 'red'}} className="button">
                {this.props.position}
            </div>
        );
    }
}

export default Button;