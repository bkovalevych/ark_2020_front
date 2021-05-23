import React, {useEffect, useState} from "react";
import {faWaveSquare, faPlay, faRecordVinyl} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Elements from "../elements/elements";
import {useCookies, withCookies} from 'react-cookie'
import Record from '../utils/record'
import {play} from '../../functions/user'

export default withCookies(function (props) {
    const projectionAdd = ['tags', 'name',  {type: 'select', name:'mode', options: ['public', 'private']}]
    const projection = new Set(['idUser', 'name', 'mode', 'tags', 'registered', 'description'])
    const _setItem = props.setItem
    const collectionName = '/data';
    const icon = faWaveSquare;
    const color = '#0a0a0a'
    const [selectedItems, setItem] = useState(new Set());
    const parentFilter = props.filter;
    const [filter, setFilter] = useState(props.filterCage);
    const [showRecord, setShowRecord] = useState(false);
    const [id, setId] = useState('some');
    const _setFilter = (val) => {
        props.setFilterCage(val)
        setFilter(val);
    }
    const buttons = [
        (val) => {
        return (<>
            <button onClick={(e) => {
                play(val).then(a => console.log(a)).catch(a => console.log(a));
            }}>
                <FontAwesomeIcon icon={faPlay}/>
                {props.strings.play}
            </button><br/></>)

        },
        (val) =>
             (<button onClick={(e) => {
                    setId(val);
                    setShowRecord(true);
                }}>
                    <FontAwesomeIcon icon={faRecordVinyl}/>
                    {props.strings.record}
                </button>)
    ]
    const setCage = _setItem(filter, selectedItems, _setFilter, setItem, 'idCage')
    return (
        <>
            <Record strings={props.strings} show={showRecord} setShow={setShowRecord} id={id}/>
            <Elements
                buttons={buttons}
                single={null}
                projectionAdd={projectionAdd}
                projection={projection}
                filter={parentFilter}
                icon={icon}
                collectionName={collectionName}
                setItem={setCage}
                selectedItems={selectedItems}
                strings={props.strings}
                color={color}
            />
        </>
    )
})