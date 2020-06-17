import React, {useCallback, useEffect, useState} from 'react';
import Item from '../original_menu/original_menu_item'
import List from '../utils/List';
import './elements.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight, faWarehouse} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'
import {parse} from 'query-string'
import ButtonsForList from '../utils/buttonsForList'
import Loader from '../loader/loader'
export default withRouter(function(props) {
    const projectionAdd = props.projectionAdd;
    const filter = props.filter;
    const projection = props.projection;
    const icon = props.icon
    const color = props.color
    const outerElements = props.outerElements;
    const colName = props.collectionName ;
    const setItem = props.setItem;
    const selectedItems = props.selectedItems;
    const [page, setPage] = useState(0);
    const [fetch, setFetch] = useState(false)

    const [vis, setVis] = useState(null);
    let elements = new List(colName, page, setPage, filter, outerElements);

    const _setItem = (val) => {
        setItem(val)
    };
    const prepareValues = (key, val) => {
        if (!projection.has(key)) {
            return '';
        }
        if (key.match(/id/)) {
            return <div>{props.strings[key]}: <span style={{fontSize:10}}>{val}</span></div>
        }
        if (key === 'registered') {
            return <div>{props.strings[key]}: {new Date(val).toLocaleDateString(props.strings['locale'])}</div>
        }
        return <div>{props.strings[key]}: {val}</div>
    }
    const getVisualFarms = (elements) => {
        return elements.map((value, index) => (<Item
            icon={<FontAwesomeIcon icon={icon} size={'2x'} color={color}/>}
            name={Object.keys(value).map(key => (prepareValues(key, value[key])))}
            specialLink={value['_id']}
            setItem={_setItem}
            selectedItem={selectedItems}
            key={index}
        />))
    }

    const prev = () => {
        setVis(null);
        elements.previousPage();
    };

    const next = () => {
        setVis(null);
        elements.nextPage()
    };
    useEffect(() => {
        if (!fetch) {
            setFetch(true)
            elements.getVal().then(data => {
                setFetch(false);
                setVis(getVisualFarms(data))
            })
        }
    }, [page, filter])
    useEffect(() => {
        if (outerElements != null && Object.keys(outerElements).length !== 0) {
            elements.getVal().then(data => {
                setVis(getVisualFarms(data));
                setFetch(false)
            })
        }

    },[outerElements])



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
                }}>
                    <ButtonsForList
                        icon={icon}
                        color={color}
                        projection={projectionAdd}
                        name={colName}
                        strings={props.strings}
                    />
                    <br/>{colName}</div>

            <div className="box_farm ">
                {fetch? <Loader /> : vis }
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