import axios from 'axios';

export default (objectAdd, path) => {
    return new Promise((resolve, reject) => {
        axios.post("https://bee-hive-bit-server.herokuapp.com" + path, objectAdd,{
            withCredentials: true,
            headers:{
                ContentType: "application/x-www-form-urlencoded",
                Accept: "application/json"
            }
        }).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err);
        })
    })
}