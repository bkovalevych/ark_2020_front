import Elements from '../elements/elements';
import React, {useState} from 'react'
import {faWarehouse} from '@fortawesome/free-solid-svg-icons'
export default function(props) {
    const icon = faWarehouse;
    const collectionName = '/farm'
    const [filter, setFilter] = useState(null);
    const [selectedItems, setItem] = useState(new Set());
    const _setItem = (val) => {
        if (selectedItems.has(val)) {
            _unselectItem(val)
            return
        }
        let obj = Object.assign({farmId: []}, filter)
        obj.farmId.push(val);
        setFilter(obj);
        selectedItems.add(val);
        setItem(selectedItems);
        console.log(filter)
        console.log(selectedItems)
    }
    const _unselectItem = (val) => {
        filter.farmId.delete(val);
        setFilter(filter);
        selectedItems.delete(val);
        setItem(selectedItems)
    }
    return (
        <>
            <Elements filter={filter} icon={icon} collectionName={collectionName} setItem={_setItem} selectedItems={selectedItems}/>
        </>
    )
    // const filter = props.filter;
    // const icon = props.icon
    // const colName = props.collectionName ;
    // const setItem = props.setItem;
    // const selectedItems = props.selectedItems;


}
