import React, { Component } from 'react';
import './ListItem.css';

class ListItem extends Component {
    render() {
        return (
            <div className="row list">
                <div className="col-5 list-item">{this.props.title}</div>
                <div className="col-5 list-data">{this.props.type}</div>
            </div>
        );
    }
}

export default ListItem;