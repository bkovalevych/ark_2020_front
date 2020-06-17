import axios from 'axios';

export default (arrId, path) => {
    return new Promise((resolve, reject) => {
        axios.delete(process.env.REACT_APP_API_URL + path, arrId,{
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