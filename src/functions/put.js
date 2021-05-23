import axios from 'axios';

export default (objectPut, path) => {
    return new Promise((resolve, reject) => {
        axios.put(path, objectPut,{
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