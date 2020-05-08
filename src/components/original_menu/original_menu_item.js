import React from 'react'
import './original_menu_item.css'
export default function(props) {
    let className = "item_out";
    const single = props.single;
    const handler = (e) => {
        if (single) {
            let last = 0;
            props.selectedItem.forEach(val => last = val)
            let elem = e.currentTarget.parentNode.children[last]
            let prev_val = last;
            props.setItem(props.specialLink);
            if (props.selectedItem.has(prev_val)) {
                return;
            }
            elem.className = elem.className.replace(' checked', '');
            e.currentTarget.className += ' checked';
        } else {
            if (props.selectedItem.has(props.specialLink)) {
                e.currentTarget.className = e.currentTarget.className.replace(' checked', '');
            } else {
                e.currentTarget.className += ' checked';
            }
            props.setItem(props.specialLink);
        }
    }
    if(props.selectedItem.has(props.specialLink))
        className += ' checked';
    return (
        <div className={className} onClick={handler}>

            <div className='item'>
                <div className="item_inner">
                    {props.icon}
                    <div className='item_text'>{props.name}</div>
                </div>
            </div>
        </div>
    )
}