export default (raw_data) => {
    let dataFactors = {}//{datasets: [], labels: []};
    let timestamps = {};
    raw_data.map(val => {
        let props = {idCage: val.idCage, timestamp: val.timestamp, _id: 'data', __v: 'someData'};
        Object.keys(val).map(key => {
            if (props[key] !== undefined) {
                props[key] = val[key];
            } else {
                if (dataFactors[key] === undefined) {
                    timestamps[key] = new Set()
                    dataFactors[key] = {dataset: {}, labels: []}
                }
                if (!dataFactors[key].dataset[props.idCage]) {
                    dataFactors[key].dataset[props.idCage] = []
                }
                dataFactors[key].dataset[props.idCage].push(parseFloat(val[key]['$numberDecimal']));
                if (!timestamps[key].has(props.timestamp)) {
                    dataFactors[key].labels.push(new Date(props.timestamp).toLocaleTimeString());
                    timestamps[key].add(props.timestamp)
                }
            }
        })
    })
    Object.keys(dataFactors).map(key => {
        dataFactors[key].datasets = []
        Object.keys(dataFactors[key].dataset).map(datasetKey => {
            dataFactors[key].datasets.push({label: datasetKey, data: dataFactors[key].dataset[datasetKey]})
        })
        delete dataFactors[key].dataset
    })

    return dataFactors;
}