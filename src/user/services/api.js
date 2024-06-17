import axios from "axios";
import { getIdToken } from "./localStorage";
import { APIKEY } from "../../config";

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1';
const API_KEY = APIKEY;
const RegURL = `/accounts:signUp?key=${API_KEY}`;
const LoginURL = `/accounts:signInWithPassword?key=${API_KEY}`;
const getUserDetailsURL = `/accounts:lookup?key=${API_KEY}`;


export const registerApi = (inputData) =>{
    const data = {
        "displayName" : inputData.name,
        "email" : inputData.email,
        "password" : inputData.password
    }
    return axios.post(RegURL,data);
}
export const loginApi = (inputData) =>{
    const data = {
        "email" : inputData.email,
        "password" : inputData.password
    }
    return axios.post(LoginURL,data);
}

export const getUserDetailsApi = () =>{
    const id = getIdToken()
    const data ={
        idToken : id
    }
    return axios.post(getUserDetailsURL,data);
}


