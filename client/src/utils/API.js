import axios from 'axios';

export default {
    getTemp: function() {
        return axios.get('/api/temp/');
    },
    getDoor: function(){
        return axios.get('/api/door/');
    },
    getSwitch: function(){
        return axios.get('/api/led/');
    },
    flipSwitch: function(switchId){
        return axios.put('/api/led/' + switchId);
    }
}