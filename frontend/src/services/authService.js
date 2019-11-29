import jwtDecode from 'jwt-decode';
import apiService from './httpService';
import { backendURI } from '../utils/config';

apiService.setJwt(getJwt())

export async function login(email_id, password) {
    const credentials = {
        email_id: email_id,
        password: password
    }
    try {
        const { data: token } = await apiService.post(`${backendURI}/api/login`, credentials);
        localStorage.setItem("token", token)
        try {
            const authToken = localStorage.getItem("token");
            const jwt = authToken.split(" ")[1]
            let user = jwtDecode(jwt);
            if(!user){
                return false;
            }
            else{
                localStorage.setItem("email_id",user.email_id);
                localStorage.setItem("user_id",user.user_id);
                return true;
            }
        }
        catch (ex) {
            return null;
        }
    } catch (err) {
        console.log(err.response.data);
    }
}

export function logout() {
    localStorage.clear();
}

export function getJwt() {
    return localStorage.getItem("token");
}

export default {
    login, logout
};