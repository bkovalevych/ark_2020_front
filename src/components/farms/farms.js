import React, {useState} from 'react';
import Item from '../original_menu/original_menu_item'
import List from './List';
import './farms.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight, faWarehouse} from '@fortawesome/free-solid-svg-icons'
import divWithClassName from "react-bootstrap/esm/divWithClassName";
import {withRouter} from 'react-router-dom'
export default withRouter(function(props) {
    let id = '';
    let params = {};
    if (props.location.search) {
        let start = props.location.search.indexOf('id=');
        id = props.location.search.slice(start + 3);
    }

    const colName = props.collectionName ;
    const [page, setPage] = useState(0);
    let farms = new List(colName, page, setPage, id);
    let [selectedItem, setItem] = useState(null);
    const goToLink = (val) => {
        props.history.push(val);
    };
    const _setItem = (val) => {
        if (colName === '/farm')
            goToLink(`/cages?id=${val}`);
        setItem(val)
    };
    let visual_farms = [];
    for (let index = 0; index < farms.elements.length; ++index) {
        let elem = farms.elements[index];
        let elemData = [];
        for (let key in elem) {
            let val = elem[key];
            elemData.push(<div>{key}:{val}</div>)
        }
        visual_farms.push(<Item
            icon={<FontAwesomeIcon icon={faWarehouse}/>}
            name={elemData}
            specialLink={elem.id}
            setItem={_setItem}
            selectedItem={selectedItem}
        />)
    }
    const prev = () => {
        farms.previousPage()
    };

    const next = () => {
        farms.nextPage()
    };
    return (
        <>
            <div className="box_farm ">
                {visual_farms}

                <div className="menuBarUp">
                    <button disabled={!farms.canPrevious} onClick={prev} ><FontAwesomeIcon icon={faArrowLeft}/> {props.strings.previous}</button>
                    <button disabled={!farms.canNext} onClick={next}><FontAwesomeIcon icon={faArrowRight}/>{props.strings.next}</button>
                </div>
                <div className="menuBarDown">
                    <button disabled={!farms.canPrevious} onClick={prev}><FontAwesomeIcon icon={faArrowLeft}/> {props.strings.previous}</button>
                    <button disabled={!farms.canNext} onClick={next}><FontAwesomeIcon icon={faArrowRight}/>{props.strings.next}</button>
                </div>
            </div>
        </>
    )
})