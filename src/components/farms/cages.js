import React, {useEffect, useState} from "react";
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import Elements from "../elements/elements";
import {useCookies, withCookies} from 'react-cookie'
export default withCookies(function (props) {
    const projectionAdd = ['idFarm', 'name', 'capacity']
    const projection = new Set(['idFarm', 'name', 'capacity', 'contains', 'registered'])
    const _setItem = props.setItem
    const collectionName = '/cage';
    const icon = faPaw;
    const color = '#a418aa'
    const [selectedItems, setItem] = useState(new Set(props.filterCage['idCage']));
    const parentFilter = props.filter;
    const [filter, setFilter] = useState(props.filterCage);
    const _setFilter = (val) => {
        props.setFilterCage(val)
        setFilter(val);
    }
    const setCage = _setItem(filter, selectedItems, _setFilter, setItem, 'idCage')
    return (
        <>
            <Elements
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
            {JSON.stringify(filter)}
        </>
    )
})