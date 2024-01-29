import axios from "axios";

const api = axios.create({
    baseURL : 'https://6690-2409-40f4-9-2214-8585-c0dc-73af-a0bc.ngrok-free.app',
    headers:{
        'Content-Type' : 'application/json'
    },
});

export default api;