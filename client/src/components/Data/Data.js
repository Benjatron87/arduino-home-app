import React, { Component } from 'react';
import './Data.css';
import API from '../../utils/API';
import ListItem from '../ListItem/ListItem';

class Data extends Component {

    state = {
        temp:'',
        door:'',
        solarTemp:'',
        solarHumidty:'',
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
            let solarHumidity = result.data[3].solarHumidity;
            let time = result.data[3].updatedAt;
            let switch1 = result.data[0];
            let switch2 = result.data[1];
            let switch3 = result.data[2];

            this.setState({
                temp,
                door,
                solarTemp,
                solarHumidity,
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
                        <ListItem type = "Humidity" className="data" title="Humidity:" idName={this.state.solarHumidity < 75 ? "green" : "red"} solarHumidity={this.state.solarHumidity}/>

                        <ListItem className="data" title="Outside:" idName={parseInt(this.state.solarTemp) > 75 ? "red" : "green"} temp={this.state.solarTemp} time={this.state.time}/>

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