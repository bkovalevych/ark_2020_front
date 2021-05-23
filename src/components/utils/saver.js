import React, {useEffect, useState} from 'react';
import {faPlay, faStop} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import put from '../../functions/put'
export default function(props) {
    const [play, setPlay] = useState(false);
    const [allData, setAllData] = useState([]);
    const currentData = props.currentData;
    let interval = null;
    useEffect(() => {
        if (play) {
            if (interval == null) {
                interval = setInterval(() => {
                    allData.push(currentData.data)
                }, 200)
            }

        } else {
            if (interval != null) {
                clearInterval(interval);
            }
        }
        return () => {
            if (interval != null) {
                clearInterval(interval);
            }
        }
    })
    const icon = play? <FontAwesomeIcon icon={faStop} color='red' size='2x'/> : <FontAwesomeIcon icon={faPlay} size='2x'/>

    return (
        <div>
            <button onClick={() => {
                if (play) {
                    console.log(allData)
                    put({data: allData}, `/data/${props.id}`).
                    then(d =>
                        console.log(d)
                    ).catch(err => {
                        console.log(err)
                    });

                }
                setPlay(!play)
            }}>{icon}</button>
        </div>
    )
}