import React, { Component } from 'react';
import Moment from 'react-moment';
import Button from '../Button/Button';
import './ListItem.css';

class ListItem extends Component {

    render() {
        return (
            <div className="row list">
                <div className="col-6 list-item">{this.props.title}</div>

                <div className="col-1"></div>
                
                {this.props.type === "Button" ? 
                <Button idName={this.props.position === "On" ? "on" : "off"} id={this.props.id} onClick={() => this.toggleSwitch()}>{this.props.position}</Button> : <div className="data col-4 list-data" id={this.props.idName}> {this.props.door ? this.props.door : this.props.temp + '\u00b0 F'}</div>}

                <div className="time">{this.props.time ? <div>Updated At: <Moment format="YYYY/MM/DD hh:mm">{this.props.time}</Moment></div> : ''}</div>

                <div className="col-1"></div>
                
            </div>
        );
    }
}

export default ListItem;