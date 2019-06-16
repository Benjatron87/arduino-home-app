import React, { Component } from 'react';
import Button from '../Button/Button';
import './ListItem.css';

class ListItem extends Component {

    render() {
        return (
            <div className="row list">
                <div className="col-6 list-item">{this.props.title}</div>

                <div className="col-1"></div>
                
                {this.props.type === "Button" ? 
                <Button id={this.props.id} position={this.props.position} onClick={() => this.toggleSwitch()}/> : <div className="data col-4 list-data" id={this.props.idName}> {this.props.door ? this.props.door : this.props.temp + '\u00b0 F'}</div>}

                <div className="col-1"></div>
                
            </div>
        );
    }
}

export default ListItem;