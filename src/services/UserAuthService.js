import axios from 'axios';

export const signIn = async (username, password) => {
    const API_URL = 'https://reqres.in/api/login';
    const dataToSubmit = {
        email: username,
        password: password
    }
    console.log(dataToSubmit)
    try {
        const data = await axios.post(API_URL, dataToSubmit);
        return data;
    } catch (e) {
        if (e.response) {
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        }
    }
}