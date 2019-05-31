import React, { Component } from 'react';
import Button from '../Button/Button';
import './ListItem.css';

class ListItem extends Component {

    render() {
        return (
            <div className="row list">
                <div className="col-6 list-item">{this.props.title}</div>
                <div id={this.props.idName} className="col-6 list-data">
                    {this.props.type === "Button" ? 
                    <Button id={this.props.id} position={this.props.position} onClick={() => this.toggleSwitch()}/> :
                    this.props.door ? this.props.door : this.props.temp}
                </div>
            </div>
        );
    }
}

export default ListItem;