import axios from 'axios'
import host from '../components/host'
export const sign = (token) => {
    let uri = host + '/user/sign';
    return new Promise((resolve, reject) => {
        axios.get(`${uri}?googleToken=${token}` )
            .then(resp => {
                let data = resp.data;
                if (data)
                    resolve(resp.data);
                reject();
            }).catch(err => {
                reject(err);
        })
    })
}
