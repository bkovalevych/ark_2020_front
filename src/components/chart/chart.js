import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2'
import List from '../utils/List';
import dataAdapter from "./dataAdapter";

export default function (props) {
    const cages = props.filterCage;
    const [data, setData] = useState(null);
    const [fetch, setFetch] = useState(false);
    let colors = {};
    const getCharts = () => {
        if (data === null) {
            return '';
        }
        return Object.keys(data).map(key => (<div className='textNormal'>
                <h3 >{key}</h3>
                <Line data={prepareDataset(data[key])}/>
            </div>
        ))
    }
    const prepareDataset = (lines) => {
        lines.datasets.map((val, index) => {
            if (!colors[val.label]) {
                colors[val.label] = ((1<<24)*Math.random()|0);
            }
            let startColor = colors[val.label]
            let obj = {
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'white',
                borderColor: "#"+startColor.toString(16),
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'red',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'blue',
                pointHoverBorderColor: 'yellow',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }
            lines.datasets[index] = Object.assign(val, obj)
            startColor = (startColor * startColor + 100) & 0xffffff
        })
        return lines;
    }

    useEffect(() => {
        if (fetch === false) {
            setFetch(true);
            new List('/data',
                0,
                (val) => {},
                Object.assign({sort: 'timestamp(1)', collection: 'CageData'}, cages)
            ).getVal(true).then(row_data => {
                setData(dataAdapter(row_data))
            })
        }
    }, [data])
    return (
        <>
            {getCharts()}
            {JSON.stringify(cages)}
        </>
    )
}