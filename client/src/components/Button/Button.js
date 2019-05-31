import React, { Component } from 'react';
import './Button.css';
import API from '../../utils/API';

class Button extends Component {

    state = {
        status: this.props.position
    }

    toggleSwitch() {
        console.log(this.props.id, this.state.status);
        API.flipSwitch(this.props.id, {state: this.state.status});

        if(this.state.status === "On"){
            this.setState({
                status: "Off"
            })
        }
        else{
            this.setState({
                status: "On"
            })
        }
    }

    render() {
        return (
            <div onClick={() => this.toggleSwitch()} style={{background: this.state.status === "On" ? 'green' : 'red'}} className="button">
                {this.state.status}
            </div>
        );
    }
}

export default Button;