import React, {useEffect, useState} from 'react';
import Item from '../original_menu/original_menu_item'
import List from '../utils/List';
import './farms.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight, faWarehouse} from '@fortawesome/free-solid-svg-icons'
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
    const [vis, setVis] = useState(null);
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
    const getVisualFarms = () => {
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
        return visual_farms;
    }

    const prev = () => {
        setVis(null);
        farms.previousPage()

    };

    const next = () => {
        setVis(null);
        farms.nextPage()
    };

    useEffect(() => {
        if (vis == null) {
            farms.getVal().then(data =>
                setVis(getVisualFarms())
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
                    <button disabled={!farms.canPrevious} onClick={prev} ><FontAwesomeIcon icon={faArrowLeft}/> {props.strings.previous}</button>
                    {page + 1}
                    <button disabled={!farms.canNext} onClick={next}><FontAwesomeIcon icon={faArrowRight}/>{props.strings.next}</button>
                </div>
                <div className="menuBarDown">
                    <button disabled={!farms.canPrevious} onClick={prev}><FontAwesomeIcon icon={faArrowLeft}/> {props.strings.previous}</button>
                    {page + 1}
                    <button disabled={!farms.canNext} onClick={next}><FontAwesomeIcon icon={faArrowRight}/>{props.strings.next}</button>
                </div>
            </div>
            </div>
        </>
    )
})