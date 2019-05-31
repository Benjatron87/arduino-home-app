import axios from 'axios';

export default {
    getData: function(){
        return axios.get('/api/led/');
    },
    flipSwitch: function(id, data){
        return axios.post('/api/led/' + id, data);
    }
}