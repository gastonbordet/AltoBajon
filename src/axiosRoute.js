import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://alto-bajon.firebaseio.com/'
})

export default instance;