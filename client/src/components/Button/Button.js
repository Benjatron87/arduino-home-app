import React, { Component } from 'react';
import API from '../../utils/API';
import './Button.css';

class Button extends Component {

    toggleSwitch() {

        let state;

        if(this.props.children === "On"){
            state = "Off";
        }
        else if (this.props.children === "Off"){
            state = "On";
        }
        else{
            console.log(this.props.children);
        }

        console.log(this.props.children);
        API.flipSwitch(this.props.id, {state});
    }

    render() {
        return (
            <div onClick={() => this.toggleSwitch()} className={`button col-4 list-data ${this.props.idName}`}>
                {this.props.children}
            </div>
        );
    }
}

export default Button;