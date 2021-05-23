import axios from 'axios'


function queryToString(objArray) {
    return '?' + objArray.map(obj =>
        Object.keys(obj)
        .map(
            key => writeVal(key, obj)
        )
        .join('&')
    ).join('&');
}

function writeVal(key, obj) {
    let val = obj[key];
    if (typeof val === typeof []) {
        return val.map((value) => (`${key}=${value}`)).join('&');
    } else {
        return `${key}=${obj[key]}`;
    }
}


export default class List {

    constructor(collectionName, page, setPage, filter) {
        this.name = collectionName;
        this.filter = filter;
        this.limit = 7;
        this.page = page;
        this.setPage = setPage;
        this.canPrevious = this.page > 0;
        let indexRight = (this.page + 1) * this.limit;
        this.canNext = true //indexRight < this.setOfData.length;
        this.query = {}
        this.elements = [];
    }

    getVal(unlimited) {
        return new Promise((resolve, reject) => {
            let params = [{
                skip: this.page * this.limit,
                limit: this.limit
            }]
            if (unlimited) {
                params = []
            }
            if (this.filter) {
                params.push(this.filter)
            }
            let queryStr = queryToString(params);
            axios.get( this.name + queryStr, {
                withCredentials: true,
                headers:{ContentType: "application/x-www-form-urlencoded",
                Accept: "application/json" }}).then(resp => {
                this.elements = resp.data;
                resolve(resp.data);
            }).catch(err => {
                reject(err);
            })


        })

    }

    nextPage() {
        if (!this.canNext) {
            return;
        }
        this.setPage(this.page + 1)
    }

    previousPage() {
        if (!this.canPrevious) {
            return;
        }
        this.setPage(this.page - 1)
    }

}