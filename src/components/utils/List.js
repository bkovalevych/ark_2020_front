import axios from 'axios'
//
// let setOfData = [
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '1'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '2'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '3'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '4'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '5'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '6'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '7'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '8'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '9'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '10'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '11'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '12'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '13'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '14'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '15'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '16'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '17'}
// ];
//
//
// let cages = [
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '0', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '1', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '2', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '3', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '4', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '5', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '6', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '7', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '8', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '9', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '10', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '11', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '12', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '13', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '14', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '15', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '16', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '17', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '18', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '19', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '20', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '21', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '22', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '23', idFarm: '0'},
//     {paramA: "valA", paramB: "valB", paramC: "valC", paramD: "valD", id: '24', idFarm: '0'},
//     {paramA: "valA15", paramB: "valB", paramC: "valC", paramD: "valD", id: '25', idFarm: '8'},
//     {paramA: "valA14", paramB: "valB", paramC: "valC", paramD: "valD", id: '26', idFarm: '9'},
//     {paramA: "valA13", paramB: "valB", paramC: "valC", paramD: "valD", id: '27', idFarm: '9'},
//     {paramA: "valA12", paramB: "valB", paramC: "valC", paramD: "valD", id: '28', idFarm: '10'},
//     {paramA: "valA11", paramB: "valB", paramC: "valC", paramD: "valD", id: '29', idFarm: '11'},
//     {paramA: "valA10", paramB: "valB", paramC: "valC", paramD: "valD", id: '30', idFarm: '11'},
//     {paramA: "valA9", paramB: "valB", paramC: "valC", paramD: "valD", id: '31', idFarm: '12'},
//     {paramA: "valA8", paramB: "valB", paramC: "valC", paramD: "valD", id: '32', idFarm: '12'},
//     {paramA: "valA7", paramB: "valB", paramC: "valC", paramD: "valD", id: '33', idFarm: '12'},
//     {paramA: "valA6", paramB: "valB", paramC: "valC", paramD: "valD", id: '34', idFarm: '13'},
//     {paramA: "valA5", paramB: "valB", paramC: "valC", paramD: "valD", id: '35', idFarm: '13'},
//     {paramA: "valA4", paramB: "valB", paramC: "valC", paramD: "valD", id: '36', idFarm: '13'},
//     {paramA: "valA3", paramB: "valB", paramC: "valC", paramD: "valD", id: '37', idFarm: '14'},
//     {paramA: "valA2", paramB: "valB", paramC: "valC", paramD: "valD", id: '38', idFarm: '14'},
//     {paramA: "valA1", paramB: "valB", paramC: "valC", paramD: "valD", id: '39', idFarm: '14'}
// ];

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