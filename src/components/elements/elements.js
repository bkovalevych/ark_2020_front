import React, {useEffect, useState} from 'react';
import Item from '../original_menu/original_menu_item'
import List from '../utils/List';
import './elements.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight, faWarehouse} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'
import {parse} from 'query-string'
export default withRouter(function(props) {
    const filter = props.filter;
    const icon = props.icon
    const colName = props.collectionName ;
    const setItem = props.setItem;
    const selectedItems = props.selectedItems;
    const [page, setPage] = useState(0);
    const [vis, setVis] = useState(null);
    let elements = new List(colName, page, setPage, filter);

    const _setItem = (val) => {
        setItem(val)
    };
    const getVisualFarms = (elements) => {
        return elements.map((value, index) => (<Item
            icon={<FontAwesomeIcon icon={icon}/>}
            name={Object.keys(value).map(key => (`${key}: ${value[key]}`))}
            specialLink={index}
            setItem={_setItem}
            selectedItem={selectedItems}
            key={index}
        />))
    }

    const prev = () => {
        setVis(null);
        elements.previousPage()

    };

    const next = () => {
        setVis(null);
        elements.nextPage()
    };

    useEffect(() => {
        if (vis == null) {
            elements.getVal().then(data =>
                setVis(getVisualFarms(data))
            )
        }

    },[page])

    return (
        <>


            <div style={{position: 'relative'}}>

                <div style={{

                    width: '120px',
                    marginRight: '-10px',
                    float: 'right',
                    color: '#1d7641',
                    background: 'rgba(244, 244, 244, 0.8)',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    padding: '5px'
                }}>{colName}</div>

            <div className="box_farm ">
                {vis}

                <div className="menuBarUp">
                    <button disabled={!elements.canPrevious} onClick={prev} ><FontAwesomeIcon icon={faArrowLeft}/> {props.strings.previous}</button>
                    {page + 1}
                    <button disabled={!elements.canNext} onClick={next}><FontAwesomeIcon icon={faArrowRight}/>{props.strings.next}</button>
                </div>
                <div className="menuBarDown">
                    <button disabled={!elements.canPrevious} onClick={prev}><FontAwesomeIcon icon={faArrowLeft}/> {props.strings.previous}</button>
                    {page + 1}
                    <button disabled={!elements.canNext} onClick={next}><FontAwesomeIcon icon={faArrowRight}/>{props.strings.next}</button>
                </div>
            </div>
            </div>
        </>
    )
})