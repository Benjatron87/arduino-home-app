import React, { Component } from 'react';
import './Data.css';
import API from '../../utils/API';
import ListItem from '../ListItem/ListItem';

class Data extends Component {

    state = {
        temp:'',
        door:'',
        solarTemp:'',
        time:'',
        switch1:'',
        switch2:'',
        switch3:''
    }

    getData(){
        API.getData().then((result) => {

            let temp = result.data[0].temp;
            let door = result.data[0].door;
            let solarTemp = result.data[3].solarTemp;
            let voltage = result.data[3].voltage;
            let time = result.data[3].updatedAt;
            let switch1 = result.data[0];
            let switch2 = result.data[1];
            let switch3 = result.data[2];

            let charge;

            voltage = 6.6 * (parseInt(voltage)/1023);

            charge = voltage;
            this.setState({
                temp,
                door,
                solarTemp,
                charge,
                time,
                switch1,
                switch2,
                switch3
            })
        })
    }

    componentDidMount(){
        this.getData();
        
        setInterval(() => {
            this.getData();
        },1000)
    }

    render() {
        return (
            <div className="data-container">
                <h1>My House</h1>
                <div className="data-wrapper">
                        <ListItem className="data" title="Bedroom:" idName={parseInt(this.state.temp) > 85 ? "red" : "green"} temp={this.state.voltage}/>

                        <ListItem className="data" title="Outside:" idName={parseInt(this.state.solarTemp) > 85 ? "red" : "green"} temp={this.state.solarTemp} time={this.state.time}/>

                        <ListItem className="data" title="Door Status:" idName={this.state.door === "Closed" ? "green" : "red"} door={this.state.door}/>

                        <ListItem type="Button" id={this.state.switch1.id} title="Light 1:" position={this.state.switch1.position}/>

                        <ListItem type="Button" id={this.state.switch2.id}  title="Light 2:" position={this.state.switch2.position}/>

                        <ListItem type="Button" id={this.state.switch3.id}  title="Room Fan:" position={this.state.switch3.position}/>
                        
                </div>
            </div>
        );
    }
}

export default Data;