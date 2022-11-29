import axios from 'react-native-axios';

const instance = axios.create({
    baseURL: 'http://10.0.2.2:8080',
    timeout: 30000,
    headers: {'Content-Type': 'application/json'}
});

export default instance;