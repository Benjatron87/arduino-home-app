import React, { Component } from 'react';
import Button from '../Button/Button';
import './ListItem.css';

class ListItem extends Component {
    render() {

        return (
            <div className="row list">
                <div className="col-6 list-item">{this.props.title}</div>
                <div className="col-6 list-data">{this.props.type === "On" || this.props.type === "Off" ? <Button position={this.props.type} toggle={this.toggleSwitch} id={this.props.id}/> : this.props.type}</div>
            </div>
        );
    }
}

export default ListItem;