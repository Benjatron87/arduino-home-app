import React, { Component } from 'react';
import axios from 'axios';
import './Data.css';
import dataSet from '../../data.json';
import ListItem from '../ListItem/ListItem';

class Data extends Component {

    state = {
        temp: "84",
        door: "open"
    }

    componentDidMount(){
        axios.get('/api/temp')
        .then(function (response) {
            console.log(response);
            this.setState({temp: response})
          })
         .catch(function (error) {
            console.log(error);
         });
    }

    render() {
        return (
            <div className="data-container">
                <h1>My House</h1>
                <div className="data-wrapper">
                    {dataSet.map((data,index) => (
                        <ListItem
                        title={data.title}
                        type={data.type}
                        key={index}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Data;