import axios from 'axios';

export const postCommonData = (url, data) => {
    const token = localStorage.getItem('AccessToken');
    const Authorization = 'bearer ' + token
    return axios.request({
        url: url,
        method: "post",
        headers: {
            'Authorization': Authorization,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })
}

export const getCommonData = (url) => {
    console.log("wolrd");
    const token = localStorage.getItem('AccessToken');
    console.log(token);
    axios.request({
        url: url,
        method: "get",
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}