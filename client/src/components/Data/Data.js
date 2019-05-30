import React, { Component } from 'react';
import API from '../../utils/API';
import './Data.css';
import ListItem from '../ListItem/ListItem';

class Data extends Component {

    state = {
        temp: "",
        door: "",
        switchArr: []
    }

    componentDidMount(){
        API.getTemp().then((result) => {
            console.log(result);
            const temp = result.data[result.data.length - 1].Temp;

            this.setState({
                temp
            })
        })
        API.getDoor().then((result) => {
            console.log(result);
            const door = result.data[result.data.length - 1].doorStatus;

            this.setState({
                door
            })
        })
        API.getSwitch().then((result) => {
            console.log(result.data);
            const switchArr = result.data;

            this.setState({
                switchArr
            })
        })  
    }

    render() {
        return (
            <div className="data-container">
                <h1>My House</h1>
                <div className="data-wrapper">
                        <ListItem title="Temperature:" type={this.state.temp}/>
                        <ListItem title="Door Status:" type={this.state.door}/>
                        {this.state.switchArr.map((switches,index)=> (
                            <ListItem id={switches.id} title={switches.name} type={switches.position === 1 ? "On" : "Off"}/>
                        ))
                        }
                </div>
            </div>
        );
    }
}

export default Data;