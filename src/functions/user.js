import axios from 'axios'
export const sign = (token) => {

    let uri = process.env.REACT_APP_API_URL + '/user/sign';
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
