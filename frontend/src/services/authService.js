import jwtDecode from 'jwt-decode';
import apiService from './httpService';
import { backendURI } from '../utils/config';


apiService.setJwt(getJwt())

export async function login(email, password) {
    const { data : token } = await apiService.post(`${backendURI}/api/login`, { email, password });
    localStorage.setItem("token",token)
    try {
        const authToken = localStorage.getItem("token");
        const jwt = authToken.split(" ")[1]
        console.log(jwt); 
        return jwtDecode(jwt);
    }
    catch(ex){
        return null;
    }
}

export function logout() {
    localStorage.clear();
}

export function getJwt(){
    return localStorage.getItem(token);
}

export default {
    login, logout
};